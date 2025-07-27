const BLOCK_INTERVAL = 3000;

const timeout = async (n) => new Promise((resolve) => setTimeout(resolve, n));

const RPC_URL = process.env.RPC_URL || "http://localhost:18888";

let id = 0;

(async () => {
  while (true) {
    try {
      const response = await (
        await fetch(RPC_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jsonrpc: "2.0",
            method: "generatetoaddress",
            params: [1, "bcrt1qnsewazlmuvq708arz2gmpsecwtpfaazvwznppm"],
            id: id++,
          }),
        })
      ).json();
      console.log(response);
      console.log(response.result);
    } catch (e) {
      console.error(e);
    }
    await timeout(BLOCK_INTERVAL);
  }
})().catch((err) => console.error(err));
