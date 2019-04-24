import { baseEnvironmentConfiguration } from 'base-environment';

export default {
    ...baseEnvironmentConfiguration,
    debug: false,
    testing: false,
    API_URL: 'https://api.steem-marketplace.com/',
    GRAPHQL_API: 'https://graphql.steem-marketplace.com/'
} as any;
