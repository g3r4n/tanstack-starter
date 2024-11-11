import { sql } from "drizzle-orm/sql";

import { publicDb } from "./client";

export * from "drizzle-orm/sql";
export function generateSchemaName(input: string): string {
  // Remove non-alphanumeric characters and add - instead of
  const sanitizedInput = input
    .replace(/[^a-zA-Z0-9]/g, " ")
    .trim()
    .split(" ")
    .join("-");
  // schema name need to be 60 char max
  return sanitizedInput.slice(0, 60);
}

export function createTenantSchema(
  schemaName: string,
  templateSchemaName = "template_schema",
) {
  return publicDb.execute(
    sql.raw(`CREATE SCHEMA ${schemaName} LIKE ${templateSchemaName};`),
  );
}
