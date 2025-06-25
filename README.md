# Rick and Morty Front

## 🚀 Introduction

This is a small project focused on use the public api https://rickandmortyapi.com to practice front end development.
Although it's a small project, I decided to build the folder tree by distributing the resources in the locations where they're only needed, and the shared resources in the root of the app folder. At the same time, I've placed the test files in the same path where the components to be tested are defined, to encapsulate all aspects of each feature.
I've also added features that provide diversity in appearance to several globally used components, thus taking full advantage of the concept of reuse. At the same time, I've used top-rated dependencies to facilitate the development of several standard features, aiming for a simpler and more intuitive project.

## 🚀 Features

- **Next.js 15.3.4**
- **TypeScript** - Full type safety
- **Tailwind CSS** - With custom color palette and dark mode support
- **Axios** - Reusable HTTP client with interceptors
- **TanStack React Query** - Data fetching with caching and pagination
- **Authentication** - MOCKED JWT-based auth behaviour
- **LocalStorage Hook** - Reusable hook for browser storage
- **Exact dependency versions**
- **Reusable Components** - Button, Input, Header, Footer components
- **App Router** - Modern Next.js routing with layouts and loading states

## 📦 Tech Stack

- **Enviroment:** Node 22.15.0
- **Framework:** Next.js 15.3.4
- **Language:** TypeScript 5.8.3
- **Styling:** Tailwind CSS 4.1.10
- **HTTP Client:** Axios 1.10.0
- **State Management:** TanStack React Query 5.81.2
- **Package Manager:** npm

## 🛠️ Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**

   ```bash
   .env.local
   {
    NEXT_PUBLIC_API_URL=http://localhost:3001/api
    NEXT_PUBLIC_RICK_AND_MORTY_API_URL=https:// rickandmortyapi.com/api
    NODE_ENV=development
   }
   ```

3. **Run development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Pages

### Root (`/`)

- Automatic redirect based on authentication status

### Login (`/login`)

- Email/password authentication
- Demo credentials available
- Redirects to home after login
- Form validation and error handling

### Home (`/home`)

- Protected route (requires authentication)
- Characters directory with pagination
- Logout functionality

## 🎨 Theme System

- **Light/Dark Mode:** Toggle between themes
- **Persistent:** Saves preference in localStorage
- **Smooth Transitions:** CSS transitions for theme changes

## 📡 API Integration

### Axios Client

- Base URL configuration
- Automatic token injection
- Request/response interceptors
- Error handling

### React Query Hooks

- `useGet()` - Generic GET requests
- `usePagination()` - Paginated data

## 🧩 Reusable Components

### Button

```tsx
<Button variant="primary" size="md" loading={false}>
  Click me
</Button>
```

### Input

```tsx
<Input
  label="Email"
  type="email"
  error="Invalid email"
  placeholder="Enter email"
/>
```

### Header

```tsx
<Header title="Custom Title" />
```

## 🚦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run test` - Run test
- `npm run test:watch` - Run test --watch
- `npm run test:coverage` - Run coverage

## 🔧 Configuration Files

- `next.config.js` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `postcss.config.js` - PostCSS configuration
- `.eslintrc.js` - ESLint configuration

## 📄 License

This project is licensed under the MIT License.
