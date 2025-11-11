"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  EsvFilterOperator: () => EsvFilterOperator,
  ManualEsv: () => ManualEsv,
  QuickEsv: () => QuickEsv
});
module.exports = __toCommonJS(index_exports);

// src/infra/fs/FileSystemEsvRepository.ts
var import_readline = __toESM(require("readline"), 1);
var import_fs = __toESM(require("fs"), 1);
var FileSystemEsvRepository = class {
  //le o arquivo e retorna um stream
  async readEsvFile(filePath) {
    const stream = import_fs.default.createReadStream(filePath, { encoding: "utf-8" });
    const reader = import_readline.default.createInterface({
      input: stream,
      crlfDelay: Infinity
    });
    return reader;
  }
  //cria um stream de escrita
  getFileWriteStream(filePath, flags = "a") {
    const stream = import_fs.default.createWriteStream(filePath, { encoding: "utf-8", flags });
    return stream;
  }
  //escreve um arquivo
  async writeEsvFile(filePath, data, separator, flags = "a") {
    const fileExists = await this.fileExists(filePath);
    const stream = import_fs.default.createWriteStream(filePath, { encoding: "utf-8", flags });
    let lineCount = 0;
    if (!fileExists && data.length > 0) {
      const header = Object.keys(data[0]);
      const headerLine = header.map(this.escapeField).join(separator);
      stream.write(headerLine + "\n");
    }
    for (const record of data) {
      const values = Object.values(record).map((value) => this.escapeField(String(value)));
      const line = values.join(separator);
      stream.write(line + "\n");
      lineCount++;
    }
    stream.end();
    return new Promise((resolve, reject) => {
      stream.on("finish", () => {
        console.log("Esv file written successfully");
        resolve();
      });
      stream.on("error", (error) => {
        reject(error);
      });
    });
  }
  //funcao que renomeia um arquivo
  renameFile(oldPath, newPath) {
    import_fs.default.renameSync(oldPath, newPath);
  }
  //funcao que deleta um arquivo
  deleteFile(filePath) {
    import_fs.default.unlinkSync(filePath);
  }
  //funcao que escapa um campo que contenha as seguintes carateres: ", \n
  escapeField(valor) {
    if (/[",\n]/.test(valor)) {
      return `"${valor.replace(/"/g, '""')}"`;
    }
    return valor;
  }
  //função que divide uma linha em campos usando o emoji como separador
  splitEsvLine(line, separator) {
    return line.split(separator);
  }
  //transforma uma linha em um objeto EsvRecord
  parseEsvLine(line, header, separator) {
    const values = this.splitEsvLine(line, separator);
    const record = {};
    for (let i = 0; i < header.length; i++) {
      record[header[i]] = values[i];
    }
    return record;
  }
  //funcao que normaliza um valor sem acento
  normalizeValue(value) {
    const trimmedValue = value.trim();
    const normalized = trimmedValue.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return normalized;
  }
  //funcao que verifica se um arquivo existe
  async fileExists(filePath) {
    try {
      import_fs.default.accessSync(filePath);
      return true;
    } catch {
      return false;
    }
  }
};

// src/core/useCases/ReadEsv.ts
var ReadEsv = class {
  repository;
  constructor(repository) {
    this.repository = repository;
  }
  async execute(filePath, separator, skip, limit) {
    const reader = await this.repository.readEsvFile(filePath);
    let lineCount = 0;
    let header = [];
    const records = [];
    for await (const line of reader) {
      if (lineCount === 0) {
        header = this.repository.splitEsvLine(line, separator).map((h) => this.repository.normalizeValue(h));
        lineCount++;
        continue;
      }
      if (skip && skip > 0) {
        skip--;
        continue;
      }
      if (!line) {
        continue;
      }
      if (limit && lineCount > limit) {
        break;
      }
      lineCount++;
      const record = this.repository.parseEsvLine(line, header, separator);
      records.push(record);
    }
    reader.close();
    return records;
  }
};

// src/core/useCases/WriteEsv.ts
var WriteEsv = class {
  repository;
  constructor(repository) {
    this.repository = repository;
  }
  async execute(filePath, data, separator) {
    return await this.repository.writeEsvFile(filePath, data, separator);
  }
};

// src/core/entities/EsvFilter.ts
var EsvFilterOperator = /* @__PURE__ */ ((EsvFilterOperator2) => {
  EsvFilterOperator2["Equals"] = "equals";
  EsvFilterOperator2["NotEquals"] = "notEquals";
  EsvFilterOperator2["Contains"] = "contains";
  EsvFilterOperator2["NotContains"] = "notContains";
  EsvFilterOperator2["StartsWith"] = "startsWith";
  EsvFilterOperator2["NotStartsWith"] = "notStartsWith";
  EsvFilterOperator2["EndsWith"] = "endsWith";
  EsvFilterOperator2["NotEndsWith"] = "notEndsWith";
  EsvFilterOperator2["GreaterThan"] = "greaterThan";
  EsvFilterOperator2["LessThan"] = "lessThan";
  EsvFilterOperator2["GreaterThanOrEqual"] = "greaterThanOrEqual";
  EsvFilterOperator2["LessThanOrEqual"] = "lessThanOrEqual";
  return EsvFilterOperator2;
})(EsvFilterOperator || {});

// src/infra/ops/Operations.ts
var Operations = class {
  filterRow(row, filters) {
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
  switchOperations(operation, filter, row) {
    switch (operation) {
      case "equals" /* Equals */:
        return row[filter.field] === filter.value;
        break;
      case "notEquals" /* NotEquals */:
        return row[filter.field] !== filter.value;
        break;
      case "contains" /* Contains */:
        const value = row[filter.field];
        if (typeof value === "string") return value.includes(filter.value.toString());
        break;
      case "notContains" /* NotContains */:
        const value2 = row[filter.field];
        if (typeof value2 === "string") return !value2.includes(filter.value.toString());
        break;
      case "startsWith" /* StartsWith */:
        const value3 = row[filter.field];
        if (typeof value3 === "string") return value3.startsWith(filter.value.toString());
        break;
      case "notStartsWith" /* NotStartsWith */:
        const value4 = row[filter.field];
        if (typeof value4 === "string") return !value4.startsWith(filter.value.toString());
        break;
      case "endsWith" /* EndsWith */:
        const value5 = row[filter.field];
        if (typeof value5 === "string") return value5.endsWith(filter.value.toString());
        break;
      case "notEndsWith" /* NotEndsWith */:
        const value6 = row[filter.field];
        if (typeof value6 === "string") return !value6.endsWith(filter.value.toString());
        break;
      case "greaterThan" /* GreaterThan */:
        const res = this.verifyNAN(row[filter.field], filter.value);
        if (!res) return false;
        return res.first > res.second;
        break;
      case "lessThan" /* LessThan */:
        const res2 = this.verifyNAN(row[filter.field], filter.value);
        if (!res2) return false;
        return res2.first < res2.second;
        break;
      case "greaterThanOrEqual" /* GreaterThanOrEqual */:
        const res3 = this.verifyNAN(row[filter.field], filter.value);
        if (!res3) return false;
        return res3.first >= res3.second;
        break;
      case "lessThanOrEqual" /* LessThanOrEqual */:
        const res4 = this.verifyNAN(row[filter.field], filter.value);
        if (!res4) return false;
        return res4.first <= res4.second;
        break;
    }
  }
  verifyNAN(first, second) {
    const firstNumber = parseFloat(first.toString());
    const secondNumber = parseFloat(second.toString());
    if (isNaN(firstNumber) || isNaN(secondNumber)) {
      return null;
    }
    return {
      first: firstNumber,
      second: secondNumber
    };
  }
};

// src/core/useCases/FilterEsv.ts
var FilterEsv = class {
  repository;
  operations;
  constructor(repository) {
    this.repository = repository;
    this.operations = new Operations();
  }
  async execute(filePath, separator, skip, limit, filters) {
    const reader = await this.repository.readEsvFile(filePath);
    let lineCount = 0;
    let header = [];
    const records = [];
    for await (const line of reader) {
      if (lineCount === 0) {
        header = this.repository.splitEsvLine(line, separator).map((h) => this.repository.normalizeValue(h));
        lineCount++;
        continue;
      }
      if (!line) {
        continue;
      }
      const record = this.repository.parseEsvLine(line, header, separator);
      if (!this.operations.filterRow(record, filters)) {
        continue;
      }
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
};

// src/core/useCases/UpdateEsv.ts
var UpdateEsv = class {
  repository;
  operations;
  tempPath;
  constructor(repository) {
    this.repository = repository;
    this.operations = new Operations();
    this.tempPath = "";
  }
  async execute(filePath, separator, newData, filters) {
    this.tempPath = `${filePath}.tmp`;
    const tmpExists = await this.repository.fileExists(this.tempPath);
    if (tmpExists) {
      this.repository.deleteFile(this.tempPath);
    }
    const reader = await this.repository.readEsvFile(filePath);
    const writer = this.repository.getFileWriteStream(this.tempPath);
    let lineCount = 0;
    let header = [];
    let updated = false;
    for await (const line of reader) {
      if (lineCount === 0) {
        header = this.repository.splitEsvLine(line, separator).map((h) => this.repository.normalizeValue(h));
        writer.write(this.formatHeader(header, separator));
        lineCount++;
        continue;
      }
      if (!line) {
        continue;
      }
      const record = this.repository.parseEsvLine(line, header, separator);
      if (!this.operations.filterRow(record, filters)) {
        writer.write(line + "\n");
        continue;
      }
      const updatedLine = this.updateLine(record, newData, separator);
      writer.write(updatedLine);
      lineCount++;
      updated = true;
    }
    reader.close();
    writer.end();
    return new Promise((resolve, reject) => {
      writer.on("finish", () => {
        if (!updated) {
          this.repository.deleteFile(this.tempPath);
          reject(new Error("No record updated"));
        }
        console.log("Esv file updated successfully");
        this.repository.renameFile(this.tempPath, filePath);
        resolve();
      });
      writer.on("error", (error) => {
        reject(error);
      });
    });
  }
  updateLine(record, newData, separator) {
    Object.entries(newData).forEach(([key, value]) => {
      record[key] = value;
    });
    return this.formatLine(record, separator);
  }
  formatLine(record, separator) {
    const values = Object.values(record).map(
      (value) => this.repository.escapeField(String(value))
    );
    const line = values.join(separator);
    return line + "\n";
  }
  formatHeader(header, separator) {
    const headerLine = header.map((h) => this.repository.escapeField(h)).join(separator);
    return headerLine + "\n";
  }
};

// src/core/useCases/DeleteEsv.ts
var DeleteEsv = class {
  repository;
  operations;
  tempPath;
  constructor(repository) {
    this.repository = repository;
    this.operations = new Operations();
    this.tempPath = "";
  }
  async execute(filePath, separator, filters) {
    this.tempPath = `${filePath}.tmp`;
    const tmpExists = await this.repository.fileExists(this.tempPath);
    if (tmpExists) {
      this.repository.deleteFile(this.tempPath);
    }
    const reader = await this.repository.readEsvFile(filePath);
    const writer = this.repository.getFileWriteStream(this.tempPath);
    let lineCount = 0;
    let header = [];
    let updated = false;
    for await (const line of reader) {
      if (lineCount === 0) {
        header = this.repository.splitEsvLine(line, separator).map((h) => this.repository.normalizeValue(h));
        writer.write(this.formatHeader(header, separator));
        lineCount++;
        continue;
      }
      if (!line) {
        continue;
      }
      const record = this.repository.parseEsvLine(line, header, separator);
      if (!this.operations.filterRow(record, filters)) {
        writer.write(line + "\n");
        continue;
      }
      lineCount++;
      updated = true;
    }
    reader.close();
    writer.end();
    return new Promise((resolve, reject) => {
      writer.on("finish", () => {
        if (!updated) {
          this.repository.deleteFile(this.tempPath);
          reject(new Error("No record deleted"));
        }
        console.log("Esv record deleted successfully");
        this.repository.renameFile(this.tempPath, filePath);
        resolve();
      });
      writer.on("error", (error) => {
        reject(error);
      });
    });
  }
  formatHeader(header, separator) {
    const headerLine = header.map((h) => this.repository.escapeField(h)).join(separator);
    return headerLine + "\n";
  }
};

// src/viewNodel/EsvViewModel.ts
var EsvViewModel = class {
  repository;
  readEsv;
  writeEsv;
  filterEsv;
  updateEsv;
  deleteEsv;
  constructor() {
    this.repository = new FileSystemEsvRepository();
    this.readEsv = new ReadEsv(this.repository);
    this.writeEsv = new WriteEsv(this.repository);
    this.filterEsv = new FilterEsv(this.repository);
    this.updateEsv = new UpdateEsv(this.repository);
    this.deleteEsv = new DeleteEsv(this.repository);
  }
  async readEsvFile(filePath, skip, limit, separator = "\u{1F60E}") {
    return await this.readEsv.execute(filePath, separator, skip, limit);
  }
  async writeEsvFile(filePath, data, separator = "\u{1F60E}") {
    return await this.writeEsv.execute(filePath, data, separator);
  }
  async filterEsvFile(filePath, skip, limit, filters, separator = "\u{1F60E}") {
    return await this.filterEsv.execute(filePath, separator, skip, limit, filters);
  }
  async updateEsvFile(filePath, newData, filters, separator = "\u{1F60E}") {
    return await this.updateEsv.execute(filePath, separator, newData, filters);
  }
  async deleteEsvFile(filePath, filters, separator = "\u{1F60E}") {
    return await this.deleteEsv.execute(filePath, separator, filters);
  }
};

// src/index.ts
var QuickEsv = EsvViewModel;
var ManualEsv = FileSystemEsvRepository;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EsvFilterOperator,
  ManualEsv,
  QuickEsv
});
//# sourceMappingURL=index.cjs.map