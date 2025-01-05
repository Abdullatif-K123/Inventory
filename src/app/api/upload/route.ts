import { writeFile } from 'fs/promises';  // Importing writeFile to write the file
import { NextRequest, NextResponse } from 'next/server';  // Next.js Request and Response
import { join } from 'path';  // Importing path to join paths dynamically

// Handle POST request for file upload
export async function POST(request: NextRequest) {
  try {
    // Get the form data
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    // If no file is uploaded, return an error
    if (!file) {
      return NextResponse.json({ success: false, message: 'No file uploaded' });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Use `/tmp` directory to store files in Vercel
    const tempPath = join('/tmp', file.name);  // Save file in the temporary directory

    // Write the file to `/tmp` directory
    await writeFile(tempPath, buffer);
    console.log(`File uploaded and saved at: ${tempPath}`);

    // Respond with the success message and file path
    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      tempPath,  // Return the path of the uploaded file in `/tmp`
    });
  } catch (error) {
    console.error('Error handling file upload:', error);
    return NextResponse.json({ success: false, message: 'File upload failed', error });
  }
}
