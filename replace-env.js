// scripts/replace-env.js
const replace = require("replace-in-file");

const options = {
  files: "dist/**/*.html",
  from: [
    /{{EMAILJS_PUBLIC_KEY}}/g,
    /{{EMAILJS_SERVICE_ID}}/g,
    /{{EMAILJS_TEMPLATE_ID}}/g,
  ],
  to: [
    process.env.EMAILJS_PUBLIC_KEY,
    process.env.EMAILJS_SERVICE_ID,
    process.env.EMAILJS_TEMPLATE_ID,
  ],
};

(async () => {
  try {
    const results = await replace(options);
    console.log(
      "Environment variables injected:",
      results.filter((r) => r.hasChanged),
    );
  } catch (error) {
    console.error("Error during environment variable injection:", error);
    process.exit(1);
  }
})();
