# factory-scratch

A throwaway repository the Factory 0.6 gates run against. Plain Node 22 ES modules, no dependencies.

- Validation: `npm run check`, then `npm test`. Both must pass before a PR is opened.
- Tests live in `test/*.test.mjs` and use `node:test`; one test per behaviour, asserting exact values.
- Source lives in `src/`. Keep functions small and documented with one sentence.
