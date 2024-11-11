import { migrate } from "drizzle-orm/postgres-js/migrator";

import { sql } from ".";
import { getTenantDb } from "./client";

export async function migrateTenant(schema_name: string) {
  const drizzleDb = getTenantDb(schema_name);
  await drizzleDb.db.execute(sql.raw(`SET search_path TO '${schema_name}'`));
  await migrate(drizzleDb.db, {
    migrationsFolder: "./src/migrations/tenants",
    migrationsSchema: schema_name,
  });
}
