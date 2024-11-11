import { sql } from "drizzle-orm/sql";

import { publicDb } from "./client";
import { migrateTenant } from "./migration.utils";

export * from "drizzle-orm/sql";

export function generateSchemaName(input: string): string {
  // Remove non-alphanumeric characters and add _ instead of
  const sanitizedInput = input
    .replace(/[^a-zA-Z0-9]/g, " ")
    .trim()
    .split(" ")
    .join("_");
  // schema name need to be 60 char max
  return sanitizedInput.slice(0, 60);
}

export async function createTenantSchema(schemaName: string) {
  // create schema
  await publicDb.execute(sql.raw(`CREATE SCHEMA ${schemaName};`));
  // add all tyhe needed table and structure
  await migrateTenant(schemaName);
}
