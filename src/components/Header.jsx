import "../styles/Header.css";

import logo from "../assets/logo.png";
export default function Header() {
  return (
    <div className="header">
      <div className="logo">
        <img src={logo} />
      </div>
      <h1>CV Builder App (React)</h1>
    </div>
  );
}
