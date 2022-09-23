import { useMemo, useState } from "preact/hooks";
import type { FunctionComponent } from "preact";
import { createClient } from "supabase";
import { Database } from "../lib/database.types.ts";

const SignUp: FunctionComponent<{ url: string; _key: string }> = (
  { url, _key },
) => {
  const client = useMemo(() => {
    return createClient<Database>(
      url,
      _key,
    );
  }, [url, _key]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <div>
        <input
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
        >
        </input>
      </div>
      <div>
        <input
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
          type="password"
        >
        </input>
      </div>
      <div>
        <button
          onClick={async () => {
            const { data, error } = await client.auth.signUp({
              email,
              password,
            });
            console.log(data, error);
          }}
        >
          sign up
        </button>
      </div>
    </div>
  );
};

export default SignUp;
