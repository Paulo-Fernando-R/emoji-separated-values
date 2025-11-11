# 😎 @paulof25/emoji-separated-values (.ESV)

> The modern, fun, and slightly absurd alternative to `.CSV` files.

`emoji-separated-values` (or simply **ESV**) is your new favorite npm package for handling text-based data. Forget about boring commas — we use **emojis** as delimiters. Because why not?

---

## 🚀 Features

- **Read, write, and update** `.ESV` files easily.  
- Built with **streams** for high performance — even your old, Inca-era PC can handle it.  
- Can be used as a **lightweight database**, supporting full CRUD operations.  
- Includes **filtering**, **query-like syntax**, and both **simple** and **advanced** APIs.  
- Fully compatible with traditional `.CSV` files (but... why would you do that?).  

---

## 🧠 Philosophy

`emoji-separated-values` embraces the most effective agile methodology ever invented:  
**XGH — Extreme Go Horse™**.

Even though the project itself wasn’t built that way (thankfully), the spirit remains:  
> “Do as I say, not as I do.” 🐎

---

## ⚙️ Installation

```bash
npm install @paulof25/emoji-separated-values
```


---

## 💻 Usage

### 🟢 Reading — Simple Example

```ts
import { QuickEsv } from "@paulof25/emoji-separated-values";

async function read() {
  const esv = new QuickEsv();

  const list = await esv.readEsvFile("public/esvFile.esv", 10, 10, "🟩");
  console.log(list);
}
```

**Parameters**
| Name | Type | Description |
|------|------|-------------|
| `filePath` | `string` | Path to the `.esv` file |
| `skip` | `number` | Number of rows to skip |
| `limit` | `number` | Max number of rows to read |
| `separator` | `string` | Emoji used as separator |

---

### 🧩 Reading with Filters

```ts
import {
  EsvFilterOperator,
  QuickEsv,
  type EsvFilterType
} from "@paulof25/emoji-separated-values";

const filters = [
  { field: "City", value: "Rio de Janeiro", operator: EsvFilterOperator.Equals },
  { field: "Profession", value: "Entrepreneur", operator: EsvFilterOperator.NotEquals },
  { field: "Age", value: 20, operator: EsvFilterOperator.LessThanOrEqual },
];

async function filter() {
  const esv = new QuickEsv();
  const filtered = await esv.filterEsvFile("public/esvFile.esv", 0, 10, filters, "🟩");
  console.log(filtered);
}
```

---

### ✍️ Writing

```ts
import { QuickEsv, type EsvRowType } from "@paulof25/emoji-separated-values";

const data: EsvRowType[] = [
  { Name: "João", Age: "28", City: "Rio de Janeiro", Profession: "Architect" },
  { Name: "Lucas", Age: "36", City: "Belém", Profession: "Designer" },
  { Name: "Isabela", Age: "51", City: "Rio de Janeiro", Profession: "Entrepreneur" }
];

async function write() {
  const esv = new QuickEsv();
  await esv.writeEsvFile("public/esvFile.esv", data, "🟩");
}
```

If the file doesn’t exist, it will be **created**.  
If it exists, new data will be **appended**.

---

### 🔄 Updating

```ts
import {
  EsvFilterOperator,
  type EsvFilterType,
  QuickEsv,
  type EsvRowType
} from "@paulof25/emoji-separated-values";

const filters = [
  { field: "City", value: "Rio de Janeiro", operator: EsvFilterOperator.Equals },
  { field: "Profession", value: "Entrepreneur", operator: EsvFilterOperator.NotEquals },
  { field: "Age", value: 20, operator: EsvFilterOperator.LessThanOrEqual },
];

async function update() {
  const esv = new QuickEsv();
  await esv.updateEsvFile(
    "public/esvFile.esv",
    { Name: "João", Age: "28", City: "Rio de Janeiro", Profession: "Architect" },
    filters,
    "🟩"
  );
}
```

---

### 🗑️ Deleting

```ts
import {
  EsvFilterOperator,
  QuickEsv,
  type EsvFilterType
} from "@paulof25/emoji-separated-values";

const filters = [
  { field: "City", value: "Rio de Janeiro", operator: EsvFilterOperator.Equals },
  { field: "Profession", value: "Entrepreneur", operator: EsvFilterOperator.NotEquals },
  { field: "Age", value: 20, operator: EsvFilterOperator.LessThanOrEqual },
];

async function deleteData() {
  const esv = new QuickEsv();
  await esv.deleteEsvFile("public/esvFile.esv", filters, "🟩");
}
```

---

## ⚡ Advanced Usage (for the brave)

If you enjoy doing things the hard way — maybe for performance reasons (or just for fun) — you can use the **manual API**.

It gives you fine-grained control over file operations using `ManualEsv`, ideal for large `.ESV` files.

Examples include:

- Reading manually line by line  
- Filtering rows with custom logic  
- Updating or deleting rows using stream-based operations  

> ⚠️ But let’s be honest — your file probably isn’t that big. 😉

(See `/examples/manual/` in the repo for full reference code.)

---

## 🤝 Contributing

Contributions are welcome!  
If you want to improve this ridiculous yet brilliant idea, feel free to:

1. Fork the repository  
2. Create a new branch (`feature/your-feature`)  
3. Commit your changes  
4. Submit a pull request  

Please make sure to write clear commit messages and keep the humor consistent.  

---

## 🪪 License

MIT License © 2025 — PauloF25 
Feel free to use, modify, and share this package as long as you don’t replace the emojis with commas. That would be blasphemy.

---

## 🧡 Final Words

`.CSV` is the past.  
`.ESV` is the future.  

Because **data should make you smile**. 😄


---

## 🧠 Advanced Examples

> For those who like to suffer a little more than necessary —  
> welcome to the *Manual Mode*.

If you’re handling a huge `.ESV` file (or if you just want to look smart in front of your teammates), you can use the **Manual API**, which exposes lower-level control over reading, filtering, updating, and deleting data using Node streams.

---

### 📖 Manual Read (No Filters)

```ts
import { ManualEsv, type EsvRowType } from "@paulof25/emoji-separated-values";

export class ReadEsv {
  repository: ManualEsv;

  constructor(repository: ManualEsv) {
    this.repository = repository;
  }

  async execute(filePath: string, separator: string, skip?: number, limit?: number) {
    const reader = await this.repository.readEsvFile(filePath);

    let lineCount = 0;
    let header: string[] = [];
    const records: EsvRowType[] = [];

    for await (const line of reader) {
      if (lineCount === 0) {
        header = this.repository
          .splitEsvLine(line, separator)
          .map((h) => this.repository.normalizeValue(h) as string);
        lineCount++;
        continue;
      }

      if (skip && skip > 0) {
        skip--;
        continue;
      }

      if (!line) continue;
      if (limit && lineCount > limit) break;

      lineCount++;
      const record = this.repository.parseEsvLine(line, header, separator);
      records.push(record);
    }

    reader.close();
    return records;
  }
}
```

---

### 🔍 Manual Read with Filters

```ts
import {
  ManualEsv,
  type EsvRowType,
  type EsvFilterType,
  Operations
} from "@paulof25/emoji-separated-values";

export class FilterEsv {
  repository: ManualEsv;
  operations: Operations;

  constructor(repository: ManualEsv) {
    this.repository = repository;
    this.operations = new Operations();
  }

  async execute(
    filePath: string,
    separator: string,
    skip?: number,
    limit?: number,
    filters?: EsvFilterType[]
  ) {
    const reader = await this.repository.readEsvFile(filePath);

    let lineCount = 0;
    let header: string[] = [];
    const records: EsvRowType[] = [];

    for await (const line of reader) {
      if (lineCount === 0) {
        header = this.repository
          .splitEsvLine(line, separator)
          .map((h) => this.repository.normalizeValue(h) as string);
        lineCount++;
        continue;
      }

      if (!line) continue;

      const record = this.repository.parseEsvLine(line, header, separator);
      if (!this.operations.filterRow(record, filters)) continue;

      if (skip && skip > 0) {
        skip--;
        continue;
      }

      if (limit && lineCount > limit) break;

      records.push(record);
      lineCount++;
    }

    reader.close();
    return records;
  }
}
```

---

### 🧩 Manual Update

```ts
import {
  ManualEsv,
  type EsvRowType,
  type EsvFilterType,
  Operations
} from "@paulof25/emoji-separated-values";

export class UpdateEsv {
  repository: ManualEsv;
  operations: Operations;
  tempPath: string;

  constructor(repository: ManualEsv) {
    this.repository = repository;
    this.operations = new Operations();
    this.tempPath = "";
  }

  async execute(filePath: string, separator: string, newData: EsvRowType, filters: EsvFilterType[]) {
    this.tempPath = `${filePath}.tmp`;

    const tmpExists = await this.repository.fileExists(this.tempPath);
    if (tmpExists) this.repository.deleteFile(this.tempPath);

    const reader = await this.repository.readEsvFile(filePath);
    const writer = this.repository.getFileWriteStream(this.tempPath);

    let lineCount = 0;
    let header: string[] = [];
    let updated = false;

    for await (const line of reader) {
      if (lineCount === 0) {
        header = this.repository
          .splitEsvLine(line, separator)
          .map((h) => this.repository.normalizeValue(h) as string);

        writer.write(this.formatHeader(header, separator));
        lineCount++;
        continue;
      }

      if (!line) continue;

      const record = this.repository.parseEsvLine(line, header, separator);
      if (!this.operations.filterRow(record, filters)) {
        writer.write(line + "\n");
        continue;
      }

      const updatedLine = this.updateLine(record, newData, separator);
      writer.write(updatedLine);
      updated = true;
      lineCount++;
    }

    reader.close();
    writer.end();

    return new Promise<void>((resolve, reject) => {
      writer.on("finish", () => {
        if (!updated) {
          this.repository.deleteFile(this.tempPath);
          return reject(new Error("No record updated"));
        }
        console.log("ESV file updated successfully");
        this.repository.renameFile(this.tempPath, filePath);
        resolve();
      });
      writer.on("error", reject);
    });
  }

  updateLine(record: EsvRowType, newData: EsvRowType, separator: string) {
    Object.entries(newData).forEach(([key, value]) => (record[key] = value));
    return this.formatLine(record, separator);
  }

  formatLine(record: EsvRowType, separator: string) {
    const values = Object.values(record).map((value) =>
      this.repository.escapeField(String(value))
    );
    return values.join(separator) + "\n";
  }

  formatHeader(header: string[], separator: string) {
    return header.map((h) => this.repository.escapeField(h)).join(separator) + "\n";
  }
}
```

---

### 💀 Manual Delete

```ts
import { ManualEsv, type EsvFilterType, Operations } from "@paulof25/emoji-separated-values";

export class DeleteEsv {
  repository: ManualEsv;
  operations: Operations;
  tempPath: string;

  constructor(repository: ManualEsv) {
    this.repository = repository;
    this.operations = new Operations();
    this.tempPath = "";
  }

  async execute(filePath: string, separator: string, filters: EsvFilterType[]) {
    this.tempPath = `${filePath}.tmp`;

    const tmpExists = await this.repository.fileExists(this.tempPath);
    if (tmpExists) this.repository.deleteFile(this.tempPath);

    const reader = await this.repository.readEsvFile(filePath);
    const writer = this.repository.getFileWriteStream(this.tempPath);

    let lineCount = 0;
    let header: string[] = [];
    let deleted = false;

    for await (const line of reader) {
      if (lineCount === 0) {
        header = this.repository
          .splitEsvLine(line, separator)
          .map((h) => this.repository.normalizeValue(h) as string);

        writer.write(this.formatHeader(header, separator));
        lineCount++;
        continue;
      }

      if (!line) continue;

      const record = this.repository.parseEsvLine(line, header, separator);
      lineCount++;

      if (this.operations.filterRow(record, filters)) {
        deleted = true;
      } else {
        writer.write(line + "\n");
      }
    }

    reader.close();
    writer.end();

    return new Promise<void>((resolve, reject) => {
      writer.on("finish", () => {
        if (!deleted) {
          this.repository.deleteFile(this.tempPath);
          return reject(new Error("No record deleted"));
        }
        console.log("ESV record deleted successfully");
        this.repository.renameFile(this.tempPath, filePath);
        resolve();
      });
      writer.on("error", reject);
    });
  }

  formatHeader(header: string[], separator: string) {
    return header.map((h) => this.repository.escapeField(h)).join(separator) + "\n";
  }
}
```

