import { type EsvRow } from "../../core/entities/EsvRow.ts";
import { EsvFilterOperator, type EsvFilter } from "../../core/entities/EsvFilter.ts";

export class Operations {
    filterRow(row: EsvRow, filters?: EsvFilter[]) {
        if (!filters) {
            return true;
        }
        let filtered = true;
        for (const filter of filters) {
            if (!this.switchOperations(filter.operator, filter, row)) {
                filtered = false;
            }
        }
        return filtered;
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
