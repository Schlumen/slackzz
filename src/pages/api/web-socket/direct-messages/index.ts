import { getUserDataPages } from "@/actions/get-user-data";
import supabaseServerClientPages from "@/lib/supabase/supabaseServerPage";
import { SocketIoApiResponse } from "@/types/app";
import { NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: SocketIoApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const userData = await getUserDataPages(req, res);

    if (!userData) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { recipientId } = req.query;

    if (!recipientId) {
      return res.status(400).json({ error: "Bad Request" });
    }

    const { content, file_url } = req.body;

    const supabase = supabaseServerClientPages(req, res);

    const { data, error: sendingMessageError } = await supabase
      .from("direct_messages")
      .insert({
        content,
        file_url,
        user: userData.id,
        user_one: userData.id,
        user_two: recipientId,
      })
      .select("*, user (*), user_one (*), user_two (*)")
      .order("created_at", { ascending: true })
      .single();

    if (sendingMessageError) {
      console.log("SENDING MESSAGE ERROR", sendingMessageError);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    res.socket.server.io.emit("direct-message:post", data);

    return res.status(200).json({ message: "Message sent" });
  } catch (error) {
    console.log("SENDING MESSAGE ERROR", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
