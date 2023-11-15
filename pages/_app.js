import '../styles/globals.css';
import Layout from "../components/layout/Layout";
function MyAppa({ Component, pageProps }) {
  return <Layout>
    <Component {...pageProps} />
  </Layout>
}

export default MyAppa
