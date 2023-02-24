module.exports = {
  apps: [
    {
      name: 'penaval-api',
      script: 'npm run start',
      cron_restart: '0 0 * * *'
    }
  ]
};