import Header from '../components/header';
import Footer from '../components/footer';

export default function PageTemplate({children}) {
  return (<>
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