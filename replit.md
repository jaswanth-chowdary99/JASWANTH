# Overview

Bodbot is a comprehensive fitness tracking application built with React and Express.js. The app helps users discover exercises, follow structured workouts, track their progress, and analyze their fitness journey through detailed insights. It features an exercise library, workout sessions, progress tracking, and user preferences management.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The client uses React with TypeScript and follows a component-based architecture:
- **React Router**: wouter for client-side routing
- **State Management**: React Query (@tanstack/react-query) for server state and caching
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **Form Handling**: React Hook Form with Zod validation

## Backend Architecture
The server is built with Express.js and implements a RESTful API:
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Schema Validation**: Zod schemas shared between client and server
- **Development**: Vite middleware integration for development mode
- **Storage Pattern**: Interface-based storage abstraction with in-memory implementation

## Data Layer
- **Database**: PostgreSQL with Neon serverless driver
- **Schema**: Shared TypeScript types and Zod schemas between client and server
- **Tables**: exercises, workouts, user_progress, user_stats, user_preferences
- **Migrations**: Drizzle Kit for database schema management

## Key Features
- **Exercise Library**: Searchable and filterable exercise database with muscle groups, equipment, and difficulty levels
- **Workout System**: Structured workouts with exercise sequences, sets, reps, and rest periods
- **Progress Tracking**: User progress logging with stats and insights
- **Mobile-First Design**: Responsive design optimized for mobile devices with bottom navigation

## Development Workflow
- **Monorepo Structure**: Client, server, and shared code in a single repository
- **Type Safety**: End-to-end TypeScript with shared schemas
- **Development Server**: Vite dev server with Express API integration
- **Build Process**: Separate client (Vite) and server (esbuild) builds

# External Dependencies

## Core Technologies
- **Frontend**: React 18, TypeScript, Vite
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL via @neondatabase/serverless

## UI and Styling
- **Component Library**: Radix UI primitives (@radix-ui/react-*)
- **Styling**: Tailwind CSS with PostCSS
- **Icons**: Lucide React icons
- **Utility Libraries**: clsx, tailwind-merge, class-variance-authority

## Data and State Management
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Validation**: Zod for schema validation
- **HTTP Client**: React Query for server state management
- **Forms**: React Hook Form with Hookform Resolvers

## Development Tools
- **Build Tools**: Vite, esbuild, tsx for development
- **Database Tools**: Drizzle Kit for migrations
- **Development Enhancements**: Replit-specific plugins for development environment