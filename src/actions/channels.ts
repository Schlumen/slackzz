"use server";

import { supabaseServerClient } from "@/lib/supabase/server";
import { getUserData } from "./get-user-data";

export const createChannel = async ({
  name,
  workspaceId,
  userId,
}: {
  name: string;
  workspaceId: string;
  userId: string;
}) => {
  const supabase = await supabaseServerClient();
  const userData = await getUserData();

  if (!userData) {
    return { error: "User not found" };
  }

  const { data: channelRecord, error } = await supabase
    .from("channels")
    .insert({
      name,
      user_id: userId,
      workspace_id: workspaceId,
    })
    .select("*");

  if (error) {
    return { error: "Insert error" };
  }

  // Update channel members array

  const [, updateChannelMembersError] = await updateChannelMembers(
    channelRecord[0].id,
    userData.id
  );

  if (updateChannelMembersError) {
    return { error: "Update channel members error" };
  }

  // Add channel to user's channels array

  const [, addChannelToUserError] = await addChannelToUser(
    userData.id,
    channelRecord[0].id
  );

  if (addChannelToUserError) {
    return { error: "Add channel to user error" };
  }

  // Add channel to workspace

  const [, updateWorkspaceError] = await updateWorkspaceChannel(
    channelRecord[0].id,
    workspaceId
  );

  if (updateWorkspaceError) {
    return { error: "Update workspace error" };
  }
};

const addChannelToUser = async (userId: string, channelId: string) => {
  const supabase = await supabaseServerClient();

  const { data: addChannelData, error: addChannelError } = await supabase.rpc(
    "update_user_channels",
    {
      user_id: userId,
      channel_id: channelId,
    }
  );

  return [addChannelData, addChannelError];
};

const updateChannelMembers = async (channelId: string, userId: string) => {
  const supabase = await supabaseServerClient();

  const { data: updateChannelData, error: updateChannelError } =
    await supabase.rpc("update_channel_members", {
      channel_id: channelId,
      new_member: userId,
    });

  return [updateChannelData, updateChannelError];
};

const updateWorkspaceChannel = async (
  channelId: string,
  workspaceId: string
) => {
  const supabase = await supabaseServerClient();

  const { data: updateWorkspaceData, error: updateWorkspaceError } =
    await supabase.rpc("add_channel_to_workspace", {
      channel_id: channelId,
      workspace_id: workspaceId,
    });

  return [updateWorkspaceData, updateWorkspaceError];
};
