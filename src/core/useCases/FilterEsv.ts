import { FileSystemEsvRepository } from "../../infra/fs/FileSystemEsvRepository.ts";
import { type EsvRow } from "../entities/EsvRow.ts";
import { type EsvFilter } from "../entities/EsvFilter.ts";
import { Operations } from "../../infra/ops/Operations.ts";

export class FilterEsv {
    repository: FileSystemEsvRepository;
    operations: Operations;

    constructor(repository: FileSystemEsvRepository) {
        this.repository = repository;
        this.operations = new Operations();
    }

    async execute(
        filePath: string,
        separator: string,
        skip?: number,
        limit?: number,
        filters?: EsvFilter[]
    ) {
        const reader = await this.repository.readEsvFile(filePath);

        let lineCount = 0;
        let header: string[] = [];
        const records: EsvRow[] = [];

        for await (const line of reader) {
            if (lineCount === 0) {
                header = this.repository
                    .splitEsvLine(line, separator)
                    .map((h) => this.repository.normalizeValue(h) as string);

                lineCount++;
                continue;
            }

            if (!line) {
                continue;
            }

            const record = this.repository.parseEsvLine(line, header, separator);

            if (!this.operations.filterRow(record, filters)) {
                continue;
            }

            if (skip && skip > 0) {
                skip--;
                continue;
            }

            if (limit && lineCount > limit) {
                break;
            }

            records.push(record);
            lineCount++;
        }

        reader.close();

        return records;
    }
}
