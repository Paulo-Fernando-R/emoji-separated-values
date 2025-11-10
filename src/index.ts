import { EsvViewModel } from "./viewNodel/EsvViewModel.ts";
import { type EsvRow } from "./core/entities/EsvRow.ts";
import { type EsvFilter } from "./core/entities/EsvFilter.ts";
import { FileSystemEsvRepository } from "./infra/fs/FileSystemEsvRepository.ts";

export const QuickEsv = EsvViewModel;
export const ManualEsv = FileSystemEsvRepository;
export type EsvRowType = EsvRow;
export type EsvFilterType = EsvFilter;
export { EsvFilterOperator } from "./core/entities/EsvFilter.ts";
