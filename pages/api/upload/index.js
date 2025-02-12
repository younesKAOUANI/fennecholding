import { uploadFile } from "@/ftp/ftpService";
import formidable from "formidable";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const form = formidable({
      keepExtensions: true,
      multiples: false,
    });

    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    if (!file) throw new Error("No file uploaded");

    // Upload to FTP server
    const { fileUrl } = await uploadFile(file);
    
    return res.status(200).json({ success: true, fileUrl });

  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ error: error.message });
  }
}