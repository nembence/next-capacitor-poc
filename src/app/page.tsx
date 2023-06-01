"use client";
import { Camera, CameraResultType } from "@capacitor/camera";

export default function Home() {
  const getImage = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
    });

    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    const imageUrl = image.webPath;

    return imageUrl;
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={getImage}>Select image</button>
    </main>
  );
}
