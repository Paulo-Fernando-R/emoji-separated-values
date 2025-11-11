import ReadLine from 'readline';
import fs from 'fs';

type EsvRow = Record<string, string | number | boolean>;

type EsvFilter = {
    field: string;
    operator: EsvFilterOperator;
    value: string | number | boolean;
};
declare enum EsvFilterOperator {
    Equals = "equals",
    NotEquals = "notEquals",
    Contains = "contains",
    NotContains = "notContains",
    StartsWith = "startsWith",
    NotStartsWith = "notStartsWith",
    EndsWith = "endsWith",
    NotEndsWith = "notEndsWith",
    GreaterThan = "greaterThan",
    LessThan = "lessThan",
    GreaterThanOrEqual = "greaterThanOrEqual",
    LessThanOrEqual = "lessThanOrEqual"
}

declare class EsvViewModel {
    private repository;
    private readEsv;
    private writeEsv;
    private filterEsv;
    private updateEsv;
    private deleteEsv;
    constructor();
    readEsvFile(filePath: string, skip?: number, limit?: number, separator?: string): Promise<EsvRow[]>;
    writeEsvFile(filePath: string, data: EsvRow[], separator?: string): Promise<void>;
    filterEsvFile(filePath: string, skip?: number, limit?: number, filters?: EsvFilter[], separator?: string): Promise<EsvRow[]>;
    updateEsvFile(filePath: string, newData: EsvRow, filters: EsvFilter[], separator?: string): Promise<void>;
    deleteEsvFile(filePath: string, filters: EsvFilter[], separator?: string): Promise<void>;
}

declare class FileSystemEsvRepository {
    readEsvFile(filePath: string): Promise<ReadLine.Interface>;
    getFileWriteStream(filePath: string, flags?: string): fs.WriteStream;
    writeEsvFile(filePath: string, data: EsvRow[], separator: string, flags?: string): Promise<void>;
    renameFile(oldPath: string, newPath: string): void;
    deleteFile(filePath: string): void;
    escapeField(valor: string): string;
    splitEsvLine(line: string, separator: string): string[];
    parseEsvLine(line: string, header: string[], separator: string): EsvRow;
    normalizeValue(value: string): string | number | boolean;
    fileExists(filePath: string): Promise<boolean>;
}

declare class Operations {
    filterRow(row: EsvRow, filters?: EsvFilter[]): boolean;
    switchOperations(operation: EsvFilterOperator, filter: EsvFilter, row: EsvRow): boolean | undefined;
    verifyNAN(first: string | number | boolean, second: string | number | boolean): {
        first: number;
        second: number;
    } | null;
}

declare const QuickEsv: typeof EsvViewModel;
declare const ManualEsv: typeof FileSystemEsvRepository;
type EsvRowType = EsvRow;
type EsvFilterType = EsvFilter;

export { EsvFilterOperator, type EsvFilterType, type EsvRowType, ManualEsv, Operations, QuickEsv };
