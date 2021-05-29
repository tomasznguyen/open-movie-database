import React from "react";
import Header from "../Header";
import MovieOverview from "../MovieOverview";
import styles from "./App.module.scss";

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <Header />
      <MovieOverview />
    </div>
  );
};

export default App;
