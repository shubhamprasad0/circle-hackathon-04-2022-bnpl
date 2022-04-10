import NavBar from "./NavBar";

const navBarItems = [
  { id: 1, text: "Laptops" },
  { id: 2, text: "TVs" },
  { id: 3, text: "Audio" },
  { id: 4, text: "Gaming" },
  { id: 5, text: "Smart Home" },
  { id: 6, text: "Cart" },
  { id: 7, text: "Profile" },
];

const Header = () => {
  return (
    <header className="flex justify-between align-between mt-2 mx-4 pb-2 border-b-2">
      <div className="text-4xl font-bold text-blue-500">Creators Hub</div>
      <NavBar items={navBarItems} />
    </header>
  );
};

export default Header;
