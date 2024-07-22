import { NextRequest, NextResponse } from "next/server";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";

// Ensure the uploads directory exists
const uploadsDir = path.join(process.cwd(), "public/uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

export async function POST(req: NextRequest) {
  const form = new Promise((resolve, reject) => {
    const multerMiddleware = upload.single("file");
    multerMiddleware(req, {} as any, (error: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(req);
      }
    });
  });

  try {
    await form;
    const fileUrl = `/uploads/${(req as any).file.filename}`;
    return NextResponse.json({ url: fileUrl });
  } catch (error) {
    return NextResponse.json(
      { message: "File upload failed", error },
      { status: 500 }
    );
  }
}
