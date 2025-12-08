# Quick Start Guide

Get up and running with @lichtblick/test-builders in minutes!

## Installation

```bash
# Using npm
npm install --save-dev @lichtblick/test-builders

# Using yarn
yarn add -D @lichtblick/test-builders

# Using pnpm
pnpm add -D @lichtblick/test-builders
```

## Basic Usage

### Import the Builder

```typescript
import { BasicBuilder } from "@lichtblick/test-builders";
```

### Generate Test Data

```typescript
// Random strings
const username = BasicBuilder.string({ length: 8 });
const email = BasicBuilder.string({ length: 10 }) + "@example.com";

// Random numbers
const age = BasicBuilder.number({ min: 18, max: 65 });
const price = BasicBuilder.float(10, 100); // 10.00 to 100.00

// Random dates
const createdAt = BasicBuilder.date();
const timestamp = BasicBuilder.datetime();

// Random booleans
const isActive = BasicBuilder.boolean();

// Random arrays
const tags = BasicBuilder.strings({ count: 5, length: 4 });
const scores = BasicBuilder.numbers(10); // 10 random numbers

// Pick random items
const status = BasicBuilder.sample(["active", "pending", "completed"]);
```

## Common Patterns

### Test User Object

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  isActive: boolean;
  createdAt: Date;
  tags: string[];
}

function createTestUser(overrides?: Partial<User>): User {
  return {
    id: BasicBuilder.string({ length: 16 }),
    name: BasicBuilder.string({ length: 10 }),
    email: BasicBuilder.string({ length: 8 }) + "@test.com",
    age: BasicBuilder.number({ min: 18, max: 80 }),
    isActive: BasicBuilder.boolean(),
    createdAt: BasicBuilder.date(),
    tags: BasicBuilder.strings({ count: 3 }),
    ...overrides,
  };
}

// Usage in tests
const user = createTestUser({ isActive: true });
```

### Test Product Object

```typescript
interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
  category: string;
  tags: string[];
}

function createTestProduct(overrides?: Partial<Product>): Product {
  return {
    id: BasicBuilder.number({ min: 1, max: 10000 }),
    name: BasicBuilder.string({ length: 12 }),
    price: BasicBuilder.float(5, 500),
    inStock: BasicBuilder.boolean(),
    category: BasicBuilder.sample(["electronics", "clothing", "food", "books"]),
    tags: BasicBuilder.strings({ count: 3, length: 6 }),
    ...overrides,
  };
}
```

### Multiple Test Objects

```typescript
// Create 5 test users
const users = BasicBuilder.multiple(createTestUser, 5);

// Create 10 test products
const products = BasicBuilder.multiple(createTestProduct, 10);

// Create users with specific criteria
const activeUsers = BasicBuilder.multiple(() => createTestUser({ isActive: true }), 3);
```

### Using Maps and Dictionaries

```typescript
// Create a metadata map
const metadata = BasicBuilder.genericMap(() => BasicBuilder.number(), { count: 5 });

// Create a settings dictionary
const settings = BasicBuilder.genericDictionary(() => BasicBuilder.boolean(), { count: 3 });

// Create complex nested structures
const userPreferences = BasicBuilder.genericDictionary(
  () => ({
    value: BasicBuilder.string(),
    enabled: BasicBuilder.boolean(),
    priority: BasicBuilder.number({ min: 1, max: 10 }),
  }),
  { count: 4 },
);
```

## String Options

```typescript
// Alphabetic (default)
BasicBuilder.string({ length: 10, charset: "alphabetic" });

// Alphanumeric
BasicBuilder.string({ length: 10, charset: "alphanumeric" });

// Numeric
BasicBuilder.string({ length: 10, charset: "numeric" });

// Uppercase
BasicBuilder.string({
  length: 10,
  capitalization: Capitalization.UPPERCASE,
});

// Lowercase
BasicBuilder.string({
  length: 10,
  capitalization: Capitalization.LOWERCASE,
});
```

## Utility Functions

### Defaults Helper

```typescript
import { defaults } from "@lichtblick/test-builders";

interface Config {
  host: string;
  port: number;
  ssl: boolean;
}

function createConfig(partial: Partial<Config>): Config {
  return defaults(partial, {
    host: "localhost",
    port: 3000,
    ssl: false,
  });
}

const config = createConfig({ port: 8080 });
// { host: 'localhost', port: 8080, ssl: false }
```

### Testing Private Methods

```typescript
import { callPrivateMethod } from "@lichtblick/test-builders";

class MyClass {
  private calculate(a: number, b: number): number {
    return a + b;
  }
}

const instance = new MyClass();
const result = callPrivateMethod(instance, "calculate", 5, 3);
// result === 8
```

## Testing Examples

### Jest Test Example

```typescript
import { BasicBuilder } from "@lichtblick/test-builders";

describe("UserService", () => {
  it("should create user with valid data", () => {
    const userData = {
      name: BasicBuilder.string({ length: 8 }),
      email: BasicBuilder.string({ length: 10 }) + "@test.com",
      age: BasicBuilder.number({ min: 18, max: 65 }),
    };

    const user = userService.create(userData);

    expect(user).toHaveProperty("id");
    expect(user.name).toBe(userData.name);
    expect(user.email).toBe(userData.email);
  });

  it("should handle multiple users", () => {
    const users = BasicBuilder.multiple(
      () => ({
        name: BasicBuilder.string(),
        email: BasicBuilder.string() + "@test.com",
      }),
      5,
    );

    const result = userService.createBatch(users);

    expect(result).toHaveLength(5);
  });

  it("should filter products by category", () => {
    const products = BasicBuilder.multiple(
      () => ({
        name: BasicBuilder.string(),
        category: BasicBuilder.sample(["A", "B", "C"]),
        price: BasicBuilder.float(10, 100),
      }),
      20,
    );

    const filtered = productService.filterByCategory(products, "A");

    expect(filtered.every((p) => p.category === "A")).toBe(true);
  });
});
```

## Tips & Best Practices

1. **Use Overrides**: Create base factory functions and override specific fields for test cases

   ```typescript
   const user = createTestUser({ isActive: false });
   ```

2. **Consistent Seeds**: For reproducible tests, you might want to use fixed values for critical fields

   ```typescript
   const testUser = createTestUser({ id: "test-user-1" });
   ```

3. **Type Safety**: Leverage TypeScript types for better IDE support

   ```typescript
   function createTestUser(overrides?: Partial<User>): User { ... }
   ```

4. **Reusable Factories**: Create factory functions for common test objects

   ```typescript
   // factories.ts
   export const createTestUser = (overrides?: Partial<User>) => { ... };
   export const createTestProduct = (overrides?: Partial<Product>) => { ... };
   ```

5. **Combine Builders**: Mix different builders for complex scenarios
   ```typescript
   const complexObject = {
     users: BasicBuilder.multiple(createTestUser, 3),
     settings: BasicBuilder.genericDictionary(() => BasicBuilder.boolean()),
     metadata: BasicBuilder.stringMap(),
   };
   ```

## Next Steps

- Read the [full README](../README.md) for complete API documentation
- Check out the [source code](../src/) for implementation details
- Browse [tests](../src/builders/BasicBuilder.test.ts) for more examples
- Report issues on [GitHub](https://github.com/lichtblick-suite/test-builders/issues)

## Getting Help

- 📖 [Documentation](../README.md)
- 💬 [GitHub Discussions](https://github.com/lichtblick-suite/test-builders/discussions)
- 🐛 [Issue Tracker](https://github.com/lichtblick-suite/test-builders/issues)

Happy Testing! 🎉
