import { FileSystemEsvRepository } from "../infra/fs/FileSystemEsvRepository.ts";
import { ReadEsv } from "../core/useCases/ReadEsv.ts";
import { WriteEsv } from "../core/useCases/WriteEsv.ts";
import { FilterEsv } from "../core/useCases/FilterEsv.ts";
import { UpdateEsv } from "../core/useCases/UpdateEsv.ts";
import { DeleteEsv } from "../core/useCases/DeleteEsv.ts";
import { type EsvRow } from "../core/entities/EsvRow.ts";
import { type EsvFilter } from "../core/entities/EsvFilter.ts";

export class EsvViewModel {
    private repository: FileSystemEsvRepository;
    private readEsv: ReadEsv;
    private writeEsv: WriteEsv;
    private filterEsv: FilterEsv;
    private updateEsv: UpdateEsv;
    private deleteEsv: DeleteEsv;

    constructor() {
        this.repository = new FileSystemEsvRepository();
        this.readEsv = new ReadEsv(this.repository);
        this.writeEsv = new WriteEsv(this.repository);
        this.filterEsv = new FilterEsv(this.repository);
        this.updateEsv = new UpdateEsv(this.repository);
        this.deleteEsv = new DeleteEsv(this.repository);
    }

    async readEsvFile(filePath: string, skip?: number, limit?: number, separator: string = "😎") {
        return await this.readEsv.execute(filePath, separator, skip, limit);
    }
    async writeEsvFile(filePath: string, data: EsvRow[], separator: string = "😎") {
        return await this.writeEsv.execute(filePath, data, separator);
    }

    async filterEsvFile(
        filePath: string,
        skip?: number,
        limit?: number,
        filters?: EsvFilter[],
        separator: string = "😎"
    ) {
        return await this.filterEsv.execute(filePath, separator, skip, limit, filters);
    }

    async updateEsvFile(
        filePath: string,
        newData: EsvRow,
        filters: EsvFilter[],
        separator: string = "😎"
    ) {
        return await this.updateEsv.execute(filePath, separator, newData, filters);
    }

    async deleteEsvFile(filePath: string, filters: EsvFilter[], separator: string = "😎") {
        return await this.deleteEsv.execute(filePath, separator, filters);
    }
}
