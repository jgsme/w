import { Component, createSignal, Show } from "solid-js";
import { Portal } from "solid-js/web";

export const ExactDay: Component<{ length: number; day: string }> = ({
  length,
  day,
}) => {
  const [isHover, setIsHover] = createSignal(false);
  return (
    <>
      <div
        class="w-[20px] h-[20px] flex justify-center items-center relative"
        style={{
          "background-color": `hsl(90, ${10 + 20 * length}%, 50%)`,
        }}
        onMouseOver={() => {
          setIsHover(true);
        }}
        onMouseOut={() => {
          setIsHover(false);
        }}
      >
        <div class="text-white">{length}</div>
        <Show when={isHover()}>
          <Portal mount={document.getElementById("portal")!}>
            <div>
              <a href={`/pages/${day}`}>{day}</a>
            </div>
          </Portal>
        </Show>
      </div>
    </>
  );
};
