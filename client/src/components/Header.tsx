import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "../components/SignOutButton";

export const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="bg-green-600 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">we-Kos</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                className="flex  items-center text-white px-3 font-bold hover:bg-gray-100 hover:text-green-600 rounded-md"
                to="/my-bookings"
              >
                Booking Saya
              </Link>
              <Link
                className="flex  items-center text-white px-3 font-bold hover:bg-gray-100 hover:text-green-600 rounded-md"
                to="/my-bookings"
              >
                Hotel Saya
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex bg-white  items-center text-green-400 px-3 font-bold hover:bg-gray-100 rounded-lg text-xl"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
