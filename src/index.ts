import { EsvViewModel } from "./viewNodel/EsvViewModel.ts";
import { type EsvRow } from "./core/entities/EsvRow.ts";
import { FileSystemEsvRepository } from "./infra/fs/FileSystemEsvRepository.ts";

export const QuickEsv = EsvViewModel;
export const ManualEsv = FileSystemEsvRepository;
export type EsvRowType = EsvRow;
