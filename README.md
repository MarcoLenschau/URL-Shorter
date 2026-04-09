# URL-Shorter Microservice

A lightweight Node.js/Express microservice for shortening URLs, using MongoDB as the database.

## Features
- Shortens any URL and stores it in MongoDB
- Automatic redirection from short URLs
- REST API (JSON)
- TypeScript codebase

## Setup

1. **Clone repository & install dependencies**
   ```bash
   git clone <repo-url>
   cd URL-Shorter
   npm install
   ```

2. **Create a `.env` file** (example):
   ```env
   PORT=7000
   MONGO_URI=mongodb://localhost:27017/db
   ```

3. **Build & start**
   ```bash
   npm start
   ```