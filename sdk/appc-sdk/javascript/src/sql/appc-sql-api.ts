import { executeSql } from "./execute-sql.js";
import { querySql } from "./query-sql.js";
import { runSqlTransaction } from "./run-sql-transaction.js";
export const sql = Object.freeze({ execute: executeSql, query: querySql, transaction: runSqlTransaction });
