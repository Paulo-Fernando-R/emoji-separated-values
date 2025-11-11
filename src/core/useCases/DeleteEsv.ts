import { FileSystemEsvRepository } from "../../infra/fs/FileSystemEsvRepository.ts";
import { type EsvRow } from "../entities/EsvRow.ts";
import { type EsvFilter } from "../entities/EsvFilter.ts";
import { Operations } from "../../infra/ops/Operations.ts";

export class DeleteEsv {
    repository: FileSystemEsvRepository;
    operations: Operations;
    tempPath: string;

    constructor(repository: FileSystemEsvRepository) {
        this.repository = repository;
        this.operations = new Operations();
        this.tempPath = "";
    }

    async execute(filePath: string, separator: string, filters: EsvFilter[]) {
        this.tempPath = `${filePath}.tmp`;

        const tmpExists = await this.repository.fileExists(this.tempPath);

        if (tmpExists) {
            this.repository.deleteFile(this.tempPath);
        }

        const reader = await this.repository.readEsvFile(filePath);
        const writer = this.repository.getFileWriteStream(this.tempPath);

        let lineCount = 0;
        let header: string[] = [];
        let updated = false;

        for await (const line of reader) {
            if (lineCount === 0) {
                header = this.repository
                    .splitEsvLine(line, separator)
                    .map((h) => this.repository.normalizeValue(h) as string);

                writer.write(this.formatHeader(header, separator));

                lineCount++;
                continue;
            }

            if (!line) {
                continue;
            }

            const record = this.repository.parseEsvLine(line, header, separator);

            if (!this.operations.filterRow(record, filters)) {
                writer.write(line + "\n");
                continue;
            }

            lineCount++;
            updated = true;
        }

        reader.close();
        writer.end();

        return new Promise<void>((resolve, reject) => {
            writer.on("finish", () => {
                if (!updated) {
                    this.repository.deleteFile(this.tempPath);
                    reject(new Error("No record deleted"));
                }
                console.log("Esv record deleted successfully");
                this.repository.renameFile(this.tempPath, filePath);
                resolve();
            });
            writer.on("error", (error) => {
                reject(error);
            });
        });
    }

    formatHeader(header: string[], separator: string) {
        const headerLine = header.map((h) => this.repository.escapeField(h)).join(separator);

        return headerLine + "\n";
    }
}
