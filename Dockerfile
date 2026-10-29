FROM node:22-alpine AS base

# Stage 1: Dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
# Increase Node memory to prevent silent OOM build failures
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN apk add --no-cache python3 make g++ && npm install --legacy-peer-deps

# Stage 2: Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm run build

# Stage 3: Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Security: Non-root user
RUN addgroup -S nodejs -g 1001
RUN adduser -S nextjs -u 1001 -G nodejs

# CRITICAL: Copy standalone server AND all static assets
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Database persistence
RUN mkdir -p /app/data && chown -R nextjs:nodejs /app/data

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]