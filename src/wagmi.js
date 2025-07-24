import { createConfig, http } from "wagmi";
import { polygon } from "wagmi/chains";
import { injected } from "@wagmi/connectors";

export const config = createConfig({
    autoConnect: true,
    chains: [polygon],
    connectors: [
        injected({
            target: "trustWallet",
            shimDisconnect: true,
            UNSTABLE_shimOnConnectSelectAccount: true,
        }),
        injected({
            target: "metaMask",
            shimDisconnect: true,
            UNSTABLE_shimOnConnectSelectAccount: true,
        }),
    ],
    transports: { [polygon.id]: http() },
});