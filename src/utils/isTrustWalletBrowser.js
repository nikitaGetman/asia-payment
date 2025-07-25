export function isTrustWalletBrowser(pushLog) {
    if (typeof navigator === 'undefined') {
        if (pushLog) {
            pushLog("ERROR", "Navigating is undefined");
        }
        return false
    };
    const ua = navigator.userAgent || '';
    if (pushLog) {
        pushLog("INFO", "userAgent is: " + ua);
    }
    return /trust\s?wallet/i.test(ua);
}