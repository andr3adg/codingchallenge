const config = {
  BASE_URL: 'https://api.reddit.com/r/pics/{selectedCategory}.json',
  TIMEOUT_DURATION: 30000, //30 seconds
  REFETCHING_TIME: 2 * 60 * 1000, //2 minutes
};

export default config;
