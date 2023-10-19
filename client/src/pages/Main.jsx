import FormLogin from "../components/FormLogin";

export default function Main({ cookies, setCookie, removeCookie }) {
  return cookies.user === undefined ? (
    <FormLogin setCookie={setCookie} />
  ) : (
    <div>Main</div>
  );
}
