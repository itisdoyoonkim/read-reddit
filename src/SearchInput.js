import React from "react";
import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

function SearchInput({ subreddit, handleSave, changeSubreddit }) {
  return (
    <section id="search-section">
      <input
        // suffix={<SearchOutlined className="site-form-item-icon" />}
        type="text"
        name="subreddit"
        id="search-input-field"
        value={subreddit}
        autoFocus={true}
        onChange={changeSubreddit}
      />
      <button onClick={handleSave} id="save-button">
        SAVE IT
      </button>
    </section>
  );
}

export default SearchInput;
