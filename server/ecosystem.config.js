// eslint-disable-next-line no-undef
module.exports = {
  apps: [
    {
      name: "weame-chat-server",
      script: "server.ts",
      instances: 1, // (process) number of app instance to be launched
      exec_mode: "cluster", // mode to start your app
      watch: true, // enable watch & restart feature, if a file change in the folder or subfolder, your app will get reloaded
      ignore_watch: ["node_modules"], // list of regex to ignore some file or folder names by the watch feature
      max_memory_restart: "1G", // your app will be restarted if it exceeds the amount of memory specified (500mb)
      env: {
        // PORT: 8000
        NODE_ENV: "development",
      },
    },
  ],
};
