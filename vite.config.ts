import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import packageJson from "./package.json";

export default defineConfig({
  plugins: [react()],
  define: {
    "import.meta.env.PACKAGE_VERSION": JSON.stringify(packageJson.version),
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
    ],
  },
});
