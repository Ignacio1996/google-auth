const checkIfLoggedIn = async () => {
  console.log("Checking if logged in...");
  const token = await useToken();
  if (token) {
    document.getElementById("login").innerHTML = "Logged in!";
  } else {
    document.getElementById("login").innerHTML = "Login";
  }
};

const useToken = async () => {
  const token = new URLSearchParams(window.location.search).get("token");
  if (token) {
    return token;
  } else {
    return null;
  }
};

const getGoogleProfileDataFromGoogleWithToken = async () => {
  await fetch("");
};

checkIfLoggedIn();

const login = async () => {
  document.getElementById("login").innerHTML = "Loading...";
  const req = await fetch("http://localhost:8080/authLink", {
    method: "GET",
  });
  const data = await req.json();
  console.log("redirecting to ", data.authUrl);

  // Redirect to the authLink
  window.location.href = data.authUrl;
  document.getElementById("#login").innerHTML = "Logged in!";
};
