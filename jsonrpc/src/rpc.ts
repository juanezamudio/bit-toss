import { BaseRpc } from '../../src.ts/base-rpc';

export class AlkanesRpc extends BaseRpc {
    constructor() {
        super({
            url: process.env.DAEMON_RPC_ADDR || 'http://bitcoind:18443',
            username: process.env.RPCUSER || 'bitcoinrpc',
            password: process.env.RPCPASSWORD || 'bitcoinrpc'
        });
    }

    async getblock(height: number) {
        return this._call({
            method: 'getblock',
            input: { height }
        });
    }

    async runesbyheight({ height }: { height: number }, blockTag?: string): Promise<{
        runes: Array<{
            runeId: string;
            name: string;
            divisibility: number;
            spacers: number;
            symbol: string;
        }>;
    }> {
        const response = await this._call({
            method: 'runesbyheight',
            input: { height }
        });
        return JSON.parse(response as string);
    }

    async gettransaction(txid: string) {
        return this._call({
            method: 'gettransaction',
            input: { txid }
        });
    }

    async sendrawtransaction(hexTx: string) {
        return this._call({
            method: 'sendrawtransaction',
            input: { hexTx }
        });
    }
}
