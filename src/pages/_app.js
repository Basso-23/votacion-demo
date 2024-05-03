import "@/styles/globals.css";

const App = ({ Component, pageProps, router }) => {
  return <Component key={router.pathname} {...pageProps} />;
};

export default App;
