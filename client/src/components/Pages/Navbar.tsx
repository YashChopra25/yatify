import { Link } from "react-router-dom";
import ThemeToggler from "./ThemeToggler";
import { useAppSelector } from "@/store/Auth.Store";
import ProfileDropDown from "./ProfileDropDown";

const Navbar = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <nav className="shadow mb-4 dark:shadow-white">
      <div className="px-2 sm:px-6 lg:px-8">
        <div className="w-full relative flex h-16 items-center justify-between gap-4">
          <div className="flex shrink-0 items-center">
            <Link to="/">
              <h1 className="ms-3 text-2xl font-bold">Yatify</h1>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {user && user?.name && <ProfileDropDown />}
            <ThemeToggler />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
