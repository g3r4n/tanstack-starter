import { relations } from "drizzle-orm";
import { varchar } from "drizzle-orm/pg-core";

import { id, pgTenantSchema } from "../../utils";
import { usersToTeamsSchema } from "./usersToTeams";

export const teamsSchema = (tenantId: string) =>
  pgTenantSchema(tenantId).table("teams", {
    id: id().primaryKey(),
    name: varchar("name"),
  });
export const teamsRelations = (tenantId: string) => {
  const teams = teamsSchema(tenantId);
  const usersToTeams = usersToTeamsSchema(tenantId);
  return relations(teams, ({ many }) => ({
    usersToTeams: many(usersToTeams),
  }));
};
