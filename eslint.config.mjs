import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
export default defineConfig([...nextVitals,...nextTs,{rules:{'@typescript-eslint/no-explicit-any':'off','@next/next/no-html-link-for-pages':'off','@typescript-eslint/no-unused-vars':'warn'}},globalIgnores(['.next/**','.next-local/**','prisma/.local/**','node_modules/**','public/**','work/**'])]);
