// pages/api/delete-file.js
import { deleteFile } from "@/ftp/ftpService";

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Optional, if cookies are needed
  
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
