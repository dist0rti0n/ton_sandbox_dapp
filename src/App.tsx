import './App.css'
import { TonConnectButton } from '@tonconnect/ui-react'
import { useMainContract } from './hooks/useMainContract'
import { useTonConnect } from './hooks/useTonConnect';
import { fromNano, toNano } from '@ton/ton';
import React, { useState } from 'react';

// contract: kQAaH3_LwciIXtdeP6aO_26CBqIn9oMcxpx1iWGJ8C22NVbh

function App() {

  const { 
    owner,
    counter,
    latestSender, 
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

  return (
    <div className="App">
      <div className="top-right">
        <TonConnectButton />
      </div>
      <div>
        <div className='Card'>
          <b>Contract Address</b>
          <div className='Hint'>{contractAddress/*?.slice(0, 30) + "..."*/}</div>
          <b>Contract Balance</b>
          {contractBalance && (
          <div className='Hint'>{fromNano(contractBalance)}</div>
          )}
        </div>

        <div className='Card'>
          <b>Counter Value</b>
          <div>{counter ?? "Loading..."}</div>
        </div>

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
            <div>
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
                onClick={() => {
                  if (incrementAmount && !isNaN(Number(incrementAmount))) {
                    sendIncrement(parseInt(incrementAmount));
                  }
                }}
                className="action-button"
                style={{ cursor: 'pointer', marginLeft: 8 }}
              >
                Increment counter
              </button>
            </div>
          )}
          {connected && (
            <div>
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
                onClick={() => {
                  if (depositAmount && !isNaN(Number(depositAmount))) {
                    sendDeposit(depositAmount.toString());
                  }
                }}
                className="action-button"
                style={{ cursor: 'pointer', marginLeft: 8 }}
              >
                Request deposit
              </button>
            </div>
          )}
          {connected && (
            <div>
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
                onClick={() => {
                  if (withdrawAmount && !isNaN(Number(withdrawAmount))) {
                    sendWithdrawalRequst(withdrawAmount.toString());
                  }
                }}
                className="action-button"
                style={{ cursor: 'pointer', marginLeft: 8 }}
              >
                Request withdrawal
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
