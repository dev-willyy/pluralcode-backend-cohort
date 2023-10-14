const fileStoreOptions = {
  path: 'user-sessions',
  ttl: 7200,
  retries: 5,
  reapInterval: 3600,
  fileExtension: '.json',
};

module.exports = fileStoreOptions;
