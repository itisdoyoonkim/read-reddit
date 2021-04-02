import React, { useState, useEffect } from "react";
import { List, Tag, Input, Tooltip, Button } from "antd";
import axios from "axios";
import {
  CommentOutlined,
  SearchOutlined,
  ExpandOutlined,
} from "@ant-design/icons";

function ResultList({ setCurrentPost }) {
  const [data, setData] = useState({ result: [], after: null });
  const [subreddit, setSubreddit] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      if (subreddit) {
        console.log("Fetching..now!");
        fetchFromSubreddit();
      }
    }, 1200);
    return () => {
      console.log("Clean up function invoked.");
      clearTimeout(setTimeoutId);
    };
  }, [subreddit]);

  // https://www.reddit.com/r/amcstock/.json?limit=30&after=t3_mhjf9n
  const fetchFromSubreddit = async (lastPostId) => {
    try {
      const fetchResult = await axios.get(
        `https://www.reddit.com/r/${subreddit}/.json?limit=15&after=${lastPostId}`
      );
      const results = fetchResult.data.data;
      setError(null);
      setData({
        result: [...data.result, ...results.children],
        after: results.after,
      });

      // }
    } catch (error) {
      console.log(error);
      setError({
        msg:
          "Please make sure you are looking for the subreddit that actually exists.",
      });
    }
  };

  const fetchMore = () => {
    fetchFromSubreddit(data.after);
  };

  const changeSubreddit = (e) => {
    setData({ result: [], after: null });
    setSubreddit(e.target.value);
  };

  const fetchDetail = async (permalink) => {
    try {
      const data = await axios.get(`https://www.reddit.com/${permalink}.json`);
      const result = data.data[0].data.children[0].data;
      setCurrentPost({ result });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = () => {
    if (localStorage.length) {
      // push to existing data
      let arrayOfSubredditNames = [];
      let existingArrayOfSubredditNames = JSON.parse(
        localStorage.getItem("subreddits")
      );
      arrayOfSubredditNames = [...existingArrayOfSubredditNames];
      arrayOfSubredditNames.push(subreddit);
      localStorage.setItem("subreddits", JSON.stringify(arrayOfSubredditNames));
    } else {
      // simply store this subreddit name
      let arrayOfSubredditNames = [];
      arrayOfSubredditNames.push(subreddit);
      localStorage.setItem("subreddits", JSON.stringify(arrayOfSubredditNames));
    }
  };

  return (
    <section id="result-list">
      <Button
        style={{
          width: "100%",
          backgroundColor: "#720298",
          color: "#f5f5f5",
          borderColor: "#720298",
        }}
        onClick={fetchMore}
      >
        Show more posts
      </Button>

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

      <label htmlFor="subreddits">Or choose from your saved subreddits</label>
      <select
        onChange={changeSubreddit}
        name="subreddits"
        style={{ width: "100%" }}
      >
        {JSON.parse(localStorage.getItem("subreddits")).map((each) => {
          return <option value={each}>{each}</option>;
        })}
      </select>

      <List
        header={
          <div style={{ color: "grey" }}>
            /r/{error ? "subreddit_not_found :(" : subreddit}
          </div>
        }
        bordered
        dataSource={data.result}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => fetchDetail(item.data.permalink)}
                >
                  {item.data.title}
                </span>
              }
              description={
                <>
                  <span style={{ paddingRight: "11px" }}>
                    {item.data.author}
                  </span>
                  <Tag color="#7261A3">
                    {item.data.num_comments} <CommentOutlined />
                  </Tag>

                  <Tooltip
                    title="View original post in a new tab"
                    color="#720298"
                  >
                    <Tag color="#720298">
                      <a
                        href={`https://www.reddit.com${item.data.permalink}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <ExpandOutlined />
                      </a>
                    </Tag>
                  </Tooltip>
                </>
              }
            />
          </List.Item>
        )}
      />
    </section>
  );
}

export default ResultList;
