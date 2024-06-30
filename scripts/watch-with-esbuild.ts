import esbuild from "esbuild";
import config from "./esbuild.config";

try {
  const context = await esbuild.context(config);
  await context.watch();
} catch (e) {
  process.exit(1);
}
