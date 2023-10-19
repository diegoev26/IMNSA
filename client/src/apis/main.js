const url = "http://localhost:5000/api";

export const login = async (jsonIn) => {
  const res = await fetch(url + "/login", {
    method: "post",
    headers: { "Content-type": "Application/json" },
    body: JSON.stringify({ data: jsonIn }),
  });
  const data = await res.json();
  return data;
};
