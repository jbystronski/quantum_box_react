import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import externals from "rollup-plugin-node-externals";
import babel from "@rollup/plugin-babel";
import replace from "rollup-plugin-replace";
import dts from "rollup-plugin-dts";
import del from "rollup-plugin-delete";
import { terser } from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";
const packageJson = require("./package.json");
const dev = process.env.NODE_ENV === "development";
const extensions = [".ts", ".tsx", ".js", ".jsx"];

export default [
  {
    input: "src/main.ts",
    output: [
      {
        file: packageJson.module,
        format: "es",
        sourcemap: dev,

        exports: "named",
      },
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: dev,
      },
    ],
    plugins: [
      externals(),
      replace({
        "process.env.NODE_ENV": JSON.stringify("production"),
      }),
      resolve({ extensions }),
      commonjs({
        include: "node_modules/**",
      }),
      typescript({ tsconfig: "./tsconfig.json" }),
      babel({
        extensions,
        exclude: /^(.+\/)?node_modules\/.+$/,
        babelrc: false,
        babelHelpers: "runtime",
        presets: [
          "@babel/preset-env",
          "@babel/preset-react",
          "@babel/preset-typescript",
        ],
        babelHelpers: "runtime",
        plugins: [
          "@babel/plugin-transform-runtime",
          "@babel/plugin-syntax-dynamic-import",
        ],
      }),
      terser(),
    ],
  },
  {
    input: "dist/dts/main.d.ts",
    output: [{ file: packageJson.types, format: "esm" }],
    plugins: [
      dts(),
      del({
        hook: "buildEnd",
        targets: "dist/dts",
      }),
    ],
  },
];
