"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decipherPacked = exports.pack = exports.tryDecodeVarInt = exports.decodeVarInt = exports.decipher = exports.fromBuffer = exports.toBuffer = exports.encipher = exports.encodeVarInt = exports.u128ToBuffer = exports.toHexString = exports.fromUint128 = exports.toUint128 = exports.leftPad8 = exports.leftPad16 = exports.rightPadByte = exports.leftPadByte = exports.leftPad15 = exports.unpack = exports.toProtobufAlkaneTransfer = void 0;
const seekbuffer_js_1 = require("./seekbuffer.js");
const alkanes_1 = require("./proto/alkanes");
function toProtobufAlkaneTransfer(v) {
    return new alkanes_1.alkanes.AlkaneTransfer({
        id: new alkanes_1.alkanes.AlkaneId({
            block: toUint128(v.id.block),
            tx: toUint128(v.id.tx),
        }),
        value: toUint128(v.value),
    });
}
exports.toProtobufAlkaneTransfer = toProtobufAlkaneTransfer;
function unpack(v) {
    return Array.from(v)
        .reduce((r, v, i) => {
        if (i % 15 === 0) {
            r.push([]);
        }
        r[r.length - 1].push(v);
        return r;
    }, [])
        .map((v) => BigInt("0x" + Buffer.from(v.reverse()).toString("hex")));
}
exports.unpack = unpack;
function leftPad15(v) {
    if (v.length > 30)
        throw Error("varint in encoding cannot exceed 15 bytes");
    return "0".repeat(30 - v.length) + v;
}
exports.leftPad15 = leftPad15;
function leftPadByte(v) {
    if (v.length % 2) {
        return "0" + v;
    }
    return v;
}
exports.leftPadByte = leftPadByte;
function rightPadByte(v) {
    if (v.length % 2) {
        return v + "0";
    }
    return v;
}
exports.rightPadByte = rightPadByte;
function leftPad16(v) {
    if (v.length > 16)
        throw Error("varint in encoding cannot exceed 15 bytes");
    return "0".repeat(32 - v.length) + v;
}
exports.leftPad16 = leftPad16;
function leftPad8(v) {
    //  if (v.length > 16) throw Error("varint in encoding cannot exceed 15 bytes");
    return "0".repeat(16 - v.length) + v;
}
exports.leftPad8 = leftPad8;
function toUint128(v) {
    let hex = leftPad16(v.toString(16));
    return new alkanes_1.alkanes.uint128({
        hi: BigInt("0x" + hex.substr(0, 16)).toString(10),
        lo: BigInt("0x" + hex.substr(16, 32)).toString(10),
    });
}
exports.toUint128 = toUint128;
function fromUint128(v) {
    return u128ToBuffer(v);
}
exports.fromUint128 = fromUint128;
function toHexString(v) {
    return BigInt(v).toString(16);
}
exports.toHexString = toHexString;
function u128ToBuffer(v) {
    return BigInt("0x" +
        Buffer.from(leftPad8(toHexString(v.hi)) + leftPad8(toHexString(v.lo)), "hex").toString("hex"));
}
exports.u128ToBuffer = u128ToBuffer;
function encodeVarInt(value) {
    const v = [];
    while (value >> 7n > 0n) {
        v.push(Number(value & 0xffn) | 128);
        value = BigInt(value >> 7n);
    }
    v.push(Number(value & 0xffn));
    return Buffer.from(v);
}
exports.encodeVarInt = encodeVarInt;
function encipher(values) {
    return Buffer.concat(values.map((v) => encodeVarInt(v)));
}
exports.encipher = encipher;
const toBuffer = (v) => {
    return Buffer.from(Array.from(Buffer.from(leftPad16(v.toString(16)), "hex")).reverse());
};
exports.toBuffer = toBuffer;
const fromBuffer = (v) => {
    return BigInt("0x" + Buffer.from(Array.from(v).reverse()).toString("hex"));
};
exports.fromBuffer = fromBuffer;
function decipher(values) {
    let seekBuffer = new seekbuffer_js_1.SeekBuffer(values);
    let v = null;
    const result = [];
    while ((v = decodeVarInt(seekBuffer)) !== BigInt(-1)) {
        result.push(v);
    }
    return result;
}
exports.decipher = decipher;
function decodeVarInt(seekBuffer) {
    try {
        return tryDecodeVarInt(seekBuffer);
    }
    catch (e) {
        return BigInt(-1);
    }
}
exports.decodeVarInt = decodeVarInt;
function tryDecodeVarInt(seekBuffer) {
    let result = BigInt(0);
    for (let i = 0; i <= 18; i++) {
        const byte = seekBuffer.readUInt8();
        if (byte === undefined) {
            throw new Error("Unterminated");
        }
        const value = BigInt(byte) & 127n;
        if (i === 18 && (value & 124n) !== 0n) {
            throw new Error("Overflow");
        }
        result = BigInt(result | (value << BigInt(7 * i)));
        if ((byte & 128) === 0) {
            return result;
        }
    }
    throw new Error("Overlong");
}
exports.tryDecodeVarInt = tryDecodeVarInt;
function pack(v) {
    return Buffer.concat(v.map((segment) => {
        return Buffer.from(leftPad15(Buffer.from(Array.from(Buffer.from(leftPadByte(segment.toString(16)), "hex")).reverse()).toString("hex")), "hex");
    }));
}
exports.pack = pack;
function decipherPacked(v) {
    return decipher(Buffer.concat(v.map((v) => Buffer.from(Array.from(Buffer.from(leftPadByte(v.toString(16)), 'hex')).reverse()))));
}
exports.decipherPacked = decipherPacked;
//# sourceMappingURL=bytes.js.map