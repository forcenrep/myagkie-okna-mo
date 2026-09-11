import type { ImgHTMLAttributes } from 'react';
import manifest from '../image-manifest.json';

const entries = manifest as Record<string, { width: number; height: number; variants: { width: number; src: string }[] }>;
export function SiteImage({ src = '', sizes = '(max-width: 700px) 100vw, 50vw', loading = 'lazy', ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const image = entries[src];
  return <img {...props} src={image?.variants.at(-1)?.src ?? src} srcSet={image?.variants.map(v => `${v.src} ${v.width}w`).join(', ')} sizes={sizes} width={image?.width} height={image?.height} loading={loading} decoding="async" />;
}
