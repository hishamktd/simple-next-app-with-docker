# Simple Next.js App with Docker

A simple Next.js application configured to run in a Docker container with environment variable support.

## Environment Variables

This application uses environment variables for configuration. Copy `.env.example` to create your environment file:

```bash
cp .env.example .env.local
```

### Available Environment Variables

- `PORT` - Server port (default: 3000)
- `HOSTNAME` - Server hostname (default: 0.0.0.0)
- `NODE_ENV` - Node environment (development/production)
- `APP_NAME` - Application name
- `APP_VERSION` - Application version

## Getting Started

### Local Development (without Docker)

1. Install dependencies:
```bash
npm install
```

2. Copy and configure environment variables:
```bash
cp .env.example .env.local
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Docker Development

#### Build and run with Docker:

```bash
docker build -t nextjs-app .
docker run -p 3000:3000 --env-file .env.example nextjs-app
```

Or with custom port:
```bash
docker run -p 8080:8080 -e PORT=8080 nextjs-app
```

#### Or use Docker Compose:

```bash
docker-compose up --build
```

To use a custom port with Docker Compose, set the PORT environment variable:
```bash
PORT=8080 docker-compose up --build
```

The application will be available at [http://localhost:3000](http://localhost:3000) (or your configured port).

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
├── .env.example         # Environment variables template
├── .env.local           # Local environment variables (git ignored)
├── next.config.js       # Next.js configuration
├── package.json         # Project dependencies
└── tsconfig.json        # TypeScript configuration
```

## Docker Configuration

### Multi-Stage Build Process

The Dockerfile uses an optimized multi-stage build process for production deployment:

1. **Stage 1: Dependencies**
   - Installs production dependencies only
   - Uses npm cache cleaning for smaller image size
   - Based on Node 20 Alpine for minimal footprint

2. **Stage 2: Builder**
   - Copies dependencies from stage 1
   - Builds the Next.js application
   - Accepts build arguments (APP_PORT, NODE_ENV)
   - Disables Next.js telemetry

3. **Stage 3: Runner (Production)**
   - Creates non-root user for security (nextjs:nodejs)
   - Copies only necessary files from builder
   - Includes health check for container monitoring
   - Exposes configurable port
   - Runs as non-root user

### Build Arguments

You can customize the build with these arguments:

```bash
docker build \
  --build-arg APP_PORT=8080 \
  --build-arg NODE_ENV=production \
  -t nextjs-app .
```

### Health Checks

The Docker configuration includes health checks to monitor container status:
- Interval: 30 seconds
- Timeout: 3 seconds
- Start period: 40 seconds
- Retries: 3 attempts

### Security Features

- Runs as non-root user (uid 1001, gid 1001)
- Security headers configured in next.config.js
- Minimal Alpine base image
- Production-only dependencies

## Next.js Configuration

The application includes production-ready configurations:

- **Standalone Output**: Optimized for Docker deployment
- **Security Headers**: HSTS, XSS Protection, Content-Type Options, etc.
- **Image Optimization**: AVIF and WebP format support
- **Compression**: Enabled for better performance
- **Telemetry**: Disabled for privacy

## Deployment

This configuration is ready for deployment to any container orchestration platform:

- Docker Swarm
- Kubernetes
- AWS ECS/EKS
- Google Cloud Run
- Azure Container Instances
- Any platform supporting Docker containers

### Example Deployment Commands

```bash
# Build for specific port
docker build --build-arg APP_PORT=8080 -t nextjs-app .

# Run with custom configuration
docker run -d \
  -p 8080:8080 \
  -e PORT=8080 \
  -e NODE_ENV=production \
  --name my-nextjs-app \
  nextjs-app

# Check health status
docker inspect --format='{{.State.Health.Status}}' my-nextjs-app
```

## Technologies Used

- Next.js 16
- React 18
- TypeScript
- Tailwind CSS
- Docker (Multi-stage builds)
- Node.js 20 Alpine
