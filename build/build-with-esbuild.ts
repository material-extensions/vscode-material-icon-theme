import esbuild from "esbuild";
import config from "./esbuild.config";

esbuild.build(config).catch(() => process.exit(1));
