# factory-scratch

Scratch adopter for Factory 0.6. Nothing here matters; it exists so Factory's worker, Action and dispatcher can be proven on a repository that is not Factory and not Clockgrove. Recreate it freely.

## API

- `greet(name)` (`src/greet.mjs`): returns `Hello, <name>.` with the name trimmed, or `Hello.` when the name is empty or missing.
- `farewell(name)` (`src/farewell.mjs`): returns `Goodbye, <name>.` with the name trimmed, or `Goodbye.` when the name is empty or missing.
