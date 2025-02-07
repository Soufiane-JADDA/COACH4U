import { supabase } from "./createClient";
import { GoalType } from "@/app/(tabs)/goal";

export const signUpUser = async (email: string, password: string) => {
  if (supabase) {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      console.log("error in signUpUser query", error);
      return null;
    } else return data.user?.id;
  } else {
    console.error("Supabase client is not initialized.");
  }
};

export const addUser = async (
  userId: string,
  firstName: string,
  lastName: string,
  email: string,
  height: string,
  weight: string,
  age: string,
  sex: string
) => {
  if (supabase) {
    const { data, error } = await supabase.from("users").insert([
      {
        id: userId,
        first_name: firstName,
        last_name: lastName,
        sex,
        age: parseInt(age),
        weight: parseFloat(weight),
        height: parseFloat(height),
        email,
      },
    ]);
    if (error) console.log("error in addUser query", error);
    else return true;
  } else {
    console.error("Supabase client is not initialized.");
  }
};

export const signInUser = async (email: string, password: string) => {
  if (supabase) {
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.log("error in signInUser query: ", error);
      return false;
    } else return true;
  } else {
    console.error("Supabase client is not initialized.");
  }
};

export const updateUser = async (
  firstName: string,
  lastName: string,
  email: string,
  height: string,
  weight: string,
  age: string,
  sex: string
) => {
  if (!supabase) {
    console.error("Supabase client is not initialized.");
    return false;
  }

  // Get the logged-in user ID
  const id = await getUserId();
  if (!id) {
    console.error("User not authenticated.");
    return false;
  }

  // Attempt to update the user data
  const { data, error } = await supabase
    .from("users")
    .update({
      first_name: firstName,
      last_name: lastName,
      email: email,
      height: parseFloat(height) || null,
      weight: parseFloat(weight) || null,
      age: parseInt(age) || null,
      sex: sex,
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating user:", error);
    return false;
  }

  console.log("User updated successfully:", data);
  return true;
};


export const updateReferences = async (
  goal: GoalType,
  hasEquipment: boolean,
  selectedInjuries: any[]
) => {
  if (supabase) {
    const id = await getUserId();
    const { data, error } = await supabase
      .from("users")
      .update({ goal, equipement: hasEquipment, injuries: selectedInjuries })
      .eq("id", id);
  } else {
    console.error("Supabase client is not initialized.");
  }
};

export const getReferences = async () => {
  if (supabase) {
    const id = await getUserId();

    let { data: users, error } = await supabase
      .from("users")
      .select("goal,equipement,injuries")
      .eq("id", id);

    return users && users[0];
  } else {
    console.error("Supabase client is not initialized.");
  }
};

const getUserId = async () => {
  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user?.id;
  }
  return null;
};

export const getUserData = async () => {
  if (supabase) {
    const id = await getUserId();
    let { data: users, error } = await supabase.from("users").select().eq("id", id);

    return users;
  }
};
