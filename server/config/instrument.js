// Import with `import * as Sentry from "@sentry/node"` if you are using ESM

import * as Sentry from "@sentry/node"
Sentry.init({
  // The Data Source Name (DSN) is a unique identifier for your Sentry project
  dsn: "https://3a33169f67ce5cd3c61c7e72108524d7@o4509586567593984.ingest.us.sentry.io/4509586570412032",
  // Integrations are plugins that extend Sentry's functionality.
    integrations:[
        Sentry.mongooseIntegration()
        // It enables Sentry to automatically capture errors that occur within Mongoose operations
    ],

  // Setting this to `true` (as it is here) instructs Sentry to automatically collect
  // certain default PII data, such as the user's IP address, with error events(providing more context).
  sendDefaultPii: true,
});