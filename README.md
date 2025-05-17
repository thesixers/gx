# genesix-cli

**A powerful CLI tool to scaffold modern web applications starting with Express.js — JavaScript and TypeScript supported.**

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Command Syntax](#command-syntax)
- [Templates](#templates)
- [Project Structure](#project-structure)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

---

## About

`genesix-cli` is a developer-friendly CLI tool designed to help you quickly generate server-side applications. It currently supports Express.js projects and will be extended in the future to include more stacks like React.

---

## Features

- Scaffold an Express.js app in JavaScript or TypeScript.
- Automatically sets up project structure, base files, and configurations.
- Interactive prompts to guide users when flags are missing.
- Installs up-to-date dependency versions.
- Lightweight and zero-config — just run and code.
- Built for expansion (e.g., React scaffolding planned).

---

## Installation

Install globally to access the CLI anywhere:

```bash
npm install -g genesix-cli
```

Or run directly without installing:

```bash
npx genesix-cli create-express-app *project-name --template js
```

---

## Usage

```bash
gx create-express-app *my-app --template js
```

- `*project-name` is **required** and must come first (start with an asterisk).
- `--template` flag must be used to specify the template (`js` or `ts`).

If you forget to include a flag or value, the CLI will prompt you.

---

## Command Syntax

```bash
create-express-app *project-name --template js
```

- `create-express-app`: Command to scaffold an Express project.
- `*project-name`: Required. Name of the project/folder to be created.
- `--template`: Required. Options are:
  - `js`: JavaScript template
  - `ts`: TypeScript template

---

## Templates

| Template | Description                          |
|----------|--------------------------------------|
| js       | Basic Express app in JavaScript      |
| ts       | Express app with TypeScript setup    |

---

## Project Structure

The generated folder will look like:

```
my-app/
├── public/
│   └── index.html
├── src/
│   ├── controllers/
│   │   └── mainController.js (or .ts)
│   ├── middleware/
│   │   └── index.js (or .ts)
│   ├── routes/
│   │   └── mainRoutes.js (or .ts)
│   └── server.js (or index.ts)
├── .env
├── .gitignore
├── package.json
├── README.md
└── ...
```

---

## Development

Clone and run the CLI locally:

```bash
git clone https://github.com/thesixers/gx.git
cd gx
npm install

# Run CLI locally
node bin/index.js
```

---

## Contributing

Contributions are welcome!

- Open issues
- Submit pull requests
- Share feature suggestions

---

## License

ISC License

---

> **Note:** More commands like `create-react-app` are coming soon. Stay tuned!