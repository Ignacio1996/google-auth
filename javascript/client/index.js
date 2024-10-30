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
    console.log("token available", token);
    return token;
  } else {
    return null;
  }
};

const fetchGoogleDriveFiles = async () => {
  const token = await useToken();
  if (token) {
    // google drive 3 api fetch
    const req = await fetch("https://www.googleapis.com/drive/v3/files", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("getting from all drives");

    const data = await req.json();

    // const data = await req.json();
    console.log(data);
  }
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
