export function isTrustWalletBrowser() {
    if (typeof navigator === 'undefined') return false;
    const ua = navigator.userAgent || '';
    return /trust\s?wallet/i.test(ua);
}