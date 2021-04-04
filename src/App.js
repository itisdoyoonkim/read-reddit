import React, { useState } from "react";
import "./App.css";
import SearchView from "./SearchView";
import Details from "./Details";

function App() {
  const [currentPost, setCurrentPost] = useState(null);

  return (
    <main className="App">
      <section id="search-result-view">
        <SearchView setCurrentPost={(value) => setCurrentPost(value)} />
      </section>
      <section id="details-view">
        <Details currentPost={currentPost} />
      </section>
    </main>
  );
}

export default App;
