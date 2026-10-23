// Tailwind only runs on stylesheets that import it: src/app/(frontend)/globals.css.
// The Payload admin route group never imports that file, so the admin stays Tailwind-free.
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}

export default config
