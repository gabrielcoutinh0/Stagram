import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Auth/Login";
import { Register } from "./pages/Auth/Register";
import { Navbar } from "./components/Navbar/Navbar";
import { Footer } from "./components/Footer/Footer";
import { useAuth } from "./hooks/useRequireAuth";
import { switchThemeMode } from "./hooks/useSwitchThemeMode";
import { EditProfile } from "./pages/EditProfile/EditProfile";
import { Profile } from "./pages/Profile/Profile";

function App() {
  const { auth, loading } = useAuth();
  const [theme, setTheme] = switchThemeMode();

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar
          theme={theme as string}
          setTheme={setTheme as React.Dispatch<React.SetStateAction<string>>}
        />
        <Routes>
          <Route
            path="/"
            element={auth ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/:id"
            element={auth ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile/edit"
            element={auth ? <EditProfile /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!auth ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!auth ? <Register /> : <Navigate to="/" />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
