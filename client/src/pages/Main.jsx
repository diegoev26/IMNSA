import FormLogin from "../components/FormLogin";
import Details from "../components/Details";

export default function Main({ cookies, setCookie, removeCookie }) {
  return cookies.user === undefined ||
    typeof cookies.user !== "string" ||
    cookies.user.trim() === "" ? (
    <FormLogin setCookie={setCookie} />
  ) : (
    <Details cookies={cookies} removeCookie={removeCookie} />
  );
}
