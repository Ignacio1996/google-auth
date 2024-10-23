const express = require("express");

const app = express();
const port = 8080;

require("dotenv").config();

// Custom CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/authlink", async (req, res) => {
  // Example usage
  generateAuthUrl()
    .then((authUrl) => {
      console.log("Generated Auth URL:", authUrl);
      res.json({ authUrl: authUrl });
    })
    .catch((error) => {
      console.error("Error generating auth URL:", error);
      res.status(500).json({ error: "Failed to generate auth URL" });
    });
  // Make sure to replace "YOUR_CLIENT_ID" and "YOUR_REDIRECT_URI" with your actual client ID and redirect URI

  // create a request to the google auth link route to generate the auth link with the environment variables
  // return the auth link to the client
  //   https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow
});

app.get("/redirect", (req, res) => {
  // Extract the code from the query parameters
  const code = req.query.code;

  // Make sure to replace "YOUR_CLIENT_ID" and
  // "YOUR
  // _CLIENT_SECRET" with your actual client ID and client secret
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = "http://localhost:8080/redirect";

  // Exchange the code for an access token
  const url = "https://oauth2.googleapis.com/token";

  res.redirect("http://127.0.0.1:3000");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const generateAuthUrl = async () => {
  const scopes = [
    "profile",
    "email",
    "https://www.googleapis.com/auth/calendar",
  ];

  const baseUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const params = new URLSearchParams({
    access_type: "offline",
    scope: scopes.join(" "),
    prompt: "consent",
    response_type: "code",
    client_id: process.env.GOOGLE_CLIENT_ID, // Replace with your actual client ID
    redirect_uri: "http://localhost:8080/redirect", // Replace with your actual redirect URI
  });

  const url = `${baseUrl}?${params.toString()}`;

  // Fetch request to simulate the generation
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to generate auth URL: ${response.statusText}`);
  }

  return url;
};
