import { FileSystemEsvRepository } from "../../infra/fs/FileSystemEsvRepository.ts";
import { type EsvRow } from "../entities/EsvRow.ts";

export class ReadEsv {
    repository: FileSystemEsvRepository;

    constructor(repository: FileSystemEsvRepository) {
        this.repository = repository;
    }

    async execute(filePath: string, separator: string) {
        const reader = await this.repository.readEsvFile(filePath);

        let lineCount = 0;
        let header: string[];
        const records: EsvRow[] = [];

        for await (const line of reader) {
            if (lineCount === 0) {
                header = this.repository
                    .splitEsvLine(line, separator)
                    .map((h) => this.repository.normalizeValue(h) as string);

                lineCount++;
                continue;
            }

            lineCount++;
            const record = this.repository.parseEsvLine(line, header!, separator);
            records.push(record);
        }

        reader.close();

        return records;
    }
}
