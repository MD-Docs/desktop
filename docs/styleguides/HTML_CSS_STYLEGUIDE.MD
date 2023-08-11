# HTML/CSS (React) Style Guide

This guide defines the coding conventions for HTML and CSS within React components for our project. The aim is to ensure consistency, maintainability, and readability across the codebase.

## 1. **HTML**

### 1.1. Semantic Elements

- Always use semantic HTML elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` etc.) to ensure better accessibility and understanding of the structure.

### 1.2. Self-Closing Tags

- For elements without any content, use self-closing tags. Example: `<img src="path/to/image.jpg" alt="description" />`.

### 1.3. Props Ordering

- When an element has multiple props, order them semantically and not alphabetically. Common props like `key` and `ref` should come first, followed by callbacks (like `onClick`), and then others.

## 2. **CSS-in-JS (assuming you're using a solution like styled-components)**

### 2.1. Component Naming

- Name components with a clear understanding of what they represent. For instance, `StyledButton` or `HeaderWrapper`.

### 2.2. Global Styles

- Define global styles using a global styles helper. This includes resets, typography, colors, and basic utility classes.

## 3. **CSS**

### 3.1. Naming Convention

- Prefer BEM (Block, Element, Modifier) naming convention for class names to ensure that styles don't unintentionally overlap.
    - Example: `.block__element--modifier`.

### 3.2. Units

- Use `rem` units for typography to ensure scalable and consistent typography.
- Use `px` for fixed dimensions (like borders).
- Use percentages (%) for responsive layout parts.

### 3.3. Colors

- Define common colors as CSS variables or in a shared JS file if using CSS-in-JS.

### 3.4. Media Queries

- Use media queries responsibly and always design with a mobile-first approach. Start with styles for smaller screens and then add media queries for larger screens.

### 3.5. Structure

- Follow a consistent ordering of CSS properties, such as positioning, box model, typography, visuals, and others.
    - Example order: `display`, `position`, `top/right/bottom/left`, `width/height`, `padding/margin`, `font-*`, `color`, `background-*`.

## 4. **React-specific Practices**

### 4.1. CSS Modules

- If using CSS modules, ensure that class names are locally scoped by default to avoid unexpected overwrites.

### 4.2. Inline Styles

- Use inline styles sparingly. They can be useful for dynamic styles but can make components harder to read and debug. CSS-in-JS solutions are often a better choice for dynamic styling.