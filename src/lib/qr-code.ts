import QRCode from "qrcode";

export const generateQRCode = (content: string) =>
  QRCode.toDataURL(content, {
    type: "image/jpeg",
    rendererOpts: { quality: 1 },
  });
