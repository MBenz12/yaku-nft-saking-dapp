import '../styles/style.scss'
import Wallet from '../components/wallet/Wallet'
import Header from '../components/Header'
import { ToastContainer } from 'react-toastify'
import PageLoading from '../components/PageLoading'
import { useState, useContext, createContext } from 'react'
import { Translation } from 'react-i18next'
import { useI18n } from '../services/i18n';
import { templates } from '../configs';
import { useTheme } from '@mui/material/styles';
import ToggleColorMode from '../components/ToggleColorMode'

const ColorModeContext = createContext({ toggleColorMode: () => {} });
function StakingApp({ Component, pageProps }) {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  useI18n();
  const [loading, setLoading] = useState(false);
  const startLoading = () => setLoading(true);
  const closeLoading = () => setLoading(false);
  const { header } = templates;
  return (
    <ToggleColorMode>
      <Translation>{ t =>
        <Wallet>
          <Header t={t} {...header} theme={theme} colorMode={colorMode}/>
          <Component
            {...pageProps}
            startLoading={startLoading}
            closeLoading={closeLoading}
            t={t}
            theme={theme} colorMode={colorMode}
          />
          <ToastContainer style={{ fontSize: 14 }} />
          <PageLoading loading={loading} />
        </Wallet>
      }</Translation>
    </ToggleColorMode>
  )
}

export default StakingApp
