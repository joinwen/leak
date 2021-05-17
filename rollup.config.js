import pkg from "./package.json";
import babel from "@rollup/plugin-babel";
export default [
  {
    input: "src/index.js",
    output: [
      {
        name: "leak",
        file: pkg.browser,
        format: "umd",
      },
      {
        file: pkg.main,
        format: "cjs",
      },
    ],
    plugins: [
      babel({
        babelHelpers: "runtime",
        include: /src/,
        exclude: /node_modules/
      })
    ]
  },
  {
    input: "src/index.js",
    output:
      {
        file: pkg.module,
        format: "esm"
      }
  }
];
