function dbgAlert(tag, payload) {
    try {
        const txt =
            '[ALERT] ' +
            tag +
            ': ' +
            (typeof payload === 'string'
                ? payload
                : JSON.stringify(payload, null, 2));
        console.log(txt);
        alert(txt);
    } catch (_) {}
}

export function waitForInjected(timeout = 5_000) {
    console.log('[waitForInjected] start, timeout=', timeout);

    return new Promise((resolve) => {
        if (typeof window === 'undefined') {
            dbgAlert('waitForInjected', 'window undefined (SSR)');
            return resolve(undefined);
        }

        const w = /** @type {any} */ (window);

        const scan = () => {
            const providers = [
                ...(w.ethereum?.providers || []),
                w.ethereum,
                w.trustwallet,
            ].filter(Boolean);
            return providers[0];
        };

        /* 1) instant? */
        const immediate = scan();
        if (immediate) {
            dbgAlert('provider-instant', {
                isMetaMask: !!immediate.isMetaMask,
                isTrust: !!immediate.isTrust,
                isTrustWallet: !!immediate.isTrustWallet,
            });
            return resolve(immediate);
        }

        /* 2) MetaMask Mobile (Android) */
        w.addEventListener(
            'ethereum#initialized',
            () => {
                dbgAlert('event', 'ethereum#initialized');
                resolve(scan());
            },
            { once: true },
        );

        /* 3) EIP-6963 */
        w.addEventListener(
            'eip6963:announceProvider',
            (evt) => {
                dbgAlert('event', 'eip6963:announceProvider');
                resolve(evt.detail.provider);
            },
            { once: true },
        );

        /* 4) fallback */
        setTimeout(() => {
            dbgAlert('provider-timeout', 'no provider after ' + timeout + ' ms');
            resolve(scan());
        }, timeout);
    });
}
