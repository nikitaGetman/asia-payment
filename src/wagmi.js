import { createConfig, http } from 'wagmi';
import { polygon } from 'wagmi/chains';
import { injected } from '@wagmi/connectors';
import { walletConnect } from '@wagmi/connectors';
import { trustWallet } from '@wagmi/connectors';
import { waitForInjected } from './waitForInjected';
import { isTrustWalletBrowser } from './utils/isTrustWalletBrowser';

const isTrust = isTrustWalletBrowser();
const WC_PROJECT_ID = 'd90096cd353d0346d61bf6841872fc8c';

export const config = createConfig({
    autoConnect: true,
    chains: [polygon],
    connectors: [
        injected({
            getProvider: () => waitForInjected(),
            shimDisconnect: true,
        }),

        walletConnect({
            projectId: WC_PROJECT_ID,
            showQrModal: true,
            qrModalOptions: {
                enableExplorer: false,
                desktopWallets: [],
                mobileWallets: [
                    {
                        id: '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0',
                        name: 'Trust Wallet',
                        links: {
                            native: 'trust://',
                            universal: 'https://link.trustwallet.com',
                        },
                    },
                ],
                themeMode: 'dark',
            },
        })
    ],
    transports: {
        [polygon.id]: http('https://polygon-bor-rpc.publicnode.com', { batch: false }),
    },
});
