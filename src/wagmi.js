import { createConfig, http } from 'wagmi';
import { polygon } from 'wagmi/chains';
import { injected } from '@wagmi/connectors';
import {waitForInjected} from "./waitForInjected";

export const config = createConfig({
    autoConnect: true,
    chains: [polygon],
    connectors: [
        // Trust Wallet
        injected({
            target: 'trustWallet',
            getProvider: () => waitForInjected(),           // ⬅️ новая строка
            shimDisconnect: true,
            UNSTABLE_shimOnConnectSelectAccount: true,
        }),

        // MetaMask
        injected({
            target: 'metaMask',
            getProvider: () => waitForInjected(),           // ⬅️ новая строка
            shimDisconnect: true,
            UNSTABLE_shimOnConnectSelectAccount: true,
        }),
    ],
    transports: { [polygon.id]: http() },
});
