# epii-client

A simple React client runtime.

- sealed entry for single page application
- optional file-system based router (WIP)

# Install

```bash
npm i @epiijs/client --save-dev
```

# Usage

## project like this

```sh
(root)
├─ src
│  ├─ .epiijs
│  │  └─ (auto-generated)
│  ├─ (others)
│  └─ index.tsx
└─ start.ts
```

## start client dev server
  
```ts
import { startClient } from '@epiijs/client';

startClient({
  name: 'your-client',
  path: {
    root: __dirname
  }
});
```