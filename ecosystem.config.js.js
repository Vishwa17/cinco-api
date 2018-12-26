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
            "MONGOPORT": 27017
        }
      }
  ]
}