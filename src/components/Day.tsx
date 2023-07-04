import type { Component } from "solid-js";
import range from "ramda/es/range";
import { For } from "solid-js";
import { ExactDay } from "./ExactDay";

const Since = 2009;
const Now = new Date().getFullYear();
const diff = Now - Since;

export const Day: Component<{
  day: string;
  entry: { [year: string]: { id: string; title: string }[] };
}> = ({ entry, day }) => {
  return (
    <div
      class="grid"
      style={{ "grid-template-columns": `repeat(${diff}, 20px)` }}
    >
      <For each={range(0, diff)}>
        {(d) => {
          if (entry[Since + d]) {
            return (
              <a href={`/pages/${day}`}>
                <ExactDay
                  length={entry[Since + d].length}
                  day={`${Since + d}${day}`}
                ></ExactDay>
              </a>
            );
          }
          return <div></div>;
        }}
      </For>
    </div>
  );
};
