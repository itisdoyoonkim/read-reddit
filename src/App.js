import React, { useState } from "react";
import "./App.css";
import { Row, Col } from "antd";
import SearchView from "./SearchView";
import Details from "./Details";

function App() {
  const [currentPost, setCurrentPost] = useState(null);

  return (
    <main className="App">
      <Row>
        <Col span={9}>
          <SearchView setCurrentPost={(value) => setCurrentPost(value)} />
        </Col>
        <Col span={15}>
          <Details currentPost={currentPost} />
        </Col>
      </Row>
    </main>
  );
}

export default App;
