import { createConfig, http } from 'wagmi';
import { polygon } from 'wagmi/chains';
import { injected } from '@wagmi/connectors';
import { waitForInjected } from './waitForInjected';

function dbgAlert(tag, payload) {
    alert('[ALERT] ' + tag + ': ' + JSON.stringify(payload, null, 2));
}

export const config = createConfig({
    autoConnect: true,
    chains: [polygon],
    connectors: [
        injected({
            getProvider: () => {
                dbgAlert('getProvider', 'called');
                return waitForInjected();
            },
            shimDisconnect: true,
            UNSTABLE_shimOnConnectSelectAccount: true,
        }),
    ],
    transports: { [polygon.id]: http() },
});
