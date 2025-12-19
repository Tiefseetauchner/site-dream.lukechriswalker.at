// /var/www/ecosystem.config.cjs

const dotenv = require('dotenv');
const clientEnv = dotenv.config({ path: ".env.client" })
const backendEnv = dotenv.config({ path: ".env.backend" })

module.exports = {
  apps: [
    {
      name: "dreams-clientapp",
      cwd: "/var/www/dreams/clientapp/current",
      script: "bun",
      args: "run start -- --hostname 127.0.0.1 --port 3000",
      interpreter: "none",
      autorestart: true,
      max_restarts: 10,
      time: true,
      env: {
        NODE_ENV: "production",
        ...clientEnv.parsed
      },
      env_production: {
        NODE_ENV: "production",
        ...clientEnv.parsed
      },
    },
    {
      name: "dreams-backend",
      cwd: "/var/www/dreams/backend/current",
      script: "bun",
      args: "run start",
      interpreter: "none",
      autorestart: true,
      max_restarts: 10,
      time: true,
      env: {
        NODE_ENV: "production",
        ...backendEnv.parsed
      },
      env_production: {
        NODE_ENV: "production",
        ...backendEnv.parsed
      },
    },
  ],
};
