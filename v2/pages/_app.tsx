import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';
import '../components/footer.css';
import type { AppProps } from 'next/app'
import Layout from '../components/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
