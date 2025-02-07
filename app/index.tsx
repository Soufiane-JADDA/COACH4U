import React, { useEffect, useState } from "react";

import LoginPage from "./(auth)/login";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/database/createClient";
import MainScreen from "./(tabs)/main";
import RootLayout from "./_layout";
import { Stack } from "expo-router";

export let sessionGlobal: Session | null;

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase?.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      sessionGlobal = session;
    });

    supabase?.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      sessionGlobal = session;
    });
  }, []);
  return (
    <>
      <LoginPage session={session} />
    </>
  );
}
