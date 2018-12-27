module.exports = {
  apps : [
      {
        name: "myapp",
        script: "server/server.js",
        watch: true,
        exec_mode: 'cluster',
        env: {
            "PORT": 3000,
            "MONGOHOST": "mongodb",
            "MONGOPORT": 27017,
            "AWS_ACCESS_KEY_ID": "AKIAIHXZFGFLFIVRS36A",
            "AWS_SECRET_ACCESS_KEY": "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"
        }
      }
  ]
}