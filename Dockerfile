FROM node:22-alpine AS base
WORKDIR /app

FROM base AS deps
RUN apk add --no-cache python3 make g++
COPY package.json package-lock.json* ./
RUN npm ci

FROM base AS builder
ARG NEXT_PUBLIC_TINA_CLIENT_ID
ARG NEXT_PUBLIC_TINA_BRANCH
ARG TINA_TOKEN

ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=4096"
COPY --from=deps /app/node_modules ./node_modules

# COPY host files first (respecting .dockerignore)
COPY . .

# Bulletproof: Create .env.local AFTER copy, guaranteeing Next.js sees it
RUN echo "NEXT_PUBLIC_TINA_CLIENT_ID=${NEXT_PUBLIC_TINA_CLIENT_ID}" > .env.local && \
    echo "NEXT_PUBLIC_TINA_BRANCH=${NEXT_PUBLIC_TINA_BRANCH}" >> .env.local && \
    echo "TINA_TOKEN=${TINA_TOKEN}" >> .env.local

RUN npx prisma generate
RUN npx tinacms build --skip-cloud-checks
RUN npm run build
FROM base AS runner
RUN addgroup -S nodejs -g 1001
RUN adduser -S nextjs -u 1001 -G nodejs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma
RUN mkdir -p /app/data && chown -R nextjs:nodejs /app/data
USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["npm", "start"]
