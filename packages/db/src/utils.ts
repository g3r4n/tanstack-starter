import type { PgTableFn } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";
import { pgSchema, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

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
