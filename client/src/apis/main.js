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

export const getData = async () => {
  const res = await fetch(url + "/getData", {
    method: "post",
    headers: { "Content-type": "Application/json" },
  });
  const data = await res.json();
  return data;
};

export const sendMail = async (jsonIn) => {
  const res = await fetch(url + "/sendMail", {
    method: "post",
    headers: { "Content-type": "Application/json" },
    body: JSON.stringify({ data: jsonIn }),
  });
  const data = await res.json();
  return data;
};
