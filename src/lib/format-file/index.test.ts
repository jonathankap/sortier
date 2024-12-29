import { describe, it, expect, beforeEach, afterEach } from "@jest/globals";

// The methods being tested here
import { formatFile } from "./index.js";

// Utilities
import { join } from "path";
import { mkdir, rm } from "fs/promises";
import { FileUtils } from "../../utilities/file-utils.js";
import { getFolderPathFromFileUrl } from "../../utilities/test-utils.js";

const currentFolderPath = getFolderPathFromFileUrl(import.meta.url);

describe("reprinter", () => {
  it("Does not rewrite sortier ignored files", () => {
    const inputFilePath = join(currentFolderPath, "test_assets/sortierignore.input.ts");
    const input = FileUtils.readFileContents(inputFilePath);
    const output = FileUtils.readFileContents(join(currentFolderPath, "test_assets/sortierignore.output.ts.txt"));
    // If this expect is hit, then the test files were tampered with before we got here
    expect(input).toEqual(output);

    expect(() => formatFile(inputFilePath, false, {})).toThrow();
    const newInput = FileUtils.readFileContents(inputFilePath);
    expect(newInput).toEqual(output);
  });

  it("Does throw error for unsupported files", () => {
    const inputFilePath = join(currentFolderPath, "../../readme.md");
    expect(() => {
      formatFile(inputFilePath, false, {});
    }).toThrow();
  });

  describe("check option", () => {
    const testFilePath = join(currentFolderPath, "testing/check_option.input.ts");

    beforeEach(async () => {
      // Ensure the test directory exists
      const testDir = join(currentFolderPath, "testing");
      try {
        await mkdir(testDir, { recursive: true });
      } catch (error) {
        // Ignore if directory already exists
      }
    });

    afterEach(async () => {
      // Clean up test file
      try {
        await rm(testFilePath, { force: true });
      } catch (error) {
        // Ignore if file doesn't exist
      }
    });

    it("Does not write file when check is true", () => {
      const originalInput = `import { b } from "b";
import { a } from "a";`;
      FileUtils.writeFileContents(testFilePath, originalInput);

      const hasChanges = formatFile(testFilePath, true, {});

      // File should not be modified
      const fileContents = FileUtils.readFileContents(testFilePath);
      expect(fileContents).toBe(originalInput);
      // But should indicate changes were needed
      expect(hasChanges).toBe(true);
    });

    it("Writes file when check is false", () => {
      const originalInput = `import { b } from "b";
import { a } from "a";`;
      FileUtils.writeFileContents(testFilePath, originalInput);

      const hasChanges = formatFile(testFilePath, false, {});

      // File should be modified
      const fileContents = FileUtils.readFileContents(testFilePath);
      expect(fileContents).toBe(`import { a } from "a";
import { b } from "b";`);
      // And should indicate changes were made
      expect(hasChanges).toBe(true);
    });

    it("Returns false when no changes needed", () => {
      const properlyFormattedInput = `import { a } from "a";
import { b } from "b";`;
      FileUtils.writeFileContents(testFilePath, properlyFormattedInput);

      const hasChanges = formatFile(testFilePath, true, {});

      // File should not be modified
      const fileContents = FileUtils.readFileContents(testFilePath);
      expect(fileContents).toBe(properlyFormattedInput);
      // And should indicate no changes were needed
      expect(hasChanges).toBe(false);
    });
  });
});
