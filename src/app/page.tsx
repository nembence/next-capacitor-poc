"use client";
import { Camera, CameraResultType } from "@capacitor/camera";
import Image from "next/image";
import { useState } from "react";
import { BiometryType, NativeBiometric } from "capacitor-native-biometric";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

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

    setSelectedImage(imageUrl ?? "");
  };

  const authenticateBiometric = async () => {
    const result = await NativeBiometric.isAvailable();

    if (!result.isAvailable) return;

    const isFaceID = result.biometryType == BiometryType.FACE_ID;
    console.log(isFaceID);

    await NativeBiometric.verifyIdentity({
      reason: "For easy log in",
      title: "Log in",
    })
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false));
  };

  return (
    <main className="flex min-h-screen flex-col items-center n p-24">
      <button onClick={getImage}>Select images</button>
      <Image
        width={300}
        height={400}
        className="mt-10"
        src={selectedImage}
        alt="selected-image"
      />
      <button className="mt-10" onClick={authenticateBiometric}>
        Authenticate with FaceID
      </button>
      <div>{isAuthenticated ? "Authenticated" : "Not authenticated yet"}</div>
    </main>
  );
}
