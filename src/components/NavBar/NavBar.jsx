import { NavLink } from "react-router-dom";
import "./NavBar.css";

export function NavBar() {
  return (
    <nav className="nav">
      <ul className="nav-list">
        <li>
          <NavLink to="/profile" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Головна
          </NavLink>
        </li>
        <li>
          <NavLink to="/dialogs" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Повідомлення
          </NavLink>
        </li>
        <li>
          <NavLink to="/news" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Новини
          </NavLink>
        </li>
        <li>
          <NavLink to="/music" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Музика
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Налаштування
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
