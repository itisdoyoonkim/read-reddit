import React from "react";
import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

function SearchInput({ subreddit, handleSave, changeSubreddit }) {
  return (
    <div style={{ display: "flex" }}>
      <Input
        prefix={<SearchOutlined className="site-form-item-icon" />}
        style={{ padding: "10px", fontSize: "1.1rem" }}
        type="text"
        name="subreddit"
        id="subreddit-one"
        value={subreddit}
        autoFocus={true}
        onChange={changeSubreddit}
      />
      <Button
        onClick={handleSave}
        style={{
          height: "100%",
          backgroundColor: "#720298",
          padding: "15px",
          color: "#f5f5f5",
          borderColor: '#720298"',
        }}
      >
        Save it for later
      </Button>
    </div>
  );
}

export default SearchInput;
