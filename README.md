# Simple Next.js App with Docker

A simple Next.js application configured to run in a Docker container.

## Getting Started

### Local Development (without Docker)

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Docker Development

#### Build and run with Docker:

```bash
docker build -t nextjs-app .
docker run -p 3000:3000 nextjs-app
```

#### Or use Docker Compose:

```bash
docker-compose up --build
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
.
├── app/
│   ├── layout.tsx       # Root layout component
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── Dockerfile           # Docker configuration
├── docker-compose.yml   # Docker Compose configuration
├── .dockerignore        # Files to ignore in Docker build
├── next.config.js       # Next.js configuration
├── package.json         # Project dependencies
└── tsconfig.json        # TypeScript configuration
```

## Docker Configuration

The Dockerfile uses a multi-stage build process:
- **deps**: Installs dependencies
- **builder**: Builds the Next.js application
- **runner**: Runs the application in production mode

The Next.js application is configured with `output: 'standalone'` for optimized Docker builds.

## Technologies Used

- Next.js 16
- React 18
- TypeScript
- Tailwind CSS
- Docker
