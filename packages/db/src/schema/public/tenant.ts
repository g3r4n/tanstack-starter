import { pgTable, varchar } from "drizzle-orm/pg-core";

import { id } from "../../utils";

export const tenant = pgTable("tenant", {
  // id of the tenant used for relations
  id: id(),
  // schema name used to retrieve data
  schema_name: varchar("schema_name", { length: 60 }).unique().notNull(),
  // name of the tenant, this can be changed at any time
  name: varchar("name").notNull(),
});
