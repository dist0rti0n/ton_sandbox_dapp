import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TonConnectUIProvider } from '@tonconnect/ui-react';


const manifestUrl = "https://dist0rti0n.github.io/ton_sandbox_dapp/tonconnect-manifest.json";

createRoot(document.getElementById('root')!).render(
<TonConnectUIProvider manifestUrl={manifestUrl}>
      <App />
</TonConnectUIProvider>,

)
