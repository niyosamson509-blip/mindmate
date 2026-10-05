# MindMate

MindMate is a polished AI assistant starter project built with Next.js and the OpenAI API. It includes a clean chat interface, a secure API route, and a production-ready folder structure for rapid extension.

## Features

- Beautiful AI chat interface
- OpenAI-powered conversations
- Responsive layout for desktop and mobile
- Demo mode when the API key is not configured
- Ready for extension into tasks, notes, or business workflows

## Tech stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- OpenAI API

## Project structure

- `app/page.tsx` — main landing page
- `components/mindmate-chat.tsx` — chat UI
- `app/api/chat/route.ts` — AI endpoint
- `app/globals.css` — design system and styling

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a local environment file:
   ```bash
   cp .env.example .env.local
   ```

3. Add your OpenAI key:
   ```env
   OPENAI_API_KEY=your_key_here
   OPENAI_MODEL=gpt-4o-mini
   ```

4. Run the app:
   ```bash
   npm run dev
   ```

5. Open `http://localhost:3000`

## Demo mode

If `OPENAI_API_KEY` is missing, MindMate still runs in a safe demo mode and returns a placeholder AI response so the app can be previewed locally.

## Deployment

This project is ready to deploy on Vercel. Add the same environment variables in your Vercel project settings.

## Goals

MindMate is designed to be a strong starting point for:

- AI chat assistants
- idea and brainstorming tools
- study or productivity copilots
- internal business assistants
- document and task AI helpers
