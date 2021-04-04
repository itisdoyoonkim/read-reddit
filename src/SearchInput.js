import React from "react";
import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

function SearchInput({ subreddit, handleSave, changeSubreddit }) {
  return (
    <section id="search-section">
      <Input
        suffix={<SearchOutlined className="site-form-item-icon" />}
        type="text"
        name="subreddit"
        id="search-input-field"
        value={subreddit}
        autoFocus={true}
        onChange={changeSubreddit}
      />
      <Button onClick={handleSave} id="save-button">
        SAVE IT FOR LATER
      </Button>
    </section>
  );
}

export default SearchInput;
