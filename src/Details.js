import React from "react";
import { Affix } from "antd";

function Details({ currentPost }) {
  return (
    <section>
      <Affix>
        <article id="details">
          <iframe
            style={{ width: "100%" }}
            id="reddit-embed"
            title="details"
            src={`https://www.redditmedia.com${currentPost?.result?.permalink}?ref_source=embed&amp;ref=share&amp;embed=true&amp;theme=dark`}
            sandbox="allow-scripts allow-same-origin allow-popups"
            height="3253"
            width="640"
            scrolling="no"
          />
        </article>
      </Affix>
    </section>
  );
}

export default Details;
