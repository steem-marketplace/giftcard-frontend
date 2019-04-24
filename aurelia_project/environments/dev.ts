import { baseEnvironmentConfiguration } from 'base-environment';

export default {
    ...baseEnvironmentConfiguration,
    debug: true,
    testing: true,
    API_URL: 'http://localhost:3001/',
    GRAPHQL_API: 'http://localhost:5001'
} as any;
