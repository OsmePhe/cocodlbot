module.exports = {
  apps : [{
    script: 'index.js',
    watch: true,
  }]

  deploy : {
    production : {
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
