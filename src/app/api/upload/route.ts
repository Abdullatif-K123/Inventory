import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';
import fs from 'fs';

// Set path for your SQLite file (local storage location in your project)
const originalDbPath = join(process.cwd(), 'prisma', 'database.db');  // Adjust this path if your SQLite file is located elsewhere

// Set path for /tmp directory where Vercel allows write access
const tempDbPath = '/tmp/database.db';

// Copy the database to /tmp if it doesn't already exist there
if (!fs.existsSync(tempDbPath)) {
  fs.copyFileSync(originalDbPath, tempDbPath);
  console.log('Database copied to /tmp');
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file uploaded' });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Use `/tmp` for the temporary writable directory
    const tempPath = join('/tmp', file.name);
    await writeFile(tempPath, buffer);
    console.log(`File saved temporarily at: ${tempPath}`);

    // If needed, upload the file to external storage here (e.g., S3, Google Cloud Storage)
    // For example: uploadToS3(tempPath);

    return NextResponse.json({ 
      success: true, 
      message: 'File saved temporarily', 
      tempPath 
    });
  } catch (error) {
    console.error('Error handling file upload:', error);
    return NextResponse.json({ success: false, message: 'File upload failed', error });
  }
}
