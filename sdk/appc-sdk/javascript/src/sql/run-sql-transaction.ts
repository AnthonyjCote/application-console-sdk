import type { AppcSqlTransactionResult, AppcSqlTransactionStatement } from "@application-console/host-protocol";
import {
  sendAppcHostRequest,
  type AppcHostRequestOptions
} from "../host-transport/send-appc-host-request.js";

export async function runSqlTransaction(
  statements:AppcSqlTransactionStatement[],
  database="main",
  options:AppcHostRequestOptions={}
):Promise<AppcSqlTransactionResult>{
  return sendAppcHostRequest<AppcSqlTransactionResult>(
    "sql.transaction",
    {database,statements},
    options
  );
}
