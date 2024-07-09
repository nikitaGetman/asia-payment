import { Logger } from "ethers/lib/utils";

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
    if (errorString.includes("User rejected")) return "Транзакция отменена пользователем";

    if (errorString.includes("transfer amount exceeds balance"))
        return "Недостаточный баланс кошелька";

    if (errorString.includes("You cannot re-deposit!")) return "Нельзя повторно внести депозит";

    console.warn("Unknown error: ", errorString);

    const message = errorString.split("\n")[0];
    return "Ошибка: " + message;
}

export const waitForTransaction = async (tx) => {
    try {
        await tx.wait();
        return tx.hash;
    } catch (error) {
        if (error.code === Logger.errors.TRANSACTION_REPLACED && !error.cancelled) {
            return error?.replacement?.hash || "";
        }
        throw error;
    }
};
