import { createConfig, http } from 'wagmi';
import { polygon } from 'wagmi/chains';
import { injected } from '@wagmi/connectors';
import { walletConnect } from '@wagmi/connectors';
import { waitForInjected } from './waitForInjected';

export const config = createConfig({
    autoConnect: true,
    chains: [polygon],
    connectors: [
        // 💡 desktop + iOS Trust/MetaMask
        injected({
            getProvider: () => waitForInjected(),
            shimDisconnect: true,
        }),
        // 💡 mobile Trust/MetaMask через WalletConnect
        walletConnect({
            projectId: 'd90096cd353d0346d61bf6841872fc8c',
            metadata: {
                name: 'Asia.cash',
                description: 'Deposit dApp',
                url: 'https://asia.cash',
                icons: ['https://asia.cash/icon.png'],
            },
            showQrModal: true,
            qrModalOptions: {
                themeVariables: {
                    '--wcm-z-index': '2000',
                },
            },
        }),
    ],
    transports: { [polygon.id]: http() },
});
