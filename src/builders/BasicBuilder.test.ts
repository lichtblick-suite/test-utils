// SPDX-FileCopyrightText: Copyright (C) 2023-2025 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)<lichtblick@bmwgroup.com>
// SPDX-License-Identifier: MPL-2.0

import BasicBuilder from "./BasicBuilder";
import { Capitalization } from "../types";

describe("BasicBuilder", () => {
  describe("datetime", () => {
    it("returns a valid ISO datetime string", () => {
      const result = BasicBuilder.datetime();
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{6}Z$/);
    });

    it("uses provided year", () => {
      const result = BasicBuilder.datetime({ year: 2024 });
      expect(result).toMatch(/^2024-/);
    });

    it("uses provided month and pads it", () => {
      const result = BasicBuilder.datetime({ month: "03" });
      expect(result).toMatch(/-03-/);
    });
  });

  describe("date", () => {
    it("returns a Date object", () => {
      const result = BasicBuilder.date();
      expect(result).toBeInstanceOf(Date);
    });

    it("creates valid Date from datetime string", () => {
      const result = BasicBuilder.date({ year: 2024, month: "01", day: "15" });
      expect(result.getFullYear()).toBe(2024);
    });
  });

  describe("boolean", () => {
    it("returns a boolean value", () => {
      const result = BasicBuilder.boolean();
      expect(typeof result).toBe("boolean");
    });

    it("returns both true and false values over multiple calls", () => {
      const results = new Set(Array.from({ length: 20 }, () => BasicBuilder.boolean()));
      expect(results.size).toBe(2);
      expect(results.has(true)).toBe(true);
      expect(results.has(false)).toBe(true);
    });
  });

  describe("number", () => {
    it("returns a number within default range", () => {
      const result = BasicBuilder.number();
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(20);
    });

    it("returns a number within custom range", () => {
      const result = BasicBuilder.number({ min: 5, max: 10 });
      expect(result).toBeGreaterThanOrEqual(5);
      expect(result).toBeLessThanOrEqual(10);
    });

    it("returns an integer", () => {
      const result = BasicBuilder.number();
      expect(Number.isInteger(result)).toBe(true);
    });
  });

  describe("float", () => {
    it("returns a number within default range", () => {
      const result = BasicBuilder.float();
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(20);
    });

    it("returns a number within custom range", () => {
      const result = BasicBuilder.float(5, 10);
      expect(result).toBeGreaterThanOrEqual(5);
      expect(result).toBeLessThanOrEqual(10);
    });

    it("can return a float value", () => {
      const results = Array.from({ length: 10 }, () => BasicBuilder.float());
      const hasFloat = results.some((r) => !Number.isInteger(r));
      expect(hasFloat).toBe(true);
    });
  });

  describe("bigInt", () => {
    it("returns a bigint within default range", () => {
      const result = BasicBuilder.bigInt();
      expect(typeof result).toBe("bigint");
      expect(result).toBeGreaterThanOrEqual(BigInt(1));
      expect(result).toBeLessThanOrEqual(BigInt(20));
    });

    it("returns a bigint within custom range", () => {
      const result = BasicBuilder.bigInt(BigInt(100), BigInt(200));
      expect(result).toBeGreaterThanOrEqual(BigInt(100));
      expect(result).toBeLessThanOrEqual(BigInt(200));
    });
  });

  describe("string", () => {
    it("returns a string with default length", () => {
      const result = BasicBuilder.string();
      expect(result).toHaveLength(6);
    });

    it("returns a string with custom length", () => {
      const result = BasicBuilder.string({ length: 10 });
      expect(result).toHaveLength(10);
    });

    it("returns uppercase string when specified", () => {
      const result = BasicBuilder.string({ capitalization: Capitalization.UPPERCASE });
      expect(result).toBe(result.toUpperCase());
    });

    it("returns lowercase string when specified", () => {
      const result = BasicBuilder.string({ capitalization: Capitalization.LOWERCASE });
      expect(result).toBe(result.toLowerCase());
    });

    it("uses alphabetic charset by default", () => {
      const result = BasicBuilder.string({ length: 20 });
      expect(result).toMatch(/^[a-zA-Z]+$/);
    });
  });

  describe("stringMap", () => {
    it("returns a Map with default count", () => {
      const result = BasicBuilder.stringMap();
      expect(result).toBeInstanceOf(Map);
      expect(result.size).toBe(3);
    });

    it("returns a Map with custom count", () => {
      const result = BasicBuilder.stringMap({ count: 5 });
      expect(result.size).toBe(5);
    });

    it("has string keys and values", () => {
      const result = BasicBuilder.stringMap();
      for (const [key, value] of result) {
        expect(typeof key).toBe("string");
        expect(typeof value).toBe("string");
      }
    });
  });

  describe("genericMap", () => {
    it("returns a Map with generated values", () => {
      const result = BasicBuilder.genericMap(() => 42);
      expect(result).toBeInstanceOf(Map);
      expect(result.size).toBe(3);
    });

    it("uses the value generator function", () => {
      const result = BasicBuilder.genericMap(() => "test-value", { count: 2 });
      for (const value of result.values()) {
        expect(value).toBe("test-value");
      }
    });

    it("generates unique keys", () => {
      const result = BasicBuilder.genericMap(() => 1, { count: 5 });
      const keys = Array.from(result.keys());
      const uniqueKeys = new Set(keys);
      expect(uniqueKeys.size).toBe(keys.length);
    });
  });

  describe("genericDictionary", () => {
    it("returns an object with generated values", () => {
      const result = BasicBuilder.genericDictionary(() => 42);
      expect(typeof result).toBe("object");
      expect(Object.keys(result)).toHaveLength(3);
    });

    it("uses the value generator function", () => {
      const result = BasicBuilder.genericDictionary(() => "test-value", { count: 2 });
      for (const value of Object.values(result)) {
        expect(value).toBe("test-value");
      }
    });

    it("generates string keys", () => {
      const result = BasicBuilder.genericDictionary(() => 1);
      for (const key of Object.keys(result)) {
        expect(typeof key).toBe("string");
      }
    });
  });

  describe("multiple", () => {
    it("returns array with default count", () => {
      const result = BasicBuilder.multiple(() => "value");
      expect(result).toHaveLength(3);
    });

    it("returns array with custom count", () => {
      const result = BasicBuilder.multiple(() => "value", 7);
      expect(result).toHaveLength(7);
    });

    it("calls factory for each element", () => {
      let counter = 0;
      const result = BasicBuilder.multiple(() => ++counter, 5);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe("numbers", () => {
    it("returns array of numbers with default count", () => {
      const result = BasicBuilder.numbers();
      expect(result).toHaveLength(3);
      result.forEach((n) => {
        expect(typeof n).toBe("number");
      });
    });

    it("returns array of numbers with custom count", () => {
      const result = BasicBuilder.numbers(10);
      expect(result).toHaveLength(10);
      result.forEach((n) => {
        expect(typeof n).toBe("number");
      });
    });
  });

  describe("strings", () => {
    it("returns array of strings with default count", () => {
      const result = BasicBuilder.strings();
      expect(result).toHaveLength(3);
      result.forEach((s) => {
        expect(typeof s).toBe("string");
      });
    });

    it("returns array of strings with custom count and length", () => {
      const result = BasicBuilder.strings({ count: 5, length: 8 });
      expect(result).toHaveLength(5);
      result.forEach((s) => {
        expect(s).toHaveLength(8);
      });
    });

    it("applies capitalization to all strings", () => {
      const result = BasicBuilder.strings({
        count: 3,
        capitalization: Capitalization.UPPERCASE,
      });
      result.forEach((s) => {
        expect(s).toBe(s.toUpperCase());
      });
    });
  });

  describe("sample", () => {
    it("returns a single element from array", () => {
      const input = [1, 2, 3, 4, 5];
      const result = BasicBuilder.sample(input);
      expect(input).toContain(result);
    });

    it("returns multiple elements from array", () => {
      const input = [1, 2, 3, 4, 5];
      const result = BasicBuilder.sample(input, 3);
      expect(result).toHaveLength(3);
      result.forEach((item) => {
        expect(input).toContain(item);
      });
    });

    it("returns a single value from object", () => {
      const input = { a: 1, b: 2, c: 3 };
      const result = BasicBuilder.sample(input);
      expect(Object.values(input)).toContain(result);
    });

    it("returns multiple values from object", () => {
      const input = { a: 1, b: 2, c: 3 };
      const result = BasicBuilder.sample(input, 2);
      expect(result).toHaveLength(2);
      result.forEach((item) => {
        expect(Object.values(input)).toContain(item);
      });
    });
  });
});
