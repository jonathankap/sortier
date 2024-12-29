# Running

Sortier can be run through either the API or a CLI

## CLI

Sortier by default will write all files in place. To do so run:

```bash
sortier "[glob syntax]"
```

Don't forget the quotes around the globs! The quotes make sure that Prettier expands the globs rather than your shell, for cross-platform usage. The glob syntax from the glob module is used.

When the CLI is executed, it will use cosmiconfig to load a configuration file for sortier or, if one is not found, run with the default settings.

### CLI flags

#### `--ignore-unknown`

By default if sortier runs into a file it doesn't have a parser for, the program will:

1.  Print a message like `.vscodeignore - No parser could be inferred - 2ms`
1.  Return an exit code of 1 With this flag enabled: 1. The message no longer is printed
1.  Return an exit code of 0 if no other errors occur

#### `--check`

Check if any files have changed without making changes. Returns 0 if no changes are needed, 1 if changes are needed, or 2 if there is an error.

## API

Sortier also has an API you can run via code:

```typescript
import { formatText } from "sortier/format-text";

formatText("json", `{ "b": "2", "c": "3", "a": "1"}`, { logLevel: "diagnostic" });
```

The first argument is the file you wish to format. The second argument is a JSON object of options of which more details can be found in later sections.
