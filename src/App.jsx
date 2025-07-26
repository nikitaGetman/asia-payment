import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { useSafeContract, useUsdtAllowance } from "./hooks";
import { getQueryParam, getReadableError } from "./utils";
import { useSwitchNetworkToSupported } from "./useSwitchNetworkToSupported";
import logo from "./assets/logo.svg";
import ok from "./assets/ok.svg";
import loader from "./assets/loader.svg";
import "./App.css";
import {isTrustWalletBrowser} from "./utils/isTrustWalletBrowser";

/* global BigInt */

const DECIMALS = 6;
const PERCENT_DEL = 1000;
function App() {
    const { isConnected, chain } = useAccount();
    const { connect, connectors } = useConnect();
    const [error, setError] = useState();

    const [amount, setAmount] = useState();
    const [amountWithFee, setAmountWithFee] = useState();
    const [fee, setFee] = useState();
    const [feePercent, setFeePercent] = useState();
    const [transactionId, setTransactionId] = useState();
    const [logs, setLogs] = useState([]);

    const amountBN = useMemo(
        () => BigInt(((amountWithFee || 0) * 10 ** DECIMALS).toFixed(0)),
        [amountWithFee]
    );

    const currency = "USDT";

    const pushLog = (type, message) =>
        setLogs(prev => [...prev, { type, message }]);

    useSwitchNetworkToSupported();
    useEffect(() => {
        const queryString = window.location.search;
        const props = getQueryParam(queryString, "props");

        if (props) {
            const parts = props.split(",");

            if (parts.length === 3) {
                const _txId = Number(parts[0]);
                const _amount = Number(parts[1]);
                const _fee = Number(parts[2]);

                if (_amount && _txId && !isNaN(_fee)) {
                    setTransactionId(_txId);
                    setAmountWithFee(_amount);
                    setFeePercent(_fee);

                    const _amountWithoutFee = parseFloat(
                        ((_amount * PERCENT_DEL) / (PERCENT_DEL + _fee)).toFixed(4)
                    );
                    setAmount(_amountWithoutFee);
                    const feeUsd = parseFloat((_amount - _amountWithoutFee).toFixed(4));
                    setFee(feeUsd);
                    return;
                }
            }
        }
        setError("Не удалось корректно загрузить страницу");
    }, []);

    const { approveMutation, hasApprove, allowanceRequest } = useUsdtAllowance(amountBN);

    const {
        deposit,
        depositTx,
        receipt: depositData,
        isLoading: isDepositLoading,
        isSuccess: isDepositSuccess,
        isError: isDepositError,
    } = useSafeContract();

    console.log("isDepositSuccess", isDepositSuccess, depositData);

    const isCompleted = useMemo(
        () => isDepositSuccess && depositData.data,
        [isDepositSuccess, depositData]
    );
    const isLoading = useMemo(
        () => approveMutation.isPending || approveMutation.isLoading || isDepositLoading,
        [approveMutation, isDepositLoading]
    );

    const sendConfirmationToBack = useCallback(() => {
        const url = `https://asia.cash/helpers/web3?tx=${transactionId}`;
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
            })
            .then((data) => {
                console.log("Confirmation request sent:", data);
            })
            .catch((error) => {
                setError(`Транзакция выполнена. ${error}`);
            });
    }, [transactionId]);

    useEffect(() => {
        if (isDepositSuccess) {
            sendConfirmationToBack();
        }
    }, [isDepositSuccess, sendConfirmationToBack]);

    useEffect(() => {
        if (isDepositError) {
            setError(getReadableError(depositData.error));
        }
    }, [isDepositError]);

    const tryConnect = useCallback(async (c) => {
        if (!c) return false;
        try {
            pushLog('INFO', 'Connection start');
            const provider = await c.getProvider?.();
            pushLog('INFO', 'Connection continued 1');
            if (!provider) {
                pushLog('ERROR', 'No provider');
                throw new Error("no provider");
            }
            pushLog('INFO', 'Connection continued 2');
            await connect({ connector: c });
            pushLog('INFO', 'Connection finished true');
            return true;
        } catch (e) {
            console.warn(`[connect fail] ${c.id}:`, e?.message || e);
            pushLog('ERROR', `Connection error: [connect fail] ${c.id}: ${e?.message || e}`);
            return false;
        }
    }, [connect]);

    const handleConnect = async () => {
        const byId = Object.fromEntries(connectors.map(c => [c.id, c]));

        if (isTrustWalletBrowser(pushLog)) {
            pushLog('INFO', 'Trust Wallet detected → deep link connect');
            await connect({ connector: byId.trustWallet });   // кастомный WC-коннектор
            return;
        }

        if (await tryConnect(byId.injected)) {
            pushLog('INFO', 'Injected wallet connected');
            return;
        }

        pushLog('INFO', 'Fallback to WalletConnect QR');
        await connect({ connector: byId.walletConnect });
    };

    const handleApprove = useCallback(() => {
        setError(undefined);
        approveMutation
            .mutateAsync(amountBN)
            .then(() => setTimeout(() => allowanceRequest.refetch(), 1000))
            .catch((err) => setError(getReadableError(err)));
    }, [amountBN, approveMutation, allowanceRequest]);

    const handleDeposit = useCallback(() => {
        setError(undefined);
        if (transactionId !== undefined && amountBN !== undefined && feePercent !== undefined) {
            deposit({
                id: BigInt(transactionId),
                amount: amountBN,
                fee: BigInt(feePercent),
            });
        }
    }, [deposit, transactionId, amountBN, feePercent]);

    const handleOpenScan = useCallback((hash) => {
        if (hash) {
            window.open(`https://polygonscan.com/tx/${hash}`, "_blank");
        }
    }, []);

    const handleCloseWindow = useCallback(() => {
        window.close();
    }, []);

    return (
        <div className="app">
            <header className="app__header">
                <img src={logo} alt="AsiA logo" />
            </header>

            <div className="app__body">
                <div className="app__info-wrapper">
                    <section className="app__info">
                        <div className="app__row">
                            <span className="app__label">Сумма сделки:</span>
                            <span className="app__value app__value--accent">
                                {amount} {currency}
                            </span>
                        </div>
                        <div className="app__row">
                            <span className="app__label">Комиссия сделки:</span>
                            <span className="app__value">
                                {fee} {currency}
                            </span>
                        </div>
                        <div className="app__row">
                            <span className="app__label">№ транзакции:</span>
                            <span className="app__value">{transactionId}</span>
                        </div>
                        <div className="app__row">
                            <span className="app__label">Сеть:</span>

                            <span
                                className={chain?.unsupported ? "app__value--error" : "app__value"}
                            >
                                {chain?.unsupported ? "Некорректная сеть" : chain?.name}
                            </span>
                        </div>
                        <div className="app__row">
                            <span className="app__label">Валюта к отправке:</span>
                            <span className="app__value">{currency}</span>
                        </div>
                    </section>

                    {!isCompleted ? (
                        <>
                            <div className="app__divider"></div>

                            {!isConnected ? (
                                <button className="app__action" onClick={handleConnect}>
                                    Подключить кошелек
                                </button>
                            ) : hasApprove ? (
                                <button className="app__action" onClick={handleDeposit}>
                                    {isDepositLoading ? <>Загрузка...</> : <>Внести депозит</>}
                                </button>
                            ) : (
                                <button className="app__action" onClick={handleApprove}>
                                    {allowanceRequest.isLoading || approveMutation.isPending ? (
                                        <>Загрузка...</>
                                    ) : (
                                        <>Разрешить использование {currency}</>
                                    )}
                                </button>
                            )}

                            <p className="app__text app__text--main">
                                На данной странице в целях безопасности мы замораживаем ваши
                                средства на смарт-контракте
                            </p>
                        </>
                    ) : null}
                </div>

                {Boolean(error) ? (
                    <p className="app__error">{error}</p>
                ) : isConnected ? (
                    <>
                        {isLoading ? (
                            <>
                                <div className="app__status">
                                    <div className="app__loader">
                                        <img
                                            src={loader}
                                            alt="Loader icon"
                                            className="app__loader-icon"
                                        />
                                    </div>
                                    <p className="app__subtext">Подтверждение транзакции</p>
                                </div>
                            </>
                        ) : null}
                        {isCompleted ? (
                            <>
                                <div className="app__status app__status--success">
                                    <img src={ok} alt="Success icon" />
                                    <p className="app__subtext">Успешно</p>
                                </div>
                            </>
                        ) : null}
                        {isLoading || isCompleted ? (
                            <p className="app__text app__text--down">
                                На данной странице в целях безопасности
                                <br />
                                мы замораживаем ваши средства <br />
                                на смарт-контракте
                            </p>
                        ) : null}
                    </>
                ) : null}

                {isCompleted ? (
                    <button className="app__action app__action--footer" onClick={handleCloseWindow}>
                        Можете закрыть данное окно
                    </button>
                ) : null}

                {depositData.data ? (
                    <div className="app__notification" onClick={() => handleOpenScan(depositTx)}>
                        <img src={ok} alt="Success icon" />
                        <div className="app__flex">
                            <div className="app__notification-label">Транзакция отправлена</div>
                            <div className="app__notification-text">
                                Нажмите для просмотра транзакции
                            </div>
                        </div>
                    </div>
                ) : null}

                <div className="app_logs">
                    <h3 className="app_logs_h3">LOGS</h3>
                    <div className="app_logs_body">
                        {logs.map((log, i) => (
                            <span
                                key={i}
                                className={`app_log app_log_${log.type.toLowerCase()}`}
                            >
                              [Type: {log.type}] {log.message}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
