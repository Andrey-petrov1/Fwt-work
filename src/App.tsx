import { useState } from "react";
import Gallery from "./pages/Gallery";
import Header from "./components/Header/Header";
import ThemeContext from "./context/themeContext";
import "./App.scss";
import clsx from "clsx";

function App() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };
  return (
    <ThemeContext.Provider value={theme}>
      <div className={clsx("app", `app-${theme}`)}>
        <div className="app-container">
          <Header handleTheme={toggleTheme} />
          <Gallery />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
