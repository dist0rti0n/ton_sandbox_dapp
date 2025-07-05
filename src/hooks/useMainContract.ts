import { useEffect, useState } from "react";
import { Address } from "@ton/ton";
import type { OpenedContract } from "@ton/ton";
import { MainContract } from "../contracts/MainContract";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";
import { MAIN_CONTRACT_TESTNET_ADDRESS } from "../contracts/utils/ConstUtils";

export function useMainContract() {
  const client = useTonClient();
  const { sender } = useTonConnect();

  const sleep = (time: number) => 
    new Promise((resolve) => setTimeout(resolve, time));

  const [contractStorageData, setContractStorageData] = useState<null | {
    owner: Address;
    counter: number;
    latestSender: Address;
  }>();
  const [balance, setBalance] = useState<null | number>(0);

  const mainContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new MainContract(
      MAIN_CONTRACT_TESTNET_ADDRESS
    );
    return client.open(contract) as OpenedContract<MainContract>;
  }, [client]);

  useEffect(() => {
    async function getContractStorageData() {
      if (!mainContract) return;
      setContractStorageData(null);
      const val = await mainContract.getContractStorageData();
      const { balance } = await mainContract.getBalance();
      setContractStorageData({
        owner: val.owner,
        counter: val.counter,
        latestSender: val.latestSender,
      });
      setBalance(balance);
      await sleep(5000); // sleep for 5 seconds and poll contract data again
      getContractStorageData();
    }
    getContractStorageData();
  }, [mainContract]);

  return {
    contractAddress: mainContract?.address.toString(),
    contractBalance: balance,
    ...contractStorageData,
    sendIncrement: async (amount: number) => {
        return mainContract?.sendIncrementCounter(sender, "0.01", amount);
    },
    sendDeposit: async (amount: string) => {
      return mainContract?.sendDeposit(sender, amount);
    },
    sendWithdrawalRequst: async (amount: string) => {
      return mainContract?.sendWithdrawalRequest(sender, "0.01", amount);
    }
  };
}