import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TonConnectUIProvider } from '@tonconnect/ui-react';

// TODO: figure out the problem with my icon in public/tonconnect-manifest.json 
//const manifestUrl = "https://api.jsonsilo.com/demo/715785d1-4198-4b21-a4c2-9e8993e3b665"
// const manifestUrl = "https://api.jsonsilo.com/demo/38aead0a-7b9a-44b5-902b-9a78eafb4d6a"
 const manifestUrl = "https://dist0rti0n.github.io/ton_sandbox_dapp/tonconnect-manifest.json";
// const manifestUrl = "https://raw.githubusercontent.com/markokhman/func-course-chapter-5-code/master/public/manifest.json";

createRoot(document.getElementById('root')!).render(
<TonConnectUIProvider manifestUrl={manifestUrl}>
      <App />
</TonConnectUIProvider>,

)
