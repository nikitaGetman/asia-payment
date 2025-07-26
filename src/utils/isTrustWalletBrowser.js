export function isTrustWalletBrowser(pushLog) {
    if (typeof window !== 'undefined') {
        const w = /** @type {any} */ (window);
        if (w.trustwallet) {
            pushLog && pushLog('INFO', 'Detected window.trustwallet');
            return true;
        }
        if (w.ethereum?.isTrust) {
            pushLog && pushLog('INFO', 'Detected ethereum.isTrust');
            return true;
        }
    }

    if (typeof navigator !== 'undefined') {
        const ua = navigator.userAgent || '';
        pushLog && pushLog('INFO', 'userAgent is: ' + ua);
        if (/trust\s?wallet/i.test(ua)) {
            pushLog && pushLog('INFO', 'Detected by UA');
            return true;
        }
    }

    pushLog && pushLog('INFO', 'Not TrustWallet');
    return false;
}