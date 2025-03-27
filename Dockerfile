FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

ENV NODE_ENV=production
ENV NEXT_PUBLIC_API_URL="https://api.takeout.fredericks.app/"
ENV NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="AIzaSyCqFFdJAPRXGe8T1HwjgUhRWp3NYqPTmAo"

EXPOSE 3000

CMD ["npm", "start"]