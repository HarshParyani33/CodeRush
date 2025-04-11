# Code Battle Platform

A competitive online coding battle platform that supports both single-player and multiplayer modes. Built with Next.js, TypeScript, and TailwindCSS.

## Features

- **User Authentication**
  - Email/password sign up and login
  - Profile management
  - Elo-based ranking system

- **Single Player Mode**
  - Topic-based problem selection
  - Multiple difficulty levels
  - Integrated code editor with syntax highlighting
  - Real-time code execution
  - Performance tracking

- **Multiplayer Mode**
  - Real-time PvP battles
  - Elo-based matchmaking
  - Live code execution
  - Battle statistics and history

- **Programming Language Support**
  - JavaScript
  - Python
  - Java
  - C++
  - Syntax highlighting for all supported languages

## Tech Stack

- **Frontend**
  - Next.js 14
  - TypeScript
  - TailwindCSS
  - Monaco Editor
  - Socket.IO Client

- **Backend**
  - Node.js
  - Express
  - Socket.IO
  - Judge0 API (for code execution)

- **Database**
  - PostgreSQL
  - Prisma ORM

- **Authentication**
  - Firebase Auth

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/code-battle-platform.git
   cd code-battle-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_SOCKET_URL=your_socket_server_url
   NEXT_PUBLIC_JUDGE0_URL=your_judge0_api_url
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   ├── single-player/     # Single player mode
│   ├── multiplayer/       # Multiplayer mode
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
├── lib/                   # Utility functions and configurations
├── types/                 # TypeScript type definitions
└── styles/               # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 