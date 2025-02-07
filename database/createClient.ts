import { AppState } from "react-native";
import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uiertmqscndmogqvjczy.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpZXJ0bXFzY25kbW9ncXZqY3p5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNDY2MzAsImV4cCI6MjA1MzcyMjYzMH0.ZN5kNdfRmixax7HgJBvQstnmoPxTJ-xNhol1n8PeFk8";

const isBrowser = typeof window !== "undefined";

export const supabase = isBrowser
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    })
  : null;

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase?.auth.startAutoRefresh();
  } else {
    supabase?.auth.stopAutoRefresh();
  }
});
