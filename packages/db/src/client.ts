import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as authSchema from "./schema/public/auth";
import { tenant } from "./schema/public/tenant";
import { teamsRelations, teamsSchema } from "./schema/tenant/teams";
import {
  usersToTeamsRelations,
  usersToTeamsSchema,
} from "./schema/tenant/usersToTeams";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const dbClient = postgres(process.env.DATABASE_URL);
export const publicDb = drizzle(dbClient, {
  schema: {
    ...authSchema,
    tenant,
  },
});

export const getTenantDb = (tenantId: string) => {
  const schema = {
    // table
    teams: teamsSchema(tenantId),
    usersToTeams: usersToTeamsSchema(tenantId),
    // relations
    teamsRelations: teamsRelations(tenantId),
    usersToTeamsRelations: usersToTeamsRelations(tenantId),
  };
  const db = drizzle(dbClient, {
    schema,
  });
  return { db, schema } as const;
};
