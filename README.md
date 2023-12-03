# epii-client

A simple React client runtime.

- sealed entry for single page application
- optional file-system based router 

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
│  ├─ pages
│  │  └─ (optional-routes)
│  ├─ (others)
│  └─ index.tsx
└─ start.ts
```

## start client
  
```ts
import { startClient } from '@epiijs/client';

startClient({
  name: 'your-client',
  port: {
    devServer: 3000
  },
  path: {
    root: __dirname
  }
});
```