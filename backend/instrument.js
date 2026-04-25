// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
const Sentry = require("@sentry/node");

Sentry.init({
  dsn: "https://2d7b3addd63ca8363dc1b9f0be5d5b0d@o4511188939440128.ingest.us.sentry.io/4511188939767808",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});