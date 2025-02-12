// ftpService.js
import { Client } from "basic-ftp";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

export async function uploadFile(file) {
  const client = new Client();
  client.ftp.verbose = true;
  try {
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      secure: process.env.FTP_SECURE === "explicit",
      port: parseInt(process.env.FTP_PORT, 10),
    });
    const filename = `${Date.now()}-${file.originalFilename}`;
    const remotePath = `${process.env.FTP_UPLOADPATH}/${filename}`.replace(/\/+/g, '/');
    await client.ensureDir(process.env.FTP_UPLOADPATH.replace(/^\/+|\/+$/g, ''));
    const stream = fs.createReadStream(file.filepath);
    await client.uploadFrom(stream, remotePath);
    return { fileUrl: `${process.env.FTP_BASEURL}/${filename}` };
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  } finally {
    client.close();
  }
}

export async function deleteFile(fileUrl) {
  const client = new Client();
  client.ftp.verbose = true;
  try {
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      secure: process.env.FTP_SECURE === "explicit",
      port: parseInt(process.env.FTP_PORT, 10),
    });
    // Assume fileUrl is structured as FTP_BASEURL/filename
    const filename = fileUrl.split('/').pop();
    const remotePath = `${process.env.FTP_UPLOADPATH}/${filename}`.replace(/\/+/g, '/');
    await client.remove(remotePath);
    return true;
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  } finally {
    client.close();
  }
}
