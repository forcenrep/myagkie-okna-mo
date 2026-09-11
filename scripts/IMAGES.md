# Responsive images

Both npm run dev and npm run build run images.mjs first.
Original local images stay in public; remote project photos are discovered in
src/data.ts and downloaded once into .image-cache. The build generates WebP
variants up to 1920px (never upscaling), plus src/image-manifest.json.
Use SiteImage with an accurate sizes attribute. Images are lazy by default;
only the hero uses eager loading and high fetch priority.

Generated image names include a content/recipe hash. Vercel caches these URLs
for a year; changing a source creates new URLs. To change encoder settings,
also change the recipe suffix in images.mjs. Generated files are reproducible.
Remote sources must be reachable on a clean build.

Material/hardware descriptions remain visible without interactions. Photo
buttons open a native modal dialog with keyboard focus trapping and Escape
support. The original full framing is shown in the dialog.
