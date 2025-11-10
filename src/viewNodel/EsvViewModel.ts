import { FileSystemEsvRepository } from "../infra/fs/FileSystemEsvRepository.ts";
import { ReadEsv } from "../core/useCases/ReadEsv.ts";
import { WriteEsv } from "../core/useCases/WriteEsv.ts";
import { FilterEsv } from "../core/useCases/FilterEsv.ts";
import { type EsvRow } from "../core/entities/EsvRow.ts";
import { type EsvFilter } from "../core/entities/EsvFilter.ts";

export class EsvViewModel {
    repository: FileSystemEsvRepository;
    readEsv: ReadEsv;
    writeEsv: WriteEsv;
    filterEsv: FilterEsv;

    constructor() {
        this.repository = new FileSystemEsvRepository();
        this.readEsv = new ReadEsv(this.repository);
        this.writeEsv = new WriteEsv(this.repository);
        this.filterEsv = new FilterEsv(this.repository);
    }

    async readEsvFile(filePath: string, separator: string, skip?: number, limit?: number) {
        return await this.readEsv.execute(filePath, separator, skip, limit);
    }
    async writeEsvFile(filePath: string, data: EsvRow[], separator: string) {
        return await this.writeEsv.execute(filePath, data, separator);
    }

    async filterEsvFile(
        filePath: string,
        separator: string,
        skip?: number,
        limit?: number,
        filters?: EsvFilter[]
    ) {
        return await this.filterEsv.execute(filePath, separator, skip, limit, filters);
    }
}
