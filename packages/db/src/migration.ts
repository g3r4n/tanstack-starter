import { publicDb } from "./client";
import { migrateTenant } from "./migration.utils";

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
