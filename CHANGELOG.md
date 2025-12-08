# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- GitHub Actions CI/CD workflows
- Git Flow branching strategy
- Automated NPM publishing
- CodeQL security scanning
- Dependabot configuration
- Comprehensive documentation

## [1.0.0] - 2025-12-08

### Added

- Initial release
- `BasicBuilder` class with multiple builder methods:
  - `datetime()` - Generate random datetime strings
  - `date()` - Generate random Date objects
  - `boolean()` - Generate random booleans
  - `number()` - Generate random integers
  - `float()` - Generate random floats
  - `bigInt()` - Generate random bigints
  - `string()` - Generate random strings
  - `stringMap()` - Generate random Map<string, string>
  - `genericMap()` - Generate random Maps with custom values
  - `genericDictionary()` - Generate random Records
  - `multiple()` - Generate arrays of values
  - `numbers()` - Generate arrays of numbers
  - `strings()` - Generate arrays of strings
  - `sample()` - Pick random samples from arrays/objects
- Utility functions:
  - `defaults()` - Merge partial props with fallback props
  - `callPrivateMethod()` - Helper for testing private methods
- TypeScript support with full type definitions
- Comprehensive test suite with Jest
- ESLint and Prettier configuration
- Documentation and examples

[Unreleased]: https://github.com/lichtblick-suite/test-builders/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/lichtblick-suite/test-builders/releases/tag/v1.0.0
