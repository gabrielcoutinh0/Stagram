export function resizeImage(
  file: File,
  maxWidth: number,
  maxHeight: number
): Promise<Blob> {
  return new Promise((resolve: any, reject) => {
    let image = new Image();
    image.src = URL.createObjectURL(file);
    image.onload = () => {
      let width = image.width;
      let height = image.height;

      if (width <= maxWidth && height <= maxHeight) {
        resolve(file);
      }

      let newWidth;
      let newHeight;

      if (width > height) {
        newHeight = height * (maxWidth / width);
        newWidth = maxWidth;
      } else {
        newWidth = width * (maxHeight / height);
        newHeight = maxHeight;
      }

      let canvas = document.createElement("canvas");
      canvas.width = newWidth;
      canvas.height = newHeight;

      let context = canvas.getContext("2d");

      context?.drawImage(image, 0, 0, newWidth, newHeight);

      canvas.toBlob(
        (blob) => {
          resolve(
            new File([blob as Blob], "cropImage.jpg", { type: "image/jpg" })
          );
        },
        "image/jpg",
        0.8
      );
    };
    image.onerror = reject;
  });
}
