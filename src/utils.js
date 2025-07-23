export function getQueryParam(queryString, paramName) {
    const pattern = new RegExp(`[?&]${paramName}=([^&]+)`);
    const match = queryString.match(pattern);
    if (match) {
        return match[1];
    }
    return null;
}

export function getReadableError(error) {
    const errorString = error.toString();
    if (errorString.includes("rejected")) return "Транзакция отменена пользователем";

    if (errorString.includes("transfer amount exceeds balance"))
        return "Недостаточный баланс кошелька";

    if (errorString.includes("re-deposit")) return "Нельзя повторно внести депозит";

    if (errorString.includes("underlying network changed ")) return "Некорректная сеть";

    console.warn("Unknown error: ", errorString);

    return "Ошибка";
}
