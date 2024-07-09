export function getQueryParam(queryString: string, paramName: string) {
    const pattern = new RegExp(`[?&]${paramName}=([^&]+)`);
    const match = queryString.match(pattern);
    if (match) {
        return match[1];
    }
    return null;
}

export function getReadableError(error: string) {
    const errorString = error.toString();
    if (errorString.includes("User rejected the request"))
        return "Транзакция отменена пользователем";

    if (errorString.includes("transfer amount exceeds balance"))
        return "Недостаточный баланс кошелька";

    console.warn("Unknown error: ", errorString);

    const message = errorString.split("\n")[0];
    return "Ошибка: " + message;
}
