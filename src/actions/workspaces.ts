"use server";

import { getUserData } from "@/actions/get-user-data";
import { supabaseServerClient } from "@/lib/supabase/server";
import { addMemberToWorkspace } from "@/actions/add-member-to-workspace";
import { updateUserWorkspace } from "@/actions/update-user-workspace";

export const getUserWorkspaceData = async (workspaceIds: Array<string>) => {
  const supabase = await supabaseServerClient();

  const { data, error } = await supabase
    .from("workspaces")
    .select("*")
    .in("id", workspaceIds);

  return [data, error];
};

export const getCurrentWorkspaceData = async (workspaceId: string) => {
  const supabase = await supabaseServerClient();

  const { data, error } = await supabase
    .from("workspaces")
    .select("*")
    .eq("id", workspaceId)
    .single();

  return [data, error];
};

export const workspaceInvite = async (inviteCode: string) => {
  const supabase = await supabaseServerClient();
  const userData = await getUserData();

  if (!userData) {
    console.log("User is not authenticated");
    return;
  }

  const { data, error } = await supabase
    .from("workspaces")
    .select("*")
    .eq("invite_code", inviteCode)
    .single();

  if (error || !data) {
    console.log("Error fetching workspace invite", error);
    return error;
  }

  const isUserMember = data.members.includes(userData?.id);

  if (isUserMember) {
    console.log("User is already a member of this workspace");
    return error;
  }

  if (data.super_admin === userData?.id) {
    console.log("User is already a super admin of this workspace");
    return error;
  }

  await addMemberToWorkspace(userData.id, data.id);
  await updateUserWorkspace(userData.id, data.id);
};
