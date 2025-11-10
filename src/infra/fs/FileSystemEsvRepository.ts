import { type EsvRow } from "../../core/entities/EsvRow.ts";
import ReadLine from "readline";
import fs from "fs";
export class FileSystemEsvRepository {
    async readEsvFile(filePath: string) {
        const stream = fs.createReadStream(filePath, { encoding: "utf-8" });

        const reader = ReadLine.createInterface({
            input: stream,
            crlfDelay: Infinity,
        });

        return reader;
    }

    async writeEsvFile(filePath: string, data: EsvRow[], separator: string) {
        const stream = fs.createWriteStream(filePath, { encoding: "utf-8" });

        let lineCount = 0;

        for (const record of data) {
            if (lineCount === 0) {
                const header = Object.keys(record);
                const headerLine = header.map(this.escapeField).join(separator);
                stream.write(headerLine + "\n");
                lineCount++;
                continue;
            }

            const values = Object.values(record).map((value) => this.escapeField(String(value)));
            const line = values.join(separator);
            stream.write(line + "\n");
            lineCount++;
        }
        stream.end();

        return new Promise<void>((resolve, reject) => {
            stream.on("finish", () => {
                console.log("Esv file written successfully");
                resolve();
            });
            stream.on("error", (error) => {
                reject(error);
            });
        });
    }

    escapeField(valor: string): string {
        if (/[",\n]/.test(valor)) {
            return `"${valor.replace(/"/g, '""')}"`;
        }
        return valor;
    }

    //função que divide uma linha em campos usando o emoji como separador
    splitEsvLine(line: string, separator: string): string[] {
        return line.split(separator);
    }

    //transforma uma linha em um objeto EsvRecord
    parseEsvLine(line: string, header: string[], separator: string): EsvRow {
        const values = this.splitEsvLine(line, separator);
        const record: EsvRow = {};

        for (let i = 0; i < header.length; i++) {
            record[header[i]] = values[i];
        }

        return record;
    }

    normalizeValue(value: string): string | number | boolean {
        const trimmedValue = value.trim();

        const normalized = trimmedValue.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        return normalized;
    }
}
