import { FileSystemEsvRepository } from "../infra/fs/FileSystemEsvRepository.ts";
import { ReadEsv } from "../core/useCases/ReadEsv.ts";
import { WriteEsv } from "../core/useCases/WriteEsv.ts";
import { type EsvRow } from "../core/entities/EsvRow.ts";

export class EsvViewModel {
    repository: FileSystemEsvRepository;
    ReadEsv: ReadEsv;
    WriteEsv: WriteEsv;

    constructor() {
        this.repository = new FileSystemEsvRepository();
        this.ReadEsv = new ReadEsv(this.repository);
        this.WriteEsv = new WriteEsv(this.repository);
    }

    async readEsvFile(filePath: string, separator: string) {
        return await new ReadEsv(new FileSystemEsvRepository()).execute(filePath, separator);
    }
    async writeEsvFile(filePath: string, data: EsvRow[], separator: string) {
        new WriteEsv(new FileSystemEsvRepository()).execute(filePath, data, separator);
    }
}
