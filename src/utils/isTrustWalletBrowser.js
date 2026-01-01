export function isTrustWalletBrowser(pushLog) {
    const log = (m) => pushLog?.('INFO', m);

    if (typeof window === 'undefined') return false;
    const w = window;

    // 1) Новые версии: провайдер лежит в массиве window.ethereum.providers
    const pickProvider = (eth) =>
        Array.isArray(eth?.providers)
            ? eth.providers.find((p) => p.isTrust || p.isTrustWallet)
            : undefined;

    const eth = w.ethereum;

    // direct flags (старые версии / расширение)
    if (eth?.isTrust || eth?.isTrustWallet || w.trustwallet) {
        log('Detected ethereum.isTrust*');
        return true;
    }

    // multi-provider injection
    const tw = pickProvider(eth);
    if (tw) {
        w.ethereum = tw;              // «прокидываем» Trust-провайдер наверх
        log('Detected Trust provider in ethereum.providers');
        return true;
    }

    // fallback по user-agent
    const ua = navigator?.userAgent ?? '';
    if (/trust\s?wallet/i.test(ua)) {
        log('Detected by UA');
        return true;
    }

    log('Not TrustWallet');
    return false;
}