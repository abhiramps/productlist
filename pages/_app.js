import Layout from '../components/Layout'
import '../styles/globals.css'
import enTranslations from '@shopify/polaris/locales/en.json';
import { AppProvider } from '@shopify/polaris';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <AppProvider i18n={enTranslations}>
        <Component {...pageProps} />
      </AppProvider>
    </Layout>
  )
}

export default MyApp
