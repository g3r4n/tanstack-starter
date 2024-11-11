import { getTenantDb } from "../../client";

const tenantSchemas = getTenantDb("");
const { teams, usersToTeams } = tenantSchemas.schema;
export { teams, usersToTeams };
