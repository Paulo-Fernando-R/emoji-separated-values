import fs from "fs";
import ReadLine from "readline";

export async function readEsvFile(filePath: string) {
    const stream = fs.createReadStream(filePath, { encoding: "utf-8" });

    const reader = ReadLine.createInterface({
        input: stream,
        crlfDelay: Infinity,
    });

    let lineCount = 0;
    let header: string[];

    for await (const line of reader) {
        if (lineCount === 0) {
            header = splitEsvLine(line).map((h) => normalizeValue(h) as string);
            console.log("Header:", header);
            lineCount++;
            continue;
        }

        lineCount++;
        const record = parseEsvLine(line, header!);
        console.log("Record:", record["Profissao"]); // Example: Accessing the "profissao" field
    }

    reader.close();
    console.log("Finished reading the file.");
}

function splitEsvLine(line: string): string[] {
    return line.split("🟩");
}

function parseEsvLine(line: string, header: string[]): EsvRecord {
    const values = splitEsvLine(line);
    const record: EsvRecord = {};

    for (let i = 0; i < header.length; i++) {
        record[header[i]] = values[i];
    }

    return record;
}

type EsvRecord = Record<string, string | number | boolean>;

function normalizeValue(value: string): string | number | boolean {
    const trimmedValue = value.trim();

    const normalized = trimmedValue.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    return normalized;
}
