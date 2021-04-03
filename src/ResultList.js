import React from "react";
import { List, Tag, Tooltip } from "antd";
import { CommentOutlined, ExpandOutlined } from "@ant-design/icons";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./Loader";

function ResultList({ error, subreddit, data, setCurrentPost, fetchMore }) {
  const fetchDetail = async (permalink) => {
    try {
      const data = await axios.get(`https://www.reddit.com/${permalink}.json`);
      const result = data.data[0].data.children[0].data;
      setCurrentPost({ result });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <InfiniteScroll
      dataLength={data.length}
      next={fetchMore}
      hasMore={true}
      loader={<Loader />}
      endMessage={<p>No more to show</p>}
    >
      <List
        bordered
        dataSource={data}
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
    </InfiniteScroll>
  );
}

export default ResultList;
