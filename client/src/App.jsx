import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";
import Main from "./pages/Main";

export default function App() {
  const [cookies, setCookie, removeCookie] = useCookies();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Main
              cookies={cookies}
              setCookie={setCookie}
              removeCookie={removeCookie}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
