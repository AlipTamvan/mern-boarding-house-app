import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddKos from "./pages/AddKos";
import { useAppContext } from "./contexts/AppContext";
import MyKos from "./pages/MyKos";
import EditKos from "./pages/EditKos";
import Search from "./pages/Search";
import Detail from "./pages/Detail";
import Sewa from "./pages/Sewa";
import MyBookings from "./pages/MyBookings";
import Home from "./pages/Home";

const App = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <Search />
            </Layout>
          }
        />
        <Route
          path="/detail/:kosId"
          element={
            <Layout>
              <Detail />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />
        {isLoggedIn && (
          <>
            <Route
              path="/kos/:kosId/sewa"
              element={
                <Layout>
                  <Sewa />
                </Layout>
              }
            />
            <Route
              path="/add-kos"
              element={
                <Layout>
                  <AddKos />
                </Layout>
              }
            />
            <Route
              path="/edit-kos/:kosId"
              element={
                <Layout>
                  <EditKos />
                </Layout>
              }
            />
            <Route
              path="/my-kos"
              element={
                <Layout>
                  <MyKos />
                </Layout>
              }
            />
            <Route
              path="/my-bookings"
              element={
                <Layout>
                  <MyBookings />
                </Layout>
              }
            />
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
