import type { AppcSqlQueryResult } from "@application-console/host-protocol";
import {
  sendAppcHostRequest,
  type AppcHostRequestOptions
} from "../host-transport/send-appc-host-request.js";

export async function querySql(
  sql:string,
  parameters:unknown[]=[],
  database="main",
  options:AppcHostRequestOptions={}
):Promise<AppcSqlQueryResult>{
  return sendAppcHostRequest<AppcSqlQueryResult>(
    "sql.query",
    {database,sql,parameters},
    options
  );
}
