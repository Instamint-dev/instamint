# frontend - react.js

- [frontend - react.js](#frontend---reactjs)
  - [Useful commands for the frontend :](#useful-commands-for-the-frontend-)
  - [Frontend directory structure](#frontend-directory-structure)
    - [Src](#src)
      - [components](#components)
      - [features](#features)
      - [providers](#providers)
      - [types](#types)
  - [Frontend skeleton](#frontend-skeleton)


## Useful commands for the frontend :

- `npm run dev` : to start the frontend server
- `npm run lint` : to lint the code

## Frontend directory structure

The frontend is built using the React.js framework with vite as the build tool. We use tailwindcss for styling and typescript for type checking.

### Src

#### components

This directory contains the components for the frontend. The components are reusable UI elements that are used across the application.

#### features

This directory contains the features for the frontend. The features are composed of components and hooks that are used to implement a specific functionality. In every feature we can have the following directories:

- **services**: The services are responsible for interacting with the backend.
- **components**: The components are the UI elements that are used to implement the feature.
-
At the root of the feature directory we have tsx files that are the entry points for the feature with hooks.

#### providers

The providers are used to provide context to the components.

#### types

As we use typescript, this directory contains the types used across the application.

## Frontend skeleton

```
frontend/
├── public/
│   ├── locales/
│   │   ├── en/
│   │   │   └── translation.json
│   │   ├── fr/
│   │   │   └── translation.json
│   │   └── es/
│   │       └── translation.json
│   ├── favicon.ico
├── src/
│   ├── components/
│   │   └── [various reusable UI components]
│   │
│   ├── features/
│   │   ├── Feature1/
│   │   │   ├── services/
│   │   │   │   └── [interaction with backend]
│   │   │   ├── components/
│   │   │   │   └── [UI components for Feature1]
│   │   │   └── Feature1.tsx
│   │   │
│   │   └── [other features...]
│   │
│   ├── providers/
│   │   └── [context providers]
│   │
│   └── types/
│   │   └── [typescript types]
│   ├── i18n.ts
│   ├── App.tsx
│   ├── Rooter.tsx
│   └── main.tsx
├── vite.config.ts
├── tsconfig.json
├── package.json
└── index.html
```