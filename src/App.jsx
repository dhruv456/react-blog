import { useEffect, useState } from "react";
import "./App.css";
import Input from "./components/Input";
import authService from "./service/auth";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./feature/authSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.auth);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await authService.getLogInUser();
        if (!user) {
          dispatch(logout());
        }
        dispatch(login(user));
        console.log(user);
      } catch (error) {
        console.error("Header Component :: checkAuth :: error", error);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-600 flex items-center justify-center p-4">
        <h1 className="text-4xl text-white">Loading...</h1>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-600 flex items-center justify-center p-4 flex-col text-amber-50">
        {userState.status && (
          <>
            <Header />
            <h1 className="text-4xl">Hello {userState.userData.name}</h1>
            <Footer />
          </>
        )}
        {!userState.status && <h1 className="text-4xl">Please log in</h1>}
      </div>
    );
  }
}

export default App;
