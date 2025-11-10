import { FileSystemEsvRepository } from "../../infra/fs/FileSystemEsvRepository.ts";
import { type EsvRow } from "../entities/EsvRow.ts";
import { EsvFilterOperator, type EsvFilter } from "../entities/EsvFilter.ts";

export class FilterEsv {
    repository: FileSystemEsvRepository;

    constructor(repository: FileSystemEsvRepository) {
        this.repository = repository;
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

            if (!this.filterRow(record, filters)) {
                console.log("filtered", lineCount);
                continue;
            }
            console.log("not filtered", lineCount);

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

    filterRow(row: EsvRow, filters?: EsvFilter[]) {
        if (!filters) {
            return true;
        }
        for (const filter of filters) {
            if (!this.switchOperations(filter.operator, filter, row)) {
                return false;
            }

            return true;
        }
    }

    switchOperations(operation: EsvFilterOperator, filter: EsvFilter, row: EsvRow) {
        switch (operation) {
            case EsvFilterOperator.Equals:
                return row[filter.field] === filter.value;
                break;

            case EsvFilterOperator.NotEquals:
                return row[filter.field] !== filter.value;
                break;

            case EsvFilterOperator.Contains:
                const value = row[filter.field];
                if (typeof value === "string") return value.includes(filter.value.toString());
                break;

            case EsvFilterOperator.NotContains:
                const value2 = row[filter.field];
                if (typeof value2 === "string") return !value2.includes(filter.value.toString());
                break;

            case EsvFilterOperator.StartsWith:
                const value3 = row[filter.field];
                if (typeof value3 === "string") return value3.startsWith(filter.value.toString());
                break;

            case EsvFilterOperator.NotStartsWith:
                const value4 = row[filter.field];
                if (typeof value4 === "string") return !value4.startsWith(filter.value.toString());
                break;

            case EsvFilterOperator.EndsWith:
                const value5 = row[filter.field];
                if (typeof value5 === "string") return value5.endsWith(filter.value.toString());
                break;

            case EsvFilterOperator.NotEndsWith:
                const value6 = row[filter.field];
                if (typeof value6 === "string") return !value6.endsWith(filter.value.toString());
                break;

            case EsvFilterOperator.GreaterThan:
                const res = this.verifyNAN(row[filter.field], filter.value);
                if (!res) return false;
                return res.first > res.second;
                break;
            case EsvFilterOperator.LessThan:
                const res2 = this.verifyNAN(row[filter.field], filter.value);
                if (!res2) return false;
                return res2.first < res2.second;
                break;
            case EsvFilterOperator.GreaterThanOrEqual:
                const res3 = this.verifyNAN(row[filter.field], filter.value);
                if (!res3) return false;
                return res3.first >= res3.second;
                break;
            case EsvFilterOperator.LessThanOrEqual:
                const res4 = this.verifyNAN(row[filter.field], filter.value);
                console.log(res4);
                if (!res4) return false;
                return res4.first <= res4.second;
                break;
        }
    }

    verifyNAN(first: string | number | boolean, second: string | number | boolean) {
        const firstNumber = parseFloat(first.toString());
        const secondNumber = parseFloat(second.toString());
        if (isNaN(firstNumber) || isNaN(secondNumber)) {
            return null;
        }
        return {
            first: firstNumber,
            second: secondNumber,
        };
    }
}
