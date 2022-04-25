import Header from '../components/header';
import Footer from '../components/footer';

export default function PageTemplate({children}) {
  return (<>
    <Header />
    <main 
      className="py-3"
      style={{
        boxShadow: 'inset 0 0.5em 1.5em rgb(0 0 0 / 10%), inset 0 0.125em 0.5em rgb(0 0 0 / 15%)',
        flex: 1,
      }}
    >
      {children}
    </main>
    <Footer />
  </>)
}