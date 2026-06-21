# Tech Stack Guidelines

## Core Technologies
- React with TypeScript for component-based architecture
- React Router for client-side routing
- Tailwind CSS for utility-first styling
- shadcn/ui for prebuilt components (no direct edits)
- Radix UI for additional component needs
- Lucide React for iconography

## File Structure
- All source code in `src/` folder
- Pages in `src/pages/`
- Components in `src/components/`
- Main page: `src/pages/Index.tsx`

## Component Usage
- Always use shadcn/ui components first
- Create new components only when:
  1. shadcn/ui doesn't meet requirements
  2. Customization exceeds reasonable limits
- Never modify shadcn/ui source files

## Styling Rules
- Use Tailwind classes exclusively
- No CSS-in-JS solutions
- Follow shadcn/ui's design system

## State Management
- Use React's built-in state management
- Consider Zustand/Zod for complex state
- Avoid Redux unless absolutely necessary

## API Layer
- Client-side API calls only
- No server-side code yet
- Add Nitro server layer when needed

## Version Control
- Follow standard Git workflows
- Use feature branches
- Include clear commit messages