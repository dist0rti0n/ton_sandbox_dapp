import './App.css'
import { TonConnectButton } from '@tonconnect/ui-react'
import { useMainContract } from './hooks/useMainContract'
import { useTonConnect } from './hooks/useTonConnect';
import { fromNano } from '@ton/ton';
import { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';



// contract: kQAaH3_LwciIXtdeP6aO_26CBqIn9oMcxpx1iWGJ8C22NVbh

function App() {

  const { 
    // owner,
    counter,
    // latestSender, 
    contractAddress, 
    contractBalance,
    sendIncrement,
    sendDeposit,
    sendWithdrawalRequst
  } = useMainContract();

  const { connected } = useTonConnect();
  const [incrementAmount, setIncrementAmount] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [copied, setCopied] = useState(false);
  const [lastIncrementAmount, setLastIncrementAmount] = useState('');

  useEffect(() => {
    if (counter !== undefined && counter !== null) {
      setLastIncrementAmount(counter.toString());
    }
  }, [counter]);

  const showAlert = () => {
    WebApp.showAlert("Hey there!");
  };

  const handleCopyAddress = () => {
    if (contractAddress) {
      navigator.clipboard.writeText(contractAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  };

  return (
    <div className="App">
      <div className="top-right">
        <TonConnectButton />
      </div>
      <div>
        <div className='Card'>
          <div className="info-box">
  <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
    <b>Contract Address</b>
    {copied && (
      <span style={{ color: "#7ee787", fontSize: "0.7em" }}>
        Copied!
      </span>
    )}
  </div>
  <div
    className="Hint monospace"
    style={{ cursor: 'pointer', userSelect: 'none' }}
    onClick={handleCopyAddress}
    title="Click to copy"
  >
    {contractAddress}
  </div>
</div>
<div className="info-box">
  <b>Contract Balance</b>
  <div className="Hint monospace" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    {contractBalance === undefined || contractBalance === null ? (
      <span className="loader" />
    ) : (
      fromNano(contractBalance)
    )}
  </div>
</div>
<div className="info-box">
  <b>Counter Value</b>
  <div
    className="Hint monospace"
    style={{ 
      display: 'flex',
       alignItems: 'center',
      gap: lastIncrementAmount ? '4px' : '0px' }}
  >
    {counter !== undefined && counter !== null ? (
      counter
    ) : (
      <>
        <span>{lastIncrementAmount}</span>
        <span className="loader" />
      </>
    )}
  </div>
</div>
        </div>

        <button
                onClick={e => {
                  e.currentTarget.blur();
                  showAlert();
                }}
                className="action-button"
                style={{ cursor: 'pointer'}}
              >
                Show alert
              </button>

        <br/>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '18px',
            marginTop: '24px',
            marginBottom: '24px',
          }}
        >
          {connected && (
  <div className="action-row">
    <input
      type="number"
      min="0"
      step="any"
      inputMode="decimal"
      pattern="[0-9]*[.,]?[0-9]*"
      placeholder="Increment"
      value={incrementAmount}
      onChange={e => {
        const val = e.target.value.replace(/[^0-9.,]/g, '');
        const parts = val.split(/[.,]/);
        let filtered = parts[0];
        if (parts.length > 1) {
          filtered += '.' + parts.slice(1).join('');
        }
        setIncrementAmount(filtered);
      }}
      className="pretty-input"
    />
    <button
      onClick={e => {
        e.currentTarget.blur();
        if (incrementAmount && !isNaN(Number(incrementAmount))) {
          sendIncrement(parseInt(incrementAmount));
        }
      }}
      className="action-button"
      style={{ cursor: 'pointer' }}
    >
      Increment counter
    </button>
  </div>
)}
{connected && (
  <div className="action-row">
    <input
      type="number"
      min="0"
      step="any"
      inputMode="decimal"
      pattern="[0-9]*[.,]?[0-9]*"
      placeholder="TON"
      value={depositAmount}
      onChange={e => {
        const val = e.target.value.replace(/[^0-9.,]/g, '');
        const parts = val.split(/[.,]/);
        let filtered = parts[0];
        if (parts.length > 1) {
          filtered += '.' + parts.slice(1).join('');
        }
        setDepositAmount(filtered);
      }}
      className="pretty-input"
    />
    <button
      onClick={e => {
        e.currentTarget.blur();
        if (depositAmount && !isNaN(Number(depositAmount))) {
          sendDeposit(depositAmount.toString());
        }
      }}
      className="action-button"
      style={{ cursor: 'pointer' }}
    >
      Request deposit
    </button>
  </div>
)}
{connected && (
  <div className="action-row">
    <input
      type="number"
      min="0"
      step="any"
      inputMode="decimal"
      pattern="[0-9]*[.,]?[0-9]*"
      placeholder="TON"
      value={withdrawAmount}
      onChange={e => {
        const val = e.target.value.replace(/[^0-9.,]/g, '');
        const parts = val.split(/[.,]/);
        let filtered = parts[0];
        if (parts.length > 1) {
          filtered += '.' + parts.slice(1).join('');
        }
        setWithdrawAmount(filtered);
      }}
      className="pretty-input"
    />
    <button
      onClick={e => {
        e.currentTarget.blur();
        if (withdrawAmount && !isNaN(Number(withdrawAmount))) {
          sendWithdrawalRequst(withdrawAmount.toString());
        }
      }}
      className="action-button"
      style={{ cursor: 'pointer' }}
    >
      Request withdrawal
    </button>
  </div>
)}
        </div>
      </div>
      <div className="platform-bottom-right">
        Platform: {WebApp.platform} {WebApp.version}
      </div>
    </div>
  )
}

export default App
