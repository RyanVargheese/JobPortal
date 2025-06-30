// Import with `import * as Sentry from "@sentry/node"` if you are using ESM

import * as Sentry from "@sentry/node"
Sentry.init({
  dsn: "https://3a33169f67ce5cd3c61c7e72108524d7@o4509586567593984.ingest.us.sentry.io/4509586570412032",
    integrations:[
        Sentry.mongooseIntegration()
    ],
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});