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
      {children}
    </>
  );
};
