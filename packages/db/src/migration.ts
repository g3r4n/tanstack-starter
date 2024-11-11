import { migrate } from "drizzle-orm/postgres-js/migrator";
import { sql } from "drizzle-orm/sql";

import { getTenantDb, publicDb } from "./client";

export async function migrateTenant(schema_name: string) {
  const drizzleDb = getTenantDb(schema_name);
  await drizzleDb.db.execute(sql.raw(`SET search_path TO '${schema_name}'`));
  await migrate(drizzleDb.db, {
    migrationsFolder: "./src/migrations/tenants",
    migrationsSchema: schema_name,
  });
}

async function main() {
  const tenants = await publicDb.query.tenant.findMany({
    columns: {
      schema_name: true,
    },
  });
  for (const { schema_name } of tenants) {
    await migrateTenant(schema_name);
  }
}

await main();
console.log("done");
process.exit(0);
