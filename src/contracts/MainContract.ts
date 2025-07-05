import { Address, beginCell, Cell, contractAddress, SendMode, toNano } from "@ton/ton";
import type { Contract, ContractProvider, Sender } from "@ton/ton";
import { ContractConfig } from "./ContractConfig";
import { MethodName } from "./MethodName";
import { OperationCode } from "./enums/OperationCode";
import { buildDataCell } from "./utils/ContractUtils";
import { DEFAULT_WORKCHAIN } from "./utils/ConstUtils";

export class MainContract implements Contract {

    /*
    static MethodName = {
        BALANCE: "balance",
        GET_OWNER: "get_owner",
        GET_COUNTER: "get_counter",
        GET_LATEST_SENDER: "get_latest_sender",
        GET_CONTRACT_STORAGE_DATA: "get_contract_storage_data",
        GET_DUMP: "get_dump",
        KEK: "kek",
    };
    */


    constructor(
        readonly address: Address,
        readonly init?: {code: Cell, data: Cell}
    ) {}

    static createFromConfig(config: ContractConfig, code: Cell, workchain = DEFAULT_WORKCHAIN) {
        
        const data = buildDataCell(
            config.initialOwner,
            config.initialCounterValue,
            config.initialLatestSender,
        );
        const init = {code, data};
        const address = contractAddress(workchain, init);

        return new MainContract(address, init);

    }

    async sendInternalMessage(
        provider: ContractProvider,
        sender: Sender,
        tonValue: string,
        body: Cell = beginCell().endCell()
    ) {

        let value = toNano(tonValue);

        await provider.internal(sender, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body
        });
        
    }

    async sendDeploy(provider: ContractProvider, sender: Sender, tonValue: string) {

        this.sendInternalMessage(
            provider, 
            sender, 
            tonValue,
        );
    }

    async sendIncrementCounter(
        provider: ContractProvider,
        sender: Sender,
        tonValue: string,
        increment: number
    ) {

        const operationCode = OperationCode.INCREMENT_COUNTER;
        const messageBody = beginCell().storeUint(operationCode, 32).storeUint(increment, 32).endCell();
        await this.sendInternalMessage(provider, sender, tonValue, messageBody);

    }

    async sendDeposit(
        provider: ContractProvider,
        sender: Sender,
        tonValue: string
    ) {

        const operationCode = OperationCode.DEPOSIT;
        const messageBody = beginCell().storeUint(operationCode, 32).endCell();
        await this.sendInternalMessage(provider, sender, tonValue, messageBody);

    }

    async sendWithdrawalRequest(
        provider: ContractProvider,
        sender: Sender,
        tonValue: string,
        withdrawalAmount: string
    ) {

        const operationCode = OperationCode.WITHDRAW;
        const messageBody = beginCell().storeUint(operationCode, 32).storeCoins(toNano(withdrawalAmount)).endCell();
        await this.sendInternalMessage(provider, sender, tonValue, messageBody);

    }

    async sendDestroy(
        provider: ContractProvider,
        sender: Sender,
        tonValue: string
    ) {

        const operationCode = OperationCode.DESTROY;
        const messageBody = beginCell().storeUint(operationCode, 32).endCell();
        return this.sendInternalMessage(provider, sender, tonValue, messageBody);

    }

    async sendDepositWithNoOperationCode(
        provider: ContractProvider,
        sender: Sender,
        tonValue: string
    ) {

        const messageBody = beginCell().endCell();
        await this.sendInternalMessage(provider, sender, tonValue, messageBody);

    }

    async getBalance(provider: ContractProvider) {
        const {stack} = await provider.get(MethodName.BALANCE, []);
        return {
            balance: stack.readNumber()
        }
    }

    async getOwner(provider: ContractProvider) {
        const {stack} = await provider.get(MethodName.GET_OWNER, []);
        return {
            owner: stack.readAddress()
        }
    }
    
    async getCounter(provider: ContractProvider) {
        const {stack} = await provider.get(MethodName.GET_COUNTER, []);
        return {
            counter: stack.readNumber()
        }
    }

    async getLatestSender(provider: ContractProvider) {
        const {stack} = await provider.get(MethodName.GET_LATEST_SENDER, []);
        return {
            latestSender: stack.readAddress()
        }
    }

    async getContractStorageData(provider: ContractProvider) {
        const {stack} = await provider.get(MethodName.GET_CONTRACT_STORAGE_DATA, []);
        return {
            owner: stack.readAddress(),
            counter: stack.readNumber(),
            latestSender: stack.readAddress()
        }
    }

    async getDump(provider: ContractProvider) {
        const {stack} = await provider.get(MethodName.GET_DUMP, []);
        return {
            dump: stack.readCell()
        };
    }

    async getKek(provider: ContractProvider) {
        const {stack} = await provider.get(MethodName.KEK, []);
        return {
            kek: stack.readNumber()
        };
    }

    
}



