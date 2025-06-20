const axios = require("axios");

async function isEmailDeliverable(email) {
  const API_KEY = process.env.EMAIL_VERIFICATION_API_KEY;
  const url = `https://emailvalidation.abstractapi.com/v1/?api_key=${API_KEY}&email=${encodeURIComponent(
    email
  )}`;
  try {
    const response = await axios.get(url);
    // For AbstractAPI: deliverability === "DELIVERABLE"
    return response.data && response.data.deliverability === "DELIVERABLE";
  } catch (err) {
    // If API fails, treat as undeliverable (or you can allow registration)
    return false;
  }
}

module.exports = { isEmailDeliverable };
