# Admin Portal (admin-omd)

This is a React + Vite application with the following stack:
- React 19
- Vite
- Framer Motion
- Radix UI
- Lucide React
- Tailwind CSS
- Axios
- Jwt Decode
- React Router Dom v7

## Getting Started

1.  Install dependencies:
    ```bash
    npm install
    ```

2.  Start the development server:
    ```bash
    npm run dev
    ```

3.  Build for production:
    ```bash
    npm run build
    ```

## Features

- **Authentication**: Includes Login and Register pages.
- **Protected Routes**: Dashboard is protected and requires login.
- **Mock Auth**: Currently uses a mock login implementation in `src/context/AuthContext.tsx`. To connect to a real backend, uncomment the API call section.
- **UI Components**: Custom UI components built with Tailwind and Radix UI primitives (`src/components/ui`).

## Troubleshooting

If you encounter issues with CSS processing during build (PostCSS/Tailwind errors), ensure your Node.js environment is up to date and strict permissions are not blocking config loading.
The project uses ESM configuration (`postcss.config.js`, `tailwind.config.js`).

## Project Structure

- `src/components/ui`: Reusable UI components.
- `src/context`: React Contexts (Auth).
- `src/lib`: Utilities and Axios instance.
- `src/pages`: Application pages.
- `src/App.tsx`: Routing configuration.
