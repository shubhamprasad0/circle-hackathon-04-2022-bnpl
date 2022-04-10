import { Nav, NavItem, NavLink } from "reactstrap";

const NavBar = ({ items }) => {
  const navItems = items.map((item) => {
    return (
      <NavItem key={item.id}>
        <NavLink className="text-xl">{item.text}</NavLink>
      </NavItem>
    );
  });

  return (
    <>
      <Nav pills>{navItems}</Nav>
    </>
  );
};

export default NavBar;
