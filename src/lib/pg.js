import pg from "pg";
import { config } from "../common/config/index.js";

const Pool = pg.Pool;

const pool = new Pool({
  host: config.dbHost,
  database: config.dbName,
  password: config.dbPassword,
  port: config.dbPort,
  user: config.dbUser,
});

export class Postgres {
  async fetch(SQL, ...args) {
    const clien = await pool.connect();
    try {
      const {
        rows: [row],
      } = await clien.query(SQL, args);
      return row;
    } finally {
      clien.release();
    }
  }

  async fetchAll(SQL, ...args) {
    const clien = await pool.connect();
    try {
      const { rows } = await clien.query(SQL, args);
      return rows;
    } finally {
      clien.release();
    }
  }
}
