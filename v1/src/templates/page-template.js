import Header from '../components/header';
import Footer from '../components/footer';
import { Helmet } from 'react-helmet-async';

export default function PageTemplate({ children, title }) {
  return (<>
    <Helmet>
      <meta charSet="utf-8" />
      {title &&
        <title>{title} | GameVentory</title>
      }
    </Helmet>
    <Header />
    <main 
      className="py-3 bg-light"
      style={{ flex: 1 }}
    >
      {children}
    </main>
    <Footer />
  </>)
}