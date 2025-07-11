import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TonConnectUIProvider } from '@tonconnect/ui-react';

// TODO: figure out the problem with my icon in public/tonconnect-manifest.json 
// const manifestUrl = "https://api.jsonsilo.com/demo/d167cdd9-945a-492e-8118-0d4e7f1d3d50"
// const manifestUrl = "https://api.jsonsilo.com/demo/4ec761b9-80cb-40a6-b165-09141632ab55"
// const manifestUrl = "https://api.jsonsilo.com/demo/715785d1-4198-4b21-a4c2-9e8993e3b665"
// const manifestUrl = "https://api.jsonsilo.com/demo/38aead0a-7b9a-44b5-902b-9a78eafb4d6a"
// const manifestUrl = "https://markokhman.github.io/first_contract_front_end/tonconnect-manifest.json"
// const manifestUrl = "https://raw.githubusercontent.com/markokhman/func-course-chapter-5-code/master/public/manifest.json"
const manifestUrl = "https://raw.githubusercontent.com/dist0rti0n/ton_sandbox_dapp/gh-pages/tonconnect-manifest.json"
// const manifestUrl = "https://dist0rti0n.github.io/ton_sandbox_dapp/tonconnect-manifest.json";

createRoot(document.getElementById('root')!).render(
<TonConnectUIProvider manifestUrl={manifestUrl}>
      <App />
</TonConnectUIProvider>,

)
