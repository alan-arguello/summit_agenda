"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type AsciiPortraitProps = {
  src: string;
  name: string;
  position?: string;
  fit?: "cover" | "contain";
  preload?: boolean;
};

const GLYPHS = " .,:;i+xX#@";

export default function AsciiPortrait({
  src,
  name,
  position = "center 35%",
  fit = "cover",
  preload = false,
}: AsciiPortraitProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);

  useEffect(() => {
    const photo = imageRef.current;
    const canvas = canvasRef.current;
    if (!photo || !canvas) return;

    let visible = false;
    let frame = 0;

    const draw = () => {
      if (!visible || !photo.complete || !photo.naturalWidth) return;
      const width = photo.clientWidth;
      const height = photo.clientHeight;
      if (!width || !height) return;

      try {
        const context = canvas.getContext("2d");
        const sample = document.createElement("canvas");
        const sampleContext = sample.getContext("2d", { willReadFrequently: true });
        if (!context || !sampleContext) return;

        const columns = 38;
        const rows = Math.round((height / width) * columns / 1.3);
        sample.width = columns;
        sample.height = rows;

        // Use the same crop as the original, including contain portraits.
        const scale = fit === "contain"
          ? Math.min(width / photo.naturalWidth, height / photo.naturalHeight)
          : Math.max(width / photo.naturalWidth, height / photo.naturalHeight);
        const drawnWidth = photo.naturalWidth * scale;
        const drawnHeight = photo.naturalHeight * scale;
        const offsets = getComputedStyle(photo).objectPosition.split(" ");
        const offsetX = (width - drawnWidth) * (parseFloat(offsets[0]) / 100 || 0);
        const offsetY = (height - drawnHeight) * (parseFloat(offsets[1]) / 100 || 0);

        sampleContext.fillStyle = "#dce3d8";
        sampleContext.fillRect(0, 0, columns, rows);
        sampleContext.drawImage(photo,
          offsetX * columns / width, offsetY * rows / height,
          drawnWidth * columns / width, drawnHeight * rows / height);
        const pixels = sampleContext.getImageData(0, 0, columns, rows).data;

        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(width * ratio);
        canvas.height = Math.round(height * ratio);
        context.scale(ratio, ratio);
        context.fillStyle = "#0b3027";
        context.fillRect(0, 0, width, height);

        // A faint photographic layer keeps small faces recognizable.
        context.save();
        context.globalAlpha = 0.22;
        context.filter = "grayscale(1)";
        context.drawImage(photo, offsetX, offsetY, drawnWidth, drawnHeight);
        context.restore();

        const cellWidth = width / columns;
        const cellHeight = height / rows;
        context.font = `500 ${cellWidth * 1.7}px monospace`;
        context.textAlign = "center";
        context.textBaseline = "middle";

        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < columns; x++) {
            const i = (y * columns + x) * 4;
            const luminance = (pixels[i] * 0.2126 + pixels[i + 1] * 0.7152 + pixels[i + 2] * 0.0722) / 255;
            const tone = Math.pow(Math.max(0, Math.min(1, (luminance - 0.04) * 1.12)), 0.8);
            const glyph = GLYPHS[Math.round(tone * (GLYPHS.length - 1))];
            context.fillStyle = `rgba(242,238,223,${0.4 + tone * 0.6})`;
            context.fillText(glyph, (x + 0.5) * cellWidth, (y + 0.5) * cellHeight);
          }
        }
        setReady(true);
      } catch {
        // Keep the original photo visible if the canvas cannot be rendered.
        setReady(false);
      }
    };

    const scheduleDraw = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(draw);
    };
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) scheduleDraw();
    }, { rootMargin: "200px" });
    const resizeObserver = new ResizeObserver(scheduleDraw);
    visibilityObserver.observe(photo);
    resizeObserver.observe(photo);
    photo.addEventListener("load", scheduleDraw);

    return () => {
      cancelAnimationFrame(frame);
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      photo.removeEventListener("load", scheduleDraw);
    };
  }, [src, position, fit]);

  return (
    <button
      type="button"
      className="portrait-frame portrait-toggle"
      aria-label={`Foto original de ${name}`}
      aria-pressed={showPhoto}
      title="Alternar foto original y ASCII"
      disabled={!ready}
      data-ascii-ready={ready}
      data-show-photo={showPhoto}
      onClick={() => setShowPhoto((shown) => !shown)}
    >
      <Image
        ref={imageRef}
        src={src}
        alt={name}
        fill
        sizes="(max-width: 420px) 88px, 104px"
        preload={preload}
        style={{ objectPosition: position, objectFit: fit }}
      />
      <canvas ref={canvasRef} className="portrait-ascii" aria-hidden="true" />
    </button>
  );
}
