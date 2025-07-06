import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TonConnectUIProvider } from '@tonconnect/ui-react';


const manifestUrl = "https://dist0rti0n.github.io/ton_sandbox_dapp/tonconnect-manifest.json";
// const manifestUrl = "https://raw.githubusercontent.com/markokhman/func-course-chapter-5-code/master/public/manifest.json";

createRoot(document.getElementById('root')!).render(
<TonConnectUIProvider manifestUrl={manifestUrl}>
      <App />
</TonConnectUIProvider>,

)
