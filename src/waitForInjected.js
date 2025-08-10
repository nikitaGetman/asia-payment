export async function waitForInjected(
    timeout = 3_000,
) {
    if (typeof window === 'undefined') return undefined;
    const w = window;

    const scan = () => {
        const providers = [
            ...(w.ethereum?.providers || []), // EIP-6963
            w.ethereum,
            w.trustwallet,                    // Trust Wallet legacy
        ].filter(Boolean);
        return providers.find(
            (p) => p.isMetaMask || p.isTrust || p.isTrustWallet,
        );
    };

    // 1) уже есть → возвращаем
    const immediate = scan();
    if (immediate) return immediate;

    // 2) MetaMask Mobile (Android) бросает событие
    const p = new Promise((resolve) =>
            w.addEventListener(
                'ethereum#initialized',
                () => resolve(scan()),
                { once: true },
            ),
    );

    // 3) EIP-6963 multi-wallet discovery
    w.addEventListener(
        'eip6963:announceProvider',
        (evt) => (evt.detail && p.then ? p.then(() => evt.detail.provider) : undefined),
        { once: true },
    );

    // 4) fallback-таймаут
    return Promise.race([
        p,
        new Promise((r) => setTimeout(() => r(scan()), timeout)),
    ]);
}