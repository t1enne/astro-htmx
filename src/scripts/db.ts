import fs from "node:fs";
import path from "path";

export interface IEntry {
  id: string;
  fruit: string;
  size: string;
}

class DataBaseC {
  FILE_PATH = path.join(path.resolve(path.dirname("")), "local_db.jsonl");
  file = "";
  rows: IEntry[] = [];
  constructor() {
    this.init(true);
  }
  init(update = false) {
    let file: string;
    try {
      file = fs.readFileSync(this.FILE_PATH, { encoding: "utf-8" });
    } catch (e) {
      fs.writeFileSync(this.FILE_PATH, "", { flag: "wx" });
      file = fs.readFileSync(this.FILE_PATH, { encoding: "utf-8" });
    }
    const lines = file.split(/\n/).filter(Boolean);
    const rows = lines.map((row) => {
      return JSON.parse(row) as IEntry;
    });
    if (update) {
      this.file = file;
      this.rows = rows;
    }
    return { file, rows };
  }
  add(fruit: string, size: string) {
    if (fruit == "Apple") {
      return false;
    }
    const id = this.rows.length + 1 + "";
    const newLine = `${JSON.stringify({ id, fruit, size })}\n`;
    fs.appendFileSync(this.FILE_PATH, newLine, "utf8");
    this.file = this.file + newLine;
    this.rows.push({ id, fruit, size });
    return true;
  }

  update(updatedItem: Partial<IEntry>) {
    const row = this.rows.find((r) => r.id == updatedItem.id);
    if (!row) {
      return false;
    }

    Object.assign(row, updatedItem);
    console.log({ row });
    this.serialize();
    return true;
  }

  delete(id: string) {
    this.rows = this.rows.filter((row) => row.id != id);
    this.serialize();
    return true;
  }

  serialize() {
    this.file = this.rows.map((row) => JSON.stringify(row)).join("\n");
    fs.writeFileSync(this.FILE_PATH, this.file, "utf8");
  }
}
const myDB = new DataBaseC();
export default myDB;
