# @lichtblick/test-builders

Test utilities and builders for Lichtblick projects.

## Installation

```bash
npm install --save-dev @lichtblick/test-builders
# or
yarn add -D @lichtblick/test-builders
```

## Usage

```typescript
import { BasicBuilder } from "@lichtblick/test-builders";

// Generate random test data
const randomString = BasicBuilder.string({ length: 10 });
const randomNumber = BasicBuilder.number({ min: 1, max: 100 });
const randomDateTime = BasicBuilder.datetime();
const randomDate = BasicBuilder.date();
const randomBoolean = BasicBuilder.boolean();
const randomFloat = BasicBuilder.float(1, 100);
const randomBigInt = BasicBuilder.bigInt(BigInt(1), BigInt(100));
const randomArray = BasicBuilder.multiple(() => BasicBuilder.string(), 5);
const randomSample = BasicBuilder.sample(["option1", "option2", "option3"]);
const randomMap = BasicBuilder.genericMap(() => BasicBuilder.number());
const randomDict = BasicBuilder.genericDictionary(() => BasicBuilder.boolean());
```

## Available Builders

- `BasicBuilder` - Basic data types (strings, numbers, dates, booleans, maps, arrays, etc.)
  - `datetime()` - Generate random datetime strings (ISO 8601 format)
  - `date()` - Generate random Date objects
  - `boolean()` - Generate random booleans
  - `number()` - Generate random integers with configurable min/max
  - `float()` - Generate random floats with configurable min/max
  - `bigInt()` - Generate random bigints with configurable min/max
  - `string()` - Generate random strings with configurable length, charset, and capitalization
  - `stringMap()` - Generate random Map<string, string> with configurable count and key/value options
  - `genericMap()` - Generate random Map<string, T> with custom value generator
  - `genericDictionary()` - Generate random Record<string, T> with custom value generator
  - `multiple()` - Generate arrays of random values using a factory function
  - `numbers()` - Generate arrays of random numbers
  - `strings()` - Generate arrays of random strings with configurable options
  - `sample()` - Pick random sample(s) from array or object

## Utilities

### `defaults`

Merge partial props with fallback props.

### `callPrivateMethod`

Helper function to call private methods for testing purposes.

## Development

### Git Flow

This project follows Git Flow branching strategy:

- `main` - Production releases
- `develop` - Integration branch
- `feature/*` - New features
- `release/*` - Release preparation
- `hotfix/*` - Production hotfixes

See [Git Flow Guide](docs/GIT_FLOW_GUIDE.md) for details.

### Scripts

```bash
# Development
yarn build          # Build the package
yarn test           # Run tests
yarn lint           # Lint and fix
yarn format         # Format code
yarn validate       # Run all checks
```

### CI/CD

- ✅ Automated testing on push
- 📦 Auto-publish to NPM on release
- 🔄 Auto-merge main → develop
- 📊 Code coverage reporting

Create releases via GitHub Actions UI or scripts. See [Git Flow Guide](docs/GIT_FLOW_GUIDE.md).

### Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/my-feature develop`
3. Commit: `git commit -m "feat: add feature"`
4. Push: `git push origin feature/my-feature`
5. Open PR to `develop`

## License

MPL-2.0 - Copyright (C) 2023-2025 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)
