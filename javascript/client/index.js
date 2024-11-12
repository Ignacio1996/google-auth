const checkIfLoggedIn = async () => {
  console.log("Checking if logged in...");
  const token = await useToken();
  if (token) {
    document.getElementById("login").innerHTML = "Logged in!";
  } else {
    document.getElementById("login").innerHTML = "Login";
  }
};

const useToken = () => {
  const token = new URLSearchParams(window.location.search).get("token");
  console.log(token);
  return token;
};

const fetchGoogleDriveFiles = async () => {
  const token = useToken();
  if (token) {
    const req = await fetch("https://www.googleapis.com/drive/v3/files", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("getting from all drives");

    const data = await req.json();

    console.log(data);
  }
};

const fetchGoogleCalendarEvents = async () => {
  const token = useToken();
  if (token) {
    const req = await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await req.json();
    console.log(data);
  }
};

checkIfLoggedIn();

const login = async () => {
  const req = await fetch("http://localhost:8080/authLink", {
    method: "GET",
  });
  const data = await req.json();
  console.log("redirecting to ", data.authUrl);

  // Redirect to the authLink
  window.location.href = data.authUrl;
  document.getElementById("#login").innerHTML = "Logged in!";
};
