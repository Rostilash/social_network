import { NavLink } from "react-router-dom";
import "./NavBar.css";

export function NavBar() {
  return (
    <nav className="nav">
      <ul className="nav-list">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Головна
          </NavLink>
        </li>
        <li>
          <NavLink to="/dialogs" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Повідомлення
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Пошук друзів
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile/1" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Профіль
          </NavLink>
        </li>
        {/* <li>
          <NavLink to="/music" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Музика
          </NavLink>
        </li> */}
        <li>
          <NavLink to="/todo" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Треба зробити
          </NavLink>
        </li>
        {/* <li>
          <NavLink to="/settings" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Налаштування
          </NavLink>
        </li> */}
      </ul>
    </nav>
  );
}
