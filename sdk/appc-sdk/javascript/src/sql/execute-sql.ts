import type { AppcSqlExecuteResult } from "@application-console/host-protocol";
import {
  sendAppcHostRequest,
  type AppcHostRequestOptions
} from "../host-transport/send-appc-host-request.js";

export async function executeSql(
  sql:string,
  parameters:unknown[]=[],
  database="main",
  options:AppcHostRequestOptions={}
):Promise<AppcSqlExecuteResult>{
  return sendAppcHostRequest<AppcSqlExecuteResult>(
    "sql.execute",
    {database,sql,parameters},
    options
  );
}
