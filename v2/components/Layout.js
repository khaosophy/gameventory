import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  return (<>
    {/* <Helmet>
      <meta charSet="utf-8" />
      {title &&
        <title>{title} | GameVentory</title>
      }
    </Helmet>*/}
    <Header />
    <main 
      className="py-3 bg-light"
      style={{ flex: 1 }}
    >
      { children }
    </main>
    <Footer />
  </>)
}