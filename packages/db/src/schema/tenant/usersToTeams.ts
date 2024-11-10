import { relations } from "drizzle-orm";
import { primaryKey, varchar } from "drizzle-orm/pg-core";

import { pgTenantSchema } from "../../utils";
import { User } from "../public/auth";
import { teamsSchema } from "./teams";

export const usersToTeamsSchema = (tenantId: string) =>
  pgTenantSchema(tenantId).table(
    "users_to_teams",
    {
      userId: varchar("user_id", { length: 128 })
        .notNull()
        .references(() => User.id),
      teamId: varchar("team_id", { length: 128 })
        .notNull()
        .references(() => teamsSchema(tenantId).id),
    },
    (t) => ({
      pk: primaryKey({ columns: [t.userId, t.teamId] }),
    }),
  );
export const usersToTeamsRelations = (tenantId: string) => {
  const usersToTeams = usersToTeamsSchema(tenantId);
  const teams = teamsSchema(tenantId);
  return relations(usersToTeams, ({ one }) => ({
    team: one(teams, {
      fields: [usersToTeams.teamId],
      references: [teams.id],
    }),
    user: one(User, {
      fields: [usersToTeams.userId],
      references: [User.id],
    }),
  }));
};
