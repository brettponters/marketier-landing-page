# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based marketing landing page for "The Marketier" - an AI marketing agency for small businesses. The application is built with Vite, React 18, TailwindCSS, and Framer Motion for animations.

## Development Commands

- `npm run dev` - Start development server (Vite)
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Architecture & Structure

**Single Page Application**: The entire landing page is contained in `src/App.jsx` as a single component with multiple sections (Hero, How it Works, Growth Playbooks, Toolbox, CTA, Footer).

**Styling Approach**: 
- TailwindCSS for utility-first styling with custom color palette (`#46a2a2` teal theme)
- Inline custom components (Button, Card, Input) defined within App.jsx
- Framer Motion animations with viewport triggers and hover effects

**Component Structure**:
- `src/main.jsx` - React 18 entry point with StrictMode
- `src/App.jsx` - Main application component containing all UI sections
- `src/index.css` - Global CSS imports for Tailwind
- `index.html` - Comprehensive SEO meta tags, structured data, and social media tags

**Key Design Patterns**:
- Responsive design with mobile-first approach
- Motion/animation system using Framer Motion with staggered reveals
- Section-based layout with consistent spacing using custom Section component
- Form handling with preventDefault (no backend integration)
- Logo asset served from `/public/the-marketier-logo.png`

**Build System**: Vite with React plugin, PostCSS for TailwindCSS processing, and standard ES module configuration.