export async function uploadToCloudinary(file: File): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName) throw new Error('Missing NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME');
  if (!uploadPreset)
    throw new Error('Missing NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET');

  const form = new FormData();
  form.append('file', file);
  form.append('upload_preset', uploadPreset);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
    {
      method: 'POST',
      body: form,
    }
  );

  const json = (await res.json()) as {
    secure_url?: string;
    error?: { message?: string };
  };

  if (!res.ok) {
    throw new Error(json?.error?.message ?? 'Cloudinary upload failed');
  }
  if (!json.secure_url) {
    throw new Error('Cloudinary did not return secure_url');
  }

  return json.secure_url;
}
