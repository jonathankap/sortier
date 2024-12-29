import { expect, it } from "@jest/globals";
import { parseArgs } from "./args-parser.js";

it.each<{
  args: string[];
  expectedCheck: boolean;
  expectedFilePatterns: string[];
  expectedIgnoreUnknown: boolean;
}>`
  testName                                                        | args                                                           | expectedFilePatterns                       | expectedIgnoreUnknown | expectedCheck
  ${"parses a single file pattern"}                               | ${["*sortier*"]}                                               | ${["*sortier*"]}                           | ${false}              | ${false}
  ${"parses multiple file pattern"}                               | ${["*sortier*", "*prettier*", "*eslint*"]}                     | ${["*sortier*", "*prettier*", "*eslint*"]} | ${false}              | ${false}
  ${"parses a single file pattern with ignore unknown at front"}  | ${["--ignore-unknown", "*sortier*"]}                           | ${["*sortier*"]}                           | ${true}               | ${false}
  ${"parses multiple file pattern with ignore unknown at front"}  | ${["--ignore-unknown", "*sortier*", "*prettier*", "*eslint*"]} | ${["*sortier*", "*prettier*", "*eslint*"]} | ${true}               | ${false}
  ${"parses a single file pattern with ignore unknown at back"}   | ${["*sortier*", "--ignore-unknown"]}                           | ${["*sortier*"]}                           | ${true}               | ${false}
  ${"parses multiple file pattern with ignore unknown at back"}   | ${["*sortier*", "*prettier*", "*eslint*", "--ignore-unknown"]} | ${["*sortier*", "*prettier*", "*eslint*"]} | ${true}               | ${false}
  ${"parses multiple file pattern with ignore unknown at middle"} | ${["*sortier*", "--ignore-unknown", "*prettier*", "*eslint*"]} | ${["*sortier*", "*prettier*", "*eslint*"]} | ${true}               | ${false}
  ${"parses check option at front"}                               | ${["--check", "*sortier*"]}                                    | ${["*sortier*"]}                           | ${false}              | ${true}
  ${"parses check option at back"}                                | ${["*sortier*", "--check"]}                                    | ${["*sortier*"]}                           | ${false}              | ${true}
  ${"parses check with ignore unknown"}                           | ${["--check", "--ignore-unknown", "*sortier*"]}                | ${["*sortier*"]}                           | ${true}               | ${true}
`(`$testName`, ({ args, expectedCheck, expectedFilePatterns, expectedIgnoreUnknown }) => {
  const { check, filepatterns, ignoreUnknown } = parseArgs(args);

  expect(filepatterns).toEqual(expectedFilePatterns);
  expect(ignoreUnknown).toEqual(expectedIgnoreUnknown);
  expect(check).toEqual(expectedCheck);
});
