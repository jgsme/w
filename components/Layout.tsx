import type { FunctionComponent } from "preact";

export const Layout: FunctionComponent = ({ children }) => {
  return (
    <>
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-SJB62M7N1F"
      >
      </script>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-SJB62M7N1F');`,
        }}
      >
      </script>
      <div class="w-full bg-[#82221c] h-[4rem] py-[8px]">
        <a href="/" class="w-[4rem] h-[4rem]">
          <img src="/mark.svg" class="w-full h-full"></img>
        </a>
      </div>
      {children}
    </>
  );
};
