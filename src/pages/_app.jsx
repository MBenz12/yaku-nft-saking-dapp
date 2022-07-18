import '../styles/style.scss'
import Wallet from '../components/wallet/Wallet'
import Header from '../components/Header'
import { ToastContainer } from 'react-toastify'
import PageLoading from '../components/PageLoading'
import { useState } from 'react'
import { Translation } from 'react-i18next'
import { useI18n } from "../services/i18n";

function StakingApp({ Component, pageProps }) {
  useI18n();
  const [loading, setLoading] = useState(false);
  const startLoading = () => setLoading(true);
  const closeLoading = () => setLoading(false);
  return (
    <Translation>{ t =>
      <Wallet>
        <Header />
        <Component
          {...pageProps}
          startLoading={startLoading}
          closeLoading={closeLoading}
          t={t}
        />
        <ToastContainer style={{ fontSize: 14 }} />
        <PageLoading loading={loading} />
      </Wallet>
    }</Translation>
  )
}

export default StakingApp
