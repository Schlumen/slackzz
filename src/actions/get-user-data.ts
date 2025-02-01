"use server";

import { supabaseServerClient } from "@/lib/supabase/server";
import supabaseServerClientPages from "@/lib/supabase/supabaseServerPage";
import { User } from "@/types/app";
import { NextApiRequest, NextApiResponse } from "next";

export const getUserData = async (): Promise<User | null> => {
  const supabase = await supabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.log("NO USER", user);
    return null;
  }

  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("id", user.id);

  if (error) {
    console.error("ERROR", error);
    return null;
  }

  return data ? data[0] : null;
};

export const getUserDataPages = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<User | null> => {
  const supabase = supabaseServerClientPages(req, res);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.log("NO USER", user);
    return null;
  }

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id);

  if (error) {
    console.error("ERROR", error);
    return null;
  }

  return data ? data[0] : null;
};
