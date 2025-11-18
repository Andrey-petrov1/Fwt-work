import styles from "./Header.module.scss";
import ThemeLight from "../Svg/ThemeLight/ThemeLight";
import ThemeDark from "../Svg/ThemeDark/ThemeDark";
import LogoDark from "../Svg/Logo/LogoDark";
import LogoLight from "../Svg/Logo/LogoLight";
import { useContext } from "react";
import ThemeContext from "../../context/themeContext";
import clsx from "clsx";

interface HeaderProps {
  handleTheme: () => void;
}

export default function Header({ handleTheme }: HeaderProps) {
  const theme = useContext(ThemeContext);

  const handleThemeClick = () => {
    handleTheme();
  };

  return (
    <header className={clsx(styles.header, styles[`header-${theme}`])}>
      <div className={styles["header-container"]}>
        <a href="/fwt-test/" className={styles["header-logo"]}>
          {theme === "dark" ? <LogoDark /> : <LogoLight />}
        </a>

        <button
          type="button"
          className={styles["header-theme"]}
          onClick={handleThemeClick}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <ThemeLight /> : <ThemeDark />}
        </button>
      </div>
    </header>
  );
}
