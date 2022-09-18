import { FunctionComponent } from "preact";
import type { Block, Node, Page } from "scrapbox-parser";
import { deco2style } from "../lib/deco2class.ts";
import { titlePurify } from "../lib/titlePurify.ts";

const nodeRender = (node: Node) => {
  switch (node.type) {
    case "plain":
      return node.text;
    case "hashTag": {
      return (
        <a
          href={`https://sbx.kbys.tk/pages/${titlePurify(node.href)}`}
          class="text-blue-500"
        >
          #{node.href}
        </a>
      );
    }
    case "link": {
      switch (node.pathType) {
        case "relative": {
          return (
            <a
              href={`https://sbx.kbys.tk/pages/${titlePurify(node.href)}`}
              class="text-blue-500"
            >
              {node.href}
            </a>
          );
        }
        case "root":
          return (
            <a
              href={`https://scrapbox.io${node.href}`}
              target="_blank"
              rel="noopener"
              class="text-blue-500"
            >
              {node.href}
            </a>
          );
        case "absolute": {
          // if (
          //   /^https:\/\/www\.youtube\.com/.test(node.href) ||
          //   /^https:\/\/youtu.be/.test(node.href)
          // ) {
          //   const video = videoParser.parse(node.href)
          //   return html`
          //     <amp-youtube
          //       data-videoid="${video.id}"
          //       layout="responsive"
          //       width="480"
          //       height="270"
          //     ></amp-youtube>
          //   `
          // }
          return (
            <a
              href={node.href}
              target="_blank"
              rel="noopener"
              class="text-blue-500 underline"
            >
              {node.content ? node.content : node.href}
            </a>
          );
        }
        default: {
          console.log(node);
          return "";
        }
      }
    }
    case "image":
      return (
        <div>
          <img src={node.src}></img>
        </div>
      );

    case "decoration":
      return (
        <span
          class={deco2style(node.rawDecos)}
        >
          {node.nodes.map(nodeRender)}
        </span>
      );
    case "code":
      return <code>{node.text}</code>;
    case "icon": {
      switch (node.pathType) {
        case "root": {
          if (node.path === "/icons/hr") {
            return <hr />;
          } else {
            console.log(node);
            return;
          }
        }
        default: {
          console.log(node);
          return;
        }
      }
    }
    case "quote": {
      return (
        <blockquote class="bg-black bg-opacity-[0.01] border-l-4 pl-[4px] py-[2px]">
          {node.nodes.map(nodeRender)}
        </blockquote>
      );
    }
    default: {
      console.log(node);
      return "";
    }
  }
};

const blockRender = (block: Block) => {
  switch (block.type) {
    case "line": {
      return (
        <div class={`pl-[${block.indent}rem] mb-[0.5rem]`}>
          {block.nodes.length > 0 ? block.nodes.map(nodeRender) : <br />}
        </div>
      );
    }
    case "codeBlock": {
      return (
        <div class={`pl-[${block.indent}rem] overflow-scroll`}>
          <code>{block.fileName}</code>
          <pre><code>{block.content}</code></pre>
        </div>
      );
    }
    default:
      console.log(block);
      return "";
  }
};

export const Render: FunctionComponent<{ page: Page }> = ({ page }) => {
  return <div>{page.map(blockRender)}</div>;
};
