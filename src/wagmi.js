import { createConfig, http } from 'wagmi';
import { polygon } from 'wagmi/chains';
import { injected } from '@wagmi/connectors';
import { walletConnect } from '@wagmi/connectors';
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
            showQrModal: !isTrust,
            metadata: {
                name: 'Asia.cash',
                description: 'Deposit dApp',
                url: 'https://asia.cash',
                icons: ['https://asia.cash/icon.png'],
            },
            onUri: (uri) => {
                if (isTrust) {
                    window.location.href =
                        `trust://wc?uri=${encodeURIComponent(uri)}`;
                }
            },
        }),
    ],
    transports: { [polygon.id]: http() },
});
