# Overview

Bodbot is a completely free fitness training application built with React and Express.js. The app is designed to be subscription-free and login-free, providing users with unlimited access to exercise libraries, workout routines, progress tracking, and fitness insights. It features a comprehensive exercise database, structured workout sessions, progress analytics, and personalized preferences - all without any paywalls or premium features.

## Recent Updates (January 2025)
- Removed all subscription and login requirements 
- Added comprehensive welcome/onboarding flow
- Created nutrition placeholder page with "coming soon" messaging
- Enhanced settings page with clear "always free" messaging
- Fixed all TypeScript errors and accessibility issues
- Added mobile-optimized navigation and responsive design

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
- **Completely Free**: No login required, no subscriptions, no premium features - everything is free forever
- **Welcome Flow**: Onboarding experience that emphasizes the free nature of the app
- **Nutrition Planning**: Placeholder for upcoming nutrition tracking features (also free)

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