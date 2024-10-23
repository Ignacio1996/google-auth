const login = async () => {
  const req = await fetch("http://localhost:8080/authLink", {
    method: "GET",
  });

  const data = await req.json();

  console.log("redirecting to ", data);

  // Redirect to the authLink
  window.location.href = await data.authUrl;

  //   return data;
};
