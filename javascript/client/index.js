const login = async () => {
  const req = await fetch("http://localhost:8080/authLink", {
    method: "GET",
  });

  const data = await req.json();

  console.log("data", data);
  return data;
};
