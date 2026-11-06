# factory-scratch

A throwaway repository the Factory 0.6 gates run against: a tiny greeting library (`src/greet.mjs` and friends) and a Postgres-backed notes CLI (`src/cli.mjs`). Plain Node 22 ES modules; the only dependency is `pg`.

- Validation: `npm run check`, `npm test`, then `npm run test:db`. All three must pass before a PR is opened. `test:db` needs `DATABASE_URL`, which `scripts/ci/setup.sh` exports (PostgreSQL with pgvector, role and database `factory`).
- Tests live in `test/*.test.mjs` (no database) and `test/db/*.db.test.mjs` (a fresh schema per file through `test/db/helpers.mjs`; files run in parallel, and pgvector lives in `public`), use `node:test`, one test per behaviour, exact values. Assert that a discovered list contains what a test needs, never the exact list, so features added in parallel never edit each other's tests.
- Source lives in `src/`. Keep functions small and documented with one sentence.

## Extension points of the notes CLI

Add capability by adding a file; never edit the discovery modules or another feature's files.

- A command is `src/commands/<name>.mjs` exporting `run(client, args)`; it is reached as `notes <name>` and parses `args` with `node:util` `parseArgs`. Errors carry a `code`.
- An export format is `src/export/<name>.mjs` exporting `format(rows)`; `notes list --format <name>` picks it by file name.
- A rule is `src/rules/<name>.mjs` exporting `code` and `check(note)`, which returns a problem string or null; every rule runs on `notes add`.
- A schema change is a new file `migrations/<YYYYMMDDHHMM>_<name>.sql`, applied in lexical order once; never edit an existing migration.
- The store functions live in `src/notes.mjs`; add a function there only when no command can do the work with the existing ones.

Do not edit `README.md`, `package.json` or the discovery modules (`src/commands.mjs`, `src/export.mjs`, `src/rules.mjs`, `src/db.mjs`) in an Objective: parallel Objectives would conflict.
