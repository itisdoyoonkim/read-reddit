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
        {/* <article>
        <h3>comments</h3>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae,
          amet atque porro pariatur at velit incidunt dolores earum, aliquam
          facilis explicabo obcaecati aspernatur, perferendis distinctio facere
          fugit quis quas tempore.
        </p>
      </article> */}
      </Affix>
    </section>
  );
}

export default Details;
