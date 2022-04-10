import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/header/Header'

function MyApp({ Component, pageProps }) {
  return <Header><Component {...pageProps} /></Header>
}

export default MyApp
