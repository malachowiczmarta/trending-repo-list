import React from "react";
import Button from "../../components/button/Button";
import Language from "../../components/language/Language";
import List from "../../components/list/List";

function Home() {
  const onHandleClick = () => {
    console.log("sortuj");
  };
    return (
      <div className="App">
        <h1>Trending repository</h1>
        <Button label="sort" handleClick={onHandleClick} />
        <List />
      </div>
    );
}

export default Home;
