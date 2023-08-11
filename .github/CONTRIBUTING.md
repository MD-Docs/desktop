# Contributing Guide

## Your First Code Contribution

While it might seem like there a lot of things you must do to make one single simple commit, it is very important for us to maintain our organization as this project scales. Please do make sure to take the time to read the entire guide as our guidelines may be different from other repositories.

### Preparing to Contribute

- Unsure where to begin contributing? Start by looking through the `beginner` and `help-wanted` tags in the issues. These are usually easier and will help you get acquainted with the project's codebase.
- Before working on a feature or a fix, ensure you have set up your local development environment. For more information about setting up the development environment, see [the setup guide in README.md](README.md/#installation).

### Opening an Issue

- Even if you plan to handle the fix or feature yourself, it's a good practice to open an issue for it. Doing so:
  - Lets maintainers and other contributors know what you're working on.
  - Allows for discussion and feedback about the intended changes before any code is written.
  - Provides a place to reference when submitting your pull request.
  
### Formatting Your Issues

- **Title:** Keep your issue title concise and descriptive. It should provide a summary of the problem or feature.
- **Description:** Start with a clear description of the issue. If it's a bug, describe the bug and how one can reproduce it. If it's a feature, describe what you want to achieve.
- **Labels:** Use labels (if available) to categorize your issue, e.g., `fix`, `feat`, `doc`, etc. For more information on prefixes, see [prefixes](#commit-message-conventions).
- **Screenshots:** A picture is worth a thousand words. If applicable, add screenshots to help explain your problem or idea.
- **Environment:** When reporting a bug, specify details about your environment such as the OS, browser/version, and any other relevant software information.

### Branch Naming and Creation

- After you've identified an issue you want to work on (or have created one), you'll need to create a branch in your fork to implement the changes.
- Branch naming is important as it informs others about the kind of work being done in that branch. Here's a simple convention you can use:
  - If you're working on a bugfix related to issue number #123, name your branch something like `fix/123-short-description-of-the-bug`.
  - For features, you can use: `feat/123-short-description-of-the-feature`.
  - Other prefixes you can consider using include: `refactor/`, `docs/`, `test/`, among others. For more information on prefixes, see [prefixes](#commit-message-conventions)
- Once your branch is created, you can make your changes, keeping commits clear and focused. When you're ready, submit a pull request against the main project repository.
- Make sure to format the document with prettier using `npm run prettier` before submitting the pull request

### Pull Request Process

- Once you've pushed your changes to your branch, you're ready to open a pull request (PR) against the main repository.
- When opening a PR:
  - Reference the issue you're addressing in the PR description (e.g., "Resolves #123").
  - Clearly describe the changes you've made in the PR.
  - Make sure your PR passes all Continuous Integration (CI) checks if set up.
- The project maintainers will review your PR. They might request some changes, discuss certain choices you made, etc. This is a normal part of the development process and provides an opportunity for improvement and learning.
- Once your PR is approved, it will be merged into the main codebase.

## Styleguides

### Commit Message Conventions

When committing to this repository, please follow the below conventions for your commit messages to ensure clarity and consistency.

## 1. `feat`: New Features

Use this prefix when introducing a new feature to the application.

Example:
feat: add search functionality


## 2. `fix`: Bug Fixes

Use this prefix when making bug fixes.

Example:
fix: resolve login inconsistency


## 3. `doc`: Documentation Changes

Use this prefix for commits that are documentation-related, such as updating the README, adding comments to code, or creating new documentation files.

Example:
doc: update README with new setup instructions

## 4. `refactor`: Refactoring code
Use this prefix for when you refactor or reformat a piece of code to make it more according to our guidlines.

Example: refactor: refactored fileReducer to use enums

## 5. `test`: Adding test
Use this prefix commits that are test-centered, such as fixing or adding new tests.

Example: test: added tests for module Editor.tsx

## Javascript & Typescript Conventions

Information regarding JS & TS conventions can be found [here](../docs/styleguides/JS_TS_STYLEGUIDE.MD)

## HTML & CSS Conventions

Information regarding HTML & CSS conventions can be found [here](../docs/styleguides/HTML_CSS_STYLEGUIDE.MD)

## Notable

You may notice an electron folder in the main root directory that contains some elctron code to open a new applicaton. Currently, we are in the proccess of making a desktop application version of MDDocs and contributions to it would be very appreciated.

## All in all...

If you're new to the project and want to contribute, please ensure you follow the commit message conventions outlined above. This ensures the git history is readable and understandable.
