// ecosystem.config.js - PM2 configuration for Next.js
module.exports = {
  apps: [
    {
      name: 'next-app',
      script: 'node_modules/.bin/next',
      args: 'start -p 3000',
      cwd: '/home/ubuntu/pechenka',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: '/home/ubuntu/pechenka/logs/error.log',
      out_file: '/home/ubuntu/pechenka/logs/out.log',
      log_file: '/home/ubuntu/pechenka/logs/combined.log',
      time: true
    }
  ]
};
