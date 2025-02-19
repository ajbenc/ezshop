module.exports = {
  apps: [
    {
      name: "ezshop-backend",
      script: "./src/server.js",
      env: {
        NODE_ENV: "production",
        MONGO_URI: "your_mongodb_uri",
        JWT_SECRET: "your_jwt_secret",
      },
    },
  ],
};
