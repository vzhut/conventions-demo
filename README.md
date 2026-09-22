# conventions-demo

A small TypeScript service used as a scan target for
[DevDigest](https://github.com/vzhut/dev-digest)'s **Conventions Extractor**
(L02 homework, `specs/conventions-extractor.md`).

It intentionally repeats a few checkable conventions across `src/`:

- Every failure is a typed `AppError` (`src/errors.ts`), never a bare `Error`
  or a swallowed `undefined`.
- All output goes through `logger` (`src/utils/logger.ts`) — `no-console`
  is enforced by `.eslintrc.json`.
- Relative ESM imports carry the `.js` extension (NodeNext module
  resolution, `tsconfig.json`).
- `camelCase` for variables/functions, `PascalCase` for types — enforced by
  `.eslintrc.json`'s `camelcase` rule.

Nothing here runs in production; it exists to give the extractor real
evidence to cite.
