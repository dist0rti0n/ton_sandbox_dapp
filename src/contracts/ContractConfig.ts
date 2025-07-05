import { Address } from "@ton/ton";
import { DEFAULT_OWNER_ADDRESS, ZERO_ADDRESS } from "./utils/ConstUtils";

export class ContractConfig {

    static default = new ContractConfig();

    constructor(
        readonly initialOwner: Address = DEFAULT_OWNER_ADDRESS,
        readonly initialCounterValue: number = 0,   
        readonly initialLatestSender: Address = ZERO_ADDRESS,
    ) {}

    static byInitialOwner(initialOwner: Address) {
        return new ContractConfig(initialOwner, 0, ZERO_ADDRESS);
    }

    static byInitialCounterValue(initialCounterValue: number) {
        return new ContractConfig(DEFAULT_OWNER_ADDRESS, initialCounterValue, ZERO_ADDRESS);
    }

    static byInitialLatestSenderAddress(initialLatestSender: Address) {
        return new ContractConfig(DEFAULT_OWNER_ADDRESS, 0, initialLatestSender);
    }
}