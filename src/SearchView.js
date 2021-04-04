import React, { useState, useEffect } from "react";
import { Affix, Alert } from "antd";
import axios from "axios";
import ResultList from "./ResultList";
import SearchInput from "./SearchInput";

function SearchView({ setCurrentPost }) {
  const [data, setData] = useState({ result: [], after: null });
  const [subreddit, setSubreddit] = useState(null);
  const [error, setError] = useState(null);
  const [subredditsInLocalStorage, setSubredditsInLocalStorage] = useState([]);
  const [message, setMessage] = useState(null);

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
    }, 500);

    return () => {
      clearTimeout(setTimeoutId);
    };
  }, [subreddit]);

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
    if (!subreddit) {
      setError({ msg: "not sure what to save or search for..." });
      return;
    }

    if (localStorage.subreddits.includes(subreddit)) {
      setMessage({ msg: "Already saved.", type: "danger" });
      setTimeout(() => {
        setMessage(null);
      }, 1500);

      return;
    }

    if (localStorage.length) {
      // Push to existing local storage.
      let arrayOfSubredditNames = [];
      let existingArrayOfSubredditNames = JSON.parse(
        localStorage.getItem("subreddits")
      );
      arrayOfSubredditNames = [...existingArrayOfSubredditNames];
      arrayOfSubredditNames.push(subreddit);
      setSubredditsInLocalStorage(arrayOfSubredditNames);
      localStorage.setItem("subreddits", JSON.stringify(arrayOfSubredditNames));
      setMessage({ msg: "Saved.", type: "success" });
      setTimeout(() => {
        setMessage(null);
      }, 1500);
    } else {
      // Nothing is stored in local storage. Simply store this subreddit name.
      let arrayOfSubredditNames = [];
      arrayOfSubredditNames.push(subreddit);
      setSubredditsInLocalStorage(arrayOfSubredditNames);
      localStorage.setItem("subreddits", JSON.stringify(arrayOfSubredditNames));
      setMessage({ msg: "Saved.", type: "success" });
      setTimeout(() => {
        setMessage(null);
      }, 1500);
    }
  };

  return (
    <section id="result-list">
      {message ? <Alert type={message?.type} message={message?.msg} /> : null}
      <Affix>
        <div id="not-found-message">r/{error ? error.msg : subreddit}</div>
        <SearchInput
          subreddit={subreddit}
          handleSave={handleSave}
          changeSubreddit={changeSubreddit}
        />
        <select
          id="saved-search-options"
          onChange={changeSubreddit}
          name="subreddits"
        >
          <option disabled selected defaultValue={subreddit}>
            Choose from your saved list
          </option>

          {subredditsInLocalStorage &&
            subredditsInLocalStorage.map((each) => {
              return <option value={each}>{each}</option>;
            })}
        </select>
      </Affix>

      {data.result.length ? (
        <ResultList
          data={data.result}
          error={error}
          subreddit={subreddit}
          setCurrentPost={setCurrentPost}
          fetchMore={fetchMore}
        />
      ) : (
        <div style={{ padding: "10px", color: "grey" }}>
          Try searching for a subreddit or choosing from your saved list of
          subreddits.
        </div>
      )}
    </section>
  );
}

export default SearchView;
