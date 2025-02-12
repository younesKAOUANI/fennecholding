// pages/api/delete-file.js
import { deleteFile } from "@/ftp/ftpService";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    res.setHeader("Allow", ["DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  try {
    const { fileUrl } = req.body;
    if (!fileUrl) {
      return res.status(400).json({ error: "fileUrl is required" });
    }
    await deleteFile(fileUrl);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).json({ 
      error: "Failed to delete file", 
      details: error.message 
    });
  }
}
