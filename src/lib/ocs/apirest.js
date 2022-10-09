// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Low, JSONFile } from 'lowdb'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

export class DataBase {
   constructor(filename) {
    this.db = undefined
    this.filename = filename
    this.connect()
  }

  connect() {
    (async () => {
      const __dirname = dirname(fileURLToPath(import.meta.url))
      // Use JSON file for storage
      const file = join(__dirname, this.filename)
      //const file = "$lib/apirest/db.json";
      console.log(file)
      const adapter = new JSONFile(file)
      this.db = new Low(adapter)

      // Read data from JSON file, this will set db.data content
      await this.db.read()

      this.db.data = this.db.data || {}
      // Write db.data content to db.json
      await this.db.write()
    })()
  }

  async read() {
    await db.read()
    return db.data
  }
}
