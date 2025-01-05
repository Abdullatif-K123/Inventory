import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';

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

    // If needed, upload the file to external storage here
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
