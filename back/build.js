import { build } from "esbuild";
import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'prod') {
  dotenv.config({ path: '.env.prod' });
} else {
  dotenv.config({ path: '.env.dev' });
}
// Replace './src/server.js' with the entry point to your application
build({
  entryPoints: ["./server.mjs"],
  bundle: true,
  platform: "node",
  target: "node20", // Adjust this to your Node.js version
  packages: "external",
  outfile: "./dist/server.js",
  define: {
    'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`,
  },
  format: "esm", // Set the output format to "esm"
}).catch(() => process.exit(1));
