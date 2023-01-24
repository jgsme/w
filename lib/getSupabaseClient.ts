import { createClient } from "https://esm.sh/@supabase/supabase-js@2.2.3";
import type { Database } from "./database.types.ts";

export const client = createClient<Database>(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_ANON_KEY")!
);
