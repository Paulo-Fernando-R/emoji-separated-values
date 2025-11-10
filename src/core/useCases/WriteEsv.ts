import { type EsvRow } from "../entities/EsvRow.ts";
import { FileSystemEsvRepository } from "./../../infra/fs/FileSystemEsvRepository.ts";

export class WriteEsv {
    repository: FileSystemEsvRepository;
    constructor(repository: FileSystemEsvRepository) {
        this.repository = repository;
    }

    async execute(filePath: string, data: EsvRow[], separator: string) {
        return await this.repository.writeEsvFile(filePath, data, separator);
    }
}
