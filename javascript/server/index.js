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
});

app.get("/redirect", async (req, res) => {
  // Extract the code from the query parameters
  const code = req.query.code;

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code: req.query.code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: "http://localhost:8080/redirect",
      grant_type: "authorization_code",
    }),
  });

  const data = await response.json();
  const tokens = data;

  console.log("tokens :>> ", tokens.access_token);

  const url = "https://oauth2.googleapis.com/token&code=" + tokens.access_token;
  console.log("url :>> ", url);

  const redirectUrl = `http://localhost:3000/?token=${tokens.access_token}&refresh_token=${tokens.refresh_token}`;
  // redirectUrl.searchParams.append("token", tokens.access_token);
  res.redirect(redirectUrl);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const generateAuthUrl = async () => {
  const scopes = ["profile", "email", "https://www.googleapis.com/auth/drive"];

  const baseUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const scopesString = scopes.join(" ");
  const accessType = "offline";
  const prompt = "consent";
  const responseType = "code";

  // complex strings with more characters, need to encode URI components
  const clientId = encodeURIComponent(process.env.GOOGLE_CLIENT_ID);
  const redirectUri = encodeURIComponent("http://localhost:8080/redirect");
  const scope = encodeURIComponent(scopesString);

  const url = `${baseUrl}?access_type=${accessType}&scope=${scope}&prompt=${prompt}&response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}`;

  console.log("url :>> ", url);

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
