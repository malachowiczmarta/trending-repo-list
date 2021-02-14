import React from "react";
import RepoList from "../../components/repoList/RepoList";

function Home() {
  return (
    <div className="App">
      <h1>Trending repository</h1>
      <RepoList />
    </div>
  );
}

export default Home;
