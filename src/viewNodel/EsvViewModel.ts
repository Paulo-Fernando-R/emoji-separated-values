import fs from "fs";
import ReadLine from "readline";
import { FileSystemEsvRepository } from "../infra/fs/FileSystemEsvRepository.ts";
import { ReadEsv } from "../core/useCases/ReadEsv.ts";
import { resolve } from "path";

export async function readEsvFile(filePath: string, separator: string) {
    return await new ReadEsv(new FileSystemEsvRepository()).execute(filePath, separator);
}

//função que divide uma linha em campos usando o emoji como separador
function splitEsvLine(line: string): string[] {
    return line.split("🟩");
}

//transforma uma linha em um objeto EsvRecord
function parseEsvLine(line: string, header: string[]): EsvRecord {
    const values = splitEsvLine(line);
    const record: EsvRecord = {};

    for (let i = 0; i < header.length; i++) {
        record[header[i]] = values[i];
    }

    return record;
}

//definição do tipo EsvRecord
type EsvRecord = Record<string, string | number | boolean>;

//normaliza o valor removendo acentos e espaços extras
function normalizeValue(value: string): string | number | boolean {
    const trimmedValue = value.trim();

    const normalized = trimmedValue.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    return normalized;
}

export async function writeEsvFile(filePath: string, data: EsvRecord[]) {
    const stream = fs.createWriteStream(filePath, { encoding: "utf-8" });
    const separator = "🟩";

    let lineCount = 0;

    for (const record of data) {
        if (lineCount === 0) {
            const header = Object.keys(record);
            const headerLine = header.map(escapeField).join(separator);
            stream.write(headerLine + "\n");
            lineCount++;
            continue;
        }

        const values = Object.values(record).map((value) => escapeField(String(value)));
        const line = values.join(separator);
        stream.write(line + "\n");
        lineCount++;
    }
    stream.end();

    return new Promise<void>((resolve, reject) => {
        stream.on("finish", () => {
            resolve();
        });
        stream.on("error", (error) => {
            reject(error);
        });
    });
}

function escapeField(valor: string): string {
    if (/[",\n]/.test(valor)) {
        return `"${valor.replace(/"/g, '""')}"`;
    }
    return valor;
}
