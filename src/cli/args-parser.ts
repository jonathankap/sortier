export type Context = {
  filepatterns: string[];
  ignoreUnknown: boolean;
  check: boolean;
};

export function parseArgs(args: string[]): Context {
  return {
    filepatterns: args.filter((value) => !value.startsWith("--")),
    ignoreUnknown: args.includes("--ignore-unknown"),
    check: args.includes("--check"),
  };
}
