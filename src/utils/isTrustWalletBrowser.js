export function isTrustWalletBrowser(pushLog) {
    const log = (m) => pushLog?.("INFO", m);

    if (typeof window === "undefined") return false;
    const w = window;

    const eth = w.ethereum;

    // 1) Прямые флаги (старые версии / некоторые инъекции)
    if (eth?.isTrust || eth?.isTrustWallet || w.trustwallet) {
        log("Detected TrustWallet by direct flag");
        return true;
    }

    // 2) Мульти-провайдерная инъекция: window.ethereum.providers
    const tw =
        Array.isArray(eth?.providers)
            ? eth.providers.find((p) => p?.isTrust || p?.isTrustWallet)
            : undefined;

    if (tw) {
        // Важно: поднимаем Trust провайдер наверх ДО коннекта injected
        w.ethereum = tw;
        log("Detected Trust provider in ethereum.providers → promoted to window.ethereum");
        return true;
    }

    // 3) User-Agent fallback (in-app browser)
    const ua = navigator?.userAgent ?? "";
    if (/trust\s?wallet/i.test(ua)) {
        log("Detected TrustWallet by UA");
        return true;
    }

    return false;
}
