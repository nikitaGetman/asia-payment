import { http, createConfig } from "wagmi";
import { polygon } from "wagmi/chains";
import { injected, metaMask } from "wagmi/connectors";

// const projectId = '<WALLETCONNECT_PROJECT_ID>'

declare module "wagmi" {
    interface Register {
        config: typeof config;
    }
}

// @ts-ignore
export const config = createConfig({
    chains: [polygon],
    connectors: [
        injected(),
        // walletConnect({ projectId }),
        metaMask(),
    ],
    transports: {
        [polygon.id]: http(),
    },
});
