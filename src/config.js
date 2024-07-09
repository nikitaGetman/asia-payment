// import { http, createConfig } from "wagmi";
// import { polygon } from "wagmi/chains";
// import { injected, metaMask } from "wagmi/connectors";

// export const config = createConfig({
//     chains: [polygon],
//     connectors: [
//         injected(),
//         // walletConnect({ projectId }),
//         metaMask(),
//     ],
//     transports: {
//         [polygon.id]: http(),
//     },
// });

import { configureChains, createClient } from "wagmi";
import { polygon } from "wagmi/chains";
// import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { InjectedConnector } from "wagmi/connectors/injected";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider, webSocketProvider } = configureChains([polygon], [publicProvider()], {
    pollingInterval: 4_000, // default
});

// export const metamaskConnector = new MetaMaskConnector({
//     chains,
//     options: {
//         shimDisconnect: true,
//         UNSTABLE_shimOnConnectSelectAccount: true,
//     },
// });

export const injectedConnector = new InjectedConnector({
    chains,
    options: {
        shimDisconnect: true,
        UNSTABLE_shimOnConnectSelectAccount: true,
    },
});

const client = createClient({
    autoConnect: true,
    // autoConnect: process.env.NODE_ENV !== 'production',
    connectors: [injectedConnector],
    provider,
    webSocketProvider,
});

export { chains, client };
