import { Address } from "@ton/ton";

// import dotenv from "dotenv";
// dotenv.config();

export const MAIN_CONTRACT_TESTNET_ADDRESS = Address.parse("kQAaH3_LwciIXtdeP6aO_26CBqIn9oMcxpx1iWGJ8C22NVbh");

export const ZERO_ADDRESS = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000");
// Sandbox wallet on iPhone 
export const MY_TESTNET_WALLET_ADDRESS: Address = Address.parse("0QBZqVHWs089LfAhCUITuk3Ak3dXMrhb5fCrd5_XV_Gd4DxW");
export const MY_MAINNET_DEV_WALLET_ADDRESS: Address = Address.parse("UQCNv7lhTYP9ApNps1UZZNvy8svgaMz55AC0jam5rMT7nnxf");
// distortion.ton
export const MY_MAINNET_REAL_WALLET_ADDRESS: Address = Address.parse("UQCY1T-7J0H5Wi5G84M-diw4gv5e1lS7fBXYTVmnXv6ouGVi");

export const DEFAULT_WORKCHAIN = 0;
export const IS_TESTNET = true // process.env.TESTNET ? true : false; // TODO: decide how to handle this with blueprint

export const DEFAULT_OWNER_ADDRESS = IS_TESTNET ? MY_TESTNET_WALLET_ADDRESS : MY_MAINNET_REAL_WALLET_ADDRESS;