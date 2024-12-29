// Imports - non-mocked dependencies
import { afterEach, describe, expect, it, jest } from "@jest/globals";
import { IgnoredFileError } from "../error/ignored-file-error.js";
import { UnsupportedExtensionError } from "../error/unsupported-extension-error.js";

// Imports - Mocked imports
jest.unstable_mockModule("../lib/format-file/index.js", () => ({
  formatFile: jest.fn(),
}));
enum MockLoggerVerboseOption {
  Quiet = 0,
  Normal = 1,
  Diagnostic = 2,
}
jest.unstable_mockModule("../utilities/log-utils.js", () => {
  return {
    LogUtils: {
      log: jest.fn(),
      setVerbosity: jest.fn(),
    },
    LoggerVerboseOption: MockLoggerVerboseOption,
  };
});
const reprinter = jest.mocked(await import("../lib/format-file/index.js"));
const logUtils = jest.mocked(await import("../utilities/log-utils.js"));

// Imports - File to run tests on
const { run } = await import("./index.js");

function verifyLogMessages(expectedMessages: Parameters<typeof logUtils.LogUtils.log>[]) {
  for (let messageIndex = 0; messageIndex < expectedMessages.length; messageIndex++) {
    const expectedMessage = expectedMessages[messageIndex];
    expect(logUtils.LogUtils.log).toHaveBeenNthCalledWith(messageIndex + 1, ...expectedMessage);
  }
  expect(logUtils.LogUtils.log).toHaveBeenCalledTimes(expectedMessages.length);
}

// TODO: #1320 - Jest does't support mocking of ESM imports
describe("cli", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("Prints message when 0 arguments given", () => {
    const exitCode = run([]);

    verifyLogMessages([[logUtils.LoggerVerboseOption.Normal, expect.stringContaining("Must provide a file pattern")]]);
    expect(exitCode).toBe(1);
  });

  it("Prints message when 0 arguments given with --check", () => {
    const exitCode = run(["--check"]);

    verifyLogMessages([[logUtils.LoggerVerboseOption.Normal, expect.stringContaining("Must provide a file pattern")]]);
    expect(exitCode).toBe(2);
  });

  it("Prints success message on found files", () => {
    const exitCode = run(["./package.json"]);

    expect(reprinter.formatFile).toHaveBeenLastCalledWith("./package.json", false);
    verifyLogMessages([
      [logUtils.LoggerVerboseOption.Normal, expect.stringMatching(/\.\/package\.json - ([0-9]*)ms$/)],
    ]);
    expect(exitCode).toBe(0);
  });

  it("Prints error message when pattern matches 0 files", () => {
    const exitCode = run(["./this-file-doesnt-exist.txt"]);

    expect(reprinter.formatFile).not.toHaveBeenCalled();
    verifyLogMessages([
      [logUtils.LoggerVerboseOption.Normal, expect.stringContaining("No filepaths found for file pattern")],
    ]);
    expect(exitCode).toBe(1);
  });

  it("Prints error message when pattern matches 0 files with --check", () => {
    const exitCode = run(["--check", "./this-file-doesnt-exist.txt"]);

    expect(reprinter.formatFile).not.toHaveBeenCalled();
    verifyLogMessages([
      [logUtils.LoggerVerboseOption.Normal, expect.stringContaining("No filepaths found for file pattern")],
    ]);
    expect(exitCode).toBe(2);
  });

  describe("formatFile throwing errors", () => {
    it("prints message for unknown error", () => {
      reprinter.formatFile.mockImplementationOnce(() => {
        throw new Error("Some error");
      });

      const exitCode = run(["./package.json"]);

      verifyLogMessages([
        [logUtils.LoggerVerboseOption.Normal, expect.stringMatching(/\.\/package\.json - Some error - ([0-9]*)ms$/)],
      ]);
      expect(exitCode).toBe(1);
    });

    it("prints message for unknown error with --check", () => {
      reprinter.formatFile.mockImplementationOnce(() => {
        throw new Error("Some error");
      });

      const exitCode = run(["--check", "./package.json"]);

      verifyLogMessages([
        [logUtils.LoggerVerboseOption.Normal, expect.stringMatching(/\.\/package\.json - Some error - ([0-9]*)ms$/)],
      ]);
      expect(exitCode).toBe(2);
    });

    it("prints message for IgnoredFileError", () => {
      reprinter.formatFile.mockImplementationOnce(() => {
        throw new IgnoredFileError("./package.json");
      });

      const exitCode = run(["./package.json"]);

      verifyLogMessages([
        [
          logUtils.LoggerVerboseOption.Diagnostic,
          expect.stringMatching(/\.\/package\.json - Skipped due to matching ignore pattern - ([0-9]*)ms$/),
        ],
      ]);
      expect(exitCode).toBe(0);
    });

    it("prints message for UnsupportedExtensionError", () => {
      reprinter.formatFile.mockImplementationOnce(() => {
        throw new UnsupportedExtensionError("./package.json");
      });

      const exitCode = run(["./package.json"]);

      verifyLogMessages([
        [
          logUtils.LoggerVerboseOption.Normal,
          expect.stringMatching(/\.\/package\.json - No parser could be inferred - ([0-9]*)ms$/),
        ],
      ]);
      expect(exitCode).toBe(1);
    });

    it("does not print message for UnsupportedExtensionError if --ignore-unknown is passed", () => {
      reprinter.formatFile.mockImplementationOnce(() => {
        throw new UnsupportedExtensionError("./package.json");
      });

      const exitCode = run(["--ignore-unknown", "./package.json"]);

      verifyLogMessages([]);
      expect(exitCode).toBe(0);
    });
  });

  describe("check option with changes", () => {
    it("returns 1 when check is true and changes are needed", () => {
      // Mock formatFile to return true (indicating changes needed)
      reprinter.formatFile.mockReturnValueOnce(true);

      const exitCode = run(["--check", "./package.json"]);

      expect(reprinter.formatFile).toHaveBeenCalledWith("./package.json", true);
      verifyLogMessages([
        [logUtils.LoggerVerboseOption.Normal, expect.stringMatching(/\.\/package\.json - ([0-9]*)ms$/)],
      ]);
      expect(exitCode).toBe(1);
    });

    it("returns 0 when check is true and no changes needed", () => {
      // Mock formatFile to return false (indicating no changes needed)
      reprinter.formatFile.mockReturnValueOnce(false);

      const exitCode = run(["--check", "./package.json"]);

      expect(reprinter.formatFile).toHaveBeenCalledWith("./package.json", true);
      verifyLogMessages([
        [logUtils.LoggerVerboseOption.Normal, expect.stringMatching(/\.\/package\.json - ([0-9]*)ms$/)],
      ]);
      expect(exitCode).toBe(0);
    });

    it("returns 0 when check is true and multiple files need no changes", () => {
      // Mock formatFile to return false for all files
      reprinter.formatFile.mockReturnValue(false);

      const exitCode = run(["--check", "./package.json", "./tsconfig.json"]);

      expect(reprinter.formatFile).toHaveBeenCalledWith("./package.json", true);
      expect(reprinter.formatFile).toHaveBeenCalledWith("./tsconfig.json", true);
      verifyLogMessages([
        [logUtils.LoggerVerboseOption.Normal, expect.stringMatching(/\.\/package\.json - ([0-9]*)ms$/)],
        [logUtils.LoggerVerboseOption.Normal, expect.stringMatching(/\.\/tsconfig\.json - ([0-9]*)ms$/)],
      ]);
      expect(exitCode).toBe(0);
    });

    it("returns 1 when check is true and at least one file needs changes", () => {
      // First file needs no changes, second file needs changes
      reprinter.formatFile
        .mockReturnValueOnce(false) // package.json
        .mockReturnValueOnce(true); // tsconfig.json

      const exitCode = run(["--check", "./package.json", "./tsconfig.json"]);

      expect(reprinter.formatFile).toHaveBeenCalledWith("./package.json", true);
      expect(reprinter.formatFile).toHaveBeenCalledWith("./tsconfig.json", true);
      verifyLogMessages([
        [logUtils.LoggerVerboseOption.Normal, expect.stringMatching(/\.\/package\.json - ([0-9]*)ms$/)],
        [logUtils.LoggerVerboseOption.Normal, expect.stringMatching(/\.\/tsconfig\.json - ([0-9]*)ms$/)],
      ]);
      expect(exitCode).toBe(1);
    });
  });
});
