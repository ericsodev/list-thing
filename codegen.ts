import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "./src/graphql/schema.js",
  documents: "src/**/*.{tsx,ts}",
  generates: {
    "src/graphql/types/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
