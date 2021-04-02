import React, { useState, useEffect } from "react";
import { Input, Button } from "antd";
import axios from "axios";
// import { SearchOutlined } from "@ant-design/icons";
import ResultList from "./ResultList";
import SearchInput from "./SearchInput";

function SearchView({ setCurrentPost }) {
  const [data, setData] = useState({ result: [], after: null });
  const [subreddit, setSubreddit] = useState(null);
  const [error, setError] = useState(null);
  const [subredditsInLocalStorage, setSubredditsInLocalStorage] = useState([]);

  useEffect(() => {
    if (localStorage.length) {
      setSubredditsInLocalStorage(
        JSON.parse(localStorage.getItem("subreddits"))
      );
    }

    const setTimeoutId = setTimeout(() => {
      if (subreddit) {
        fetchFromSubreddit();
      }
    }, 1000);

    return () => {
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
    } catch (error) {
      console.log(error);
      setError({
        msg: "subreddit_not_found :(",
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

  const handleSave = () => {
    if (localStorage.length) {
      // push to existing data
      let arrayOfSubredditNames = [];
      let existingArrayOfSubredditNames = JSON.parse(
        localStorage.getItem("subreddits")
      );
      arrayOfSubredditNames = [...existingArrayOfSubredditNames];
      arrayOfSubredditNames.push(subreddit);
      setSubredditsInLocalStorage(arrayOfSubredditNames);
      localStorage.setItem("subreddits", JSON.stringify(arrayOfSubredditNames));
    } else {
      // simply store this subreddit name
      let arrayOfSubredditNames = [];
      arrayOfSubredditNames.push(subreddit);
      setSubredditsInLocalStorage(arrayOfSubredditNames);
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

      <SearchInput
        subreddit={subreddit}
        handleSave={handleSave}
        changeSubreddit={changeSubreddit}
      />
      <select
        onChange={changeSubreddit}
        name="subreddits"
        style={{ width: "100%" }}
      >
        <option disabled selected value>
          Choose from your saved list
        </option>

        {subredditsInLocalStorage &&
          subredditsInLocalStorage.map((each) => {
            return <option value={each}>{each}</option>;
          })}
      </select>

      <ResultList
        data={data.result}
        error={error}
        subreddit={subreddit}
        setCurrentPost={setCurrentPost}
      />
    </section>
  );
}

export default SearchView;
