export type EsvFilter = {
    field: string;
    operator: EsvFilterOperator;
    value: string | number | boolean;
};


export enum EsvFilterOperator {
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
    LessThanOrEqual = "lessThanOrEqual",
}