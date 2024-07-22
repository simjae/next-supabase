import { NextRequest, NextResponse } from "next/server";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";
import { promisify } from "util";
import stream from "stream";

const pipeline = promisify(stream.pipeline);

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

// Convert multer middleware to a promise
const runMiddleware = (req: any, res: any, fn: any) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

export async function POST(req: NextRequest) {
  const form = new Promise((resolve, reject) => {
    const multerMiddleware = upload.single("file");
    const mockReq: any = req; // Create a mock request object
    const mockRes: any = {
      setHeader: () => {},
      end: () => {},
    };

    runMiddleware(mockReq, mockRes, multerMiddleware)
      .then(() => resolve(mockReq))
      .catch((error) => reject(error));
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
