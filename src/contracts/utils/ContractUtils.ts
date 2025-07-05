import { Address, beginCell } from "@ton/ton";
//import { hex } from "../build/main.compiled.json";


export function buildDataCell(initialOwner: Address, initialCounterValue: number, initialAddress: Address) {

    return beginCell()
        .storeAddress(initialOwner)
        .storeUint(initialCounterValue, 32)
        .storeAddress(initialAddress)
    .endCell();
}
