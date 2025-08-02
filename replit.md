# Overview

Bodbot is a completely free fitness training application built with React and Express.js. The app is designed to be subscription-free and login-free, providing users with unlimited access to exercise libraries, workout routines, progress tracking, and fitness insights. It features a comprehensive exercise database, structured workout sessions, progress analytics, and personalized preferences - all without any paywalls or premium features.

## Recent Updates (February 2025)
- **Complete Feature Set**: Transformed into comprehensive fitness training app
- **Custom Workout Builder**: Create personalized workouts with exercise selection, sets/reps configuration
- **Advanced Exercise Library**: Enhanced filtering by category, equipment, difficulty with comprehensive search
- **Progress Analytics**: Added workout history, progress charts, and detailed insights dashboard
- **User Preferences**: Equipment availability settings, difficulty preferences, workout reminders
- **Enhanced UI Components**: Rest timers, progress rings, quick action buttons, advanced filters
- **Mobile Optimization**: Improved responsive design with professional fitness app UX
- **Free Badge Integration**: Clear "FREE" branding throughout app to emphasize no-cost access
- **Welcome Flow**: Professional onboarding that highlights completely free access
- **Accessibility**: Fixed all TypeScript errors and added proper ARIA labels for screen readers

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
- **Exercise Library**: 50+ exercises with advanced filtering by category, equipment, difficulty, and muscle groups
- **Custom Workout Builder**: Create personalized workouts with drag-and-drop exercise selection and custom sets/reps
- **Pre-built Workout Programs**: Professionally designed routines for different fitness levels and goals
- **Real-time Workout Sessions**: Interactive workout timer with rest periods and exercise guidance
- **Progress Analytics**: Comprehensive workout history, progress charts, streak tracking, and performance insights
- **User Preferences**: Equipment availability settings, difficulty preferences, workout reminders, and goal setting
- **Mobile-First Design**: Professional fitness app UX with bottom navigation, swipe gestures, and responsive layouts
- **Completely Free**: No login required, no subscriptions, no premium features - everything is free forever with prominent "FREE" branding
- **Welcome Flow**: Professional onboarding that emphasizes the completely free nature with feature highlights
- **Nutrition Planning**: Placeholder section for upcoming nutrition tracking features (also completely free)
- **Workout History**: Detailed logging of completed workouts with exercise-by-exercise breakdowns
- **Quick Actions**: One-tap access to common features like browse exercises, create workouts, view progress

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