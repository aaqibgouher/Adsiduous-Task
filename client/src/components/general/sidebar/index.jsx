import { NavLink } from "react-router-dom";

const SidebarComponent = () => {
  const modules = [
    {
      label: "Dashboard",
      link: "/",
    },
    {
      label: "My Drive",
      link: "/my-drive",
    },
  ];

  return (
    <div className="sidebar">
      <ul>
        {modules?.map((menu, index) => (
          <li className="menu-item " key={index}>
            <NavLink
              to={menu?.link}
              className={({ isActive }) => (isActive ? "active-link" : "")} // Check if route is active
            >
              {menu?.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarComponent;
