const sdk = require("sharetribe-flex-integration-sdk");

const queryLimiter = sdk.util.createRateLimiter(
    sdk.util.devQueryLimiterConfig
);

const commandLimiter = sdk.util.createRateLimiter(
    sdk.util.devCommandLimiterConfig
);

const integrationSdk = sdk.createInstance({
    clientId: process.env.SHARETRIBE_INTEGRATION_CLIENT_ID,
    clientSecret: process.env.SHARETRIBE_INTEGRATION_CLIENT_SECRET,
    queryLimiter: queryLimiter,
    commandLimiter: commandLimiter,
    baseUrl: process.env.SHARETRIBE_INTEGRATION_BASE_URL || 'https://flex-integ-api.sharetribe.com',
});

module.exports = integrationSdk;