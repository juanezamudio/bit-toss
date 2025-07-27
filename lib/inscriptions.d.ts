import * as ordinals from "micro-ordinals";
import * as psbt from "@scure/btc-signer/psbt";
export declare const CUSTOM_SCRIPTS: Array<typeof ordinals.OutOrdinalReveal>;
export declare const constructRevealTxInput: (programWasm: Uint8Array | string, pubKey: Uint8Array | string, privKey: Uint8Array | string) => psbt.TransactionInputUpdate;
