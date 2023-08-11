# JS/TS Style Guide

This guide defines the coding conventions for the JavaScript and TypeScript code in our project. It ensures consistency and readability across the codebase.

## 1. **General**

### 1.1. Indentation

- Use 2 spaces for indentation, not tabs.

### 1.2. Semicolons

- Always use semicolons at the end of statements.

### 1.3. Single vs. Double Quotes

- Use single quotes (`'`) for string literals.

## 2. **Variables and Constants**

### 2.1. Naming

- Use `camelCase` for variable and function names.
- For constants that are not enums, use `UPPER_CASE_WITH_UNDERSCORES`.

### 2.2. `let` vs. `const`

- Use `const` by default. If you find that you need to reassign the variable, use `let`.

## 3. **Types (TypeScript)**

### 3.1. Explicit Types

- Always define types explicitly for function arguments and return values.

### 3.2. Aliases and Enums

- Use type aliases to create meaningful names and follow the `TheThingThatsNotCamelCase` convention.
- Enum names should also follow the `TheThingThatsNotCamelCase` convention.
- Enum members should be in `UPPER_CASE_WITH_UNDERSCORES`.
- Enums that represent actions should have the suffix `Actions`, e.g., `UserActions`.

### 3.3. Organization

- Store type aliases in the appropriate location based on their purpose. For instance, type aliases related to interfaces should be stored under `@interfaces/*` which maps to `types/interfaces/*`.
- Store enums in `@enums/*` which maps to `types/enums/*`.

## 4. **Functions**

### 4.1. Arrow Functions

- Prefer arrow functions over the `function` keyword unless you need the specific behavior of `function`.

### 4.2. Parameters & Arguments

- If a function takes multiple arguments, consider using an options object.

## 5. **Objects & Arrays**

### 5.1. Object Literal Shorthand

- Use object shorthand where possible.

### 5.2. Destructuring

- Prefer destructuring when accessing multiple properties from an object.

## 6. **Modules and Components**

### 6.1. ES6 Modules

- Use ES6 module syntax (`import`/`export`) over older CommonJS or AMD syntax.

### 6.2. Organization

- Components should be placed under `@components/*`, which maps to `components/*`.
- Utility functions should reside in `@utils/*` which maps to `utils/*`.
- Styles related to components or pages should be in `@styles/*`, mapping to `styles/*`.
- Redux reducers and global state management logic should be in `@reducers/*` and `@store/*` respectively.
- Actions related to Redux or any event-driven patterns you're using should be in `@actions/*`.
- Reusable React hooks should reside in `@hooks/*`.
- Any larger modules or groups of related functions/classes should be in `@modules/*`.

### 6.3. Exports

- Always use `index.ts` or `index.js` files within directories to aggregate and export members. This ensures that when importing, you can have cleaner import paths and more clarity about a module's public API.

---

Remember to adjust and expand this style guide as your project grows and changes!
