import "@/styles/globals.css";
import "@fontsource-variable/inter";

const App = ({ Component, pageProps, router }) => {
  return (
    <div style={{ fontFamily: "Inter Variable, sans-serif" }}>
      <Component key={router.pathname} {...pageProps} />
    </div>
  );
};

export default App;
