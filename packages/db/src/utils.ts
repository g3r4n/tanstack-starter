import type { PgTableFn } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";
import { pgSchema, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

import { publicDb } from "./client";

export const pgTenantSchema = (
  tenantId: string,
): Pick<ReturnType<typeof pgSchema>, "table"> => {
  if (tenantId) {
    return pgSchema(tenantId);
  }
  return { table: pgTable as unknown as PgTableFn<string> };
};

export const id = () =>
  varchar("id", { length: 128 }).$default(() => createId());

export function trackingFields() {
  return {
    createdOn: timestamp("createdOn", {
      mode: "date",
    }).default(sql`now()`),
    createdById: varchar("createdBy", { length: 128 })
      .notNull()
      .$default(() => "SYSTEM"),
    updatedOn: timestamp("updatedOn", {
      mode: "date",
    }),
    updatedById: varchar("updatedBy", { length: 128 }),
    deletedOn: timestamp("deletedOn", {
      mode: "date",
    }),
    deletedById: varchar("deletedBy", { length: 128 }),
  };
}

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
