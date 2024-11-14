const config = {
  mongodb: {
    url: process.env.MONGO_URL || "mongodb://host.docker.internal:27017/",
    databaseName: process.env.MONGO_DB_NAME || "Monefflo",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  migrationsDir: "src/migrations",
  changelogCollectionName: "changelog",
  migrationFileExtension: ".js",
  useFileHash: false,
  moduleSystem: 'commonjs',
};

module.exports = config;
