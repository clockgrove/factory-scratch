# factory-scratch

Scratch adopter for Factory 0.6. Nothing here matters; it exists so Factory's worker, Action and dispatcher can be proven on a repository that is not Factory and not Clockgrove. Recreate it freely.

## API

- `greet(name)` (`src/greet.mjs`): returns `Hello, <name>.` with the name trimmed, or `Hello.` when the name is empty or missing.
- `farewell(name)` (`src/farewell.mjs`): returns `Goodbye, <name>.` with the name trimmed, or `Goodbye.` when the name is empty or missing.
- `shout(name)` (`src/shout.mjs`): returns `greet(name)` in upper case, e.g. `HELLO, ADA.`, or `HELLO.` when the name is empty or missing.
- `whisper(name)` (`src/whisper.mjs`): returns `greet(name)` in lower case, e.g. `hello, ada.`, or `hello.` when the name is empty or missing.
- `greetings(name)` (`src/greetings.mjs`): returns `[greet(name), shout(name), whisper(name)]`, e.g. `["Hello, Ada.", "HELLO, ADA.", "hello, ada."]`, or `["Hello.", "HELLO.", "hello."]` when the name is empty or missing.
- `wordCount(name)` (`src/word-count.mjs`): returns the number of whitespace-separated words in `greet(name)`, with punctuation staying attached, e.g. `2` for `Ada` (`Hello, Ada.`), or `1` when the name is empty or missing.
- `initials(name)` (`src/initials.mjs`): returns the first letter of each whitespace-separated word in `greet(name)`, upper-cased and joined; digits and punctuation never contribute, and a word without letters is skipped, e.g. `HA` for `Ada`, or `H` when the name is empty or missing.
- `reverse(name)` (`src/reverse.mjs`): returns `greet(name)` with its Unicode code points in reverse order (so astral symbols such as emoji stay intact), e.g. `.adA ,olleH` for `Ada`, or `.olleH` when the name is empty or missing.
- `length(name)` (`src/length.mjs`): returns the number of characters in `greet(name)`, counted as JavaScript string length (UTF-16 code units), e.g. `11` for `Ada` (`Hello, Ada.`), or `6` when the name is empty or missing.
- `letters(name)` (`src/letters.mjs`): returns `greet(name)` split into an array of single characters (Unicode code points), e.g. `["H","e","l","l","o",","," ","A","d","a","."]` for `Ada`, or `["H","e","l","l","o","."]` when the name is empty or missing.
- `lower(name)` (`src/lower.mjs`): returns `greet(name)` in lower case with the trailing period replaced by an exclamation mark, e.g. `hello, ada!` for `Ada`, or `hello!` when the name is empty or missing.
- `upper(name)` (`src/upper.mjs`): returns `greet(name)` in upper case with a trailing `!` instead of the period, e.g. `HELLO, ADA!`, or `HELLO!` when the name is empty or missing.
