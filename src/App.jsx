import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useAccount, useConnect, useNetwork } from "wagmi";
import { useDeposit, useUsdtAllowance } from "./hooks";
import { getQueryParam, getReadableError } from "./utils";
import logo from "./assets/logo.svg";
import ok from "./assets/ok.svg";
import loader from "./assets/loader.svg";
import "./App.css";

/* global BigInt */

const DECIMALS = 6;
const PERCENT_DEL = 1000;
function App() {
    const { chain } = useNetwork();
    const { isConnected } = useAccount();
    const { connect, connectors } = useConnect();
    const [error, setError] = useState();

    const [amount, setAmount] = useState();
    const [fee, setFee] = useState();
    const [feePercent, setFeePercent] = useState();
    const [transactionId, setTransactionId] = useState();

    const amountBN = useMemo(() => BigInt((amount || 0) * 10 ** DECIMALS), [amount]);

    const network = "Polygon Chain";
    const currency = "USDT";

    useEffect(() => {
        const queryString = window.location.search;
        const props = getQueryParam(queryString, "props");
        const parts = props.split(",");

        if (parts.length === 3) {
            const _txId = Number(parts[0]);
            const _amount = Number(parts[1]);
            const _fee = Number(parts[2]);

            if (_amount && _txId && !isNaN(_fee)) {
                setTransactionId(_txId);
                setAmount(_amount);
                setFeePercent(_fee);
                const feeUsd = (_amount * _fee) / PERCENT_DEL;
                setFee(feeUsd);
                return;
            }
        }
        setError("Не удалось корректно загрузить страницу");
    }, []);

    const { approveMutation, hasApprove, allowanceRequest } = useUsdtAllowance(amountBN);

    const {
        mutateAsync: depositAsync,
        isLoading: isDepositLoading,
        data: depositData,
        isSuccess: isDepositSuccess,
    } = useDeposit();

    const isCompleted = useMemo(
        () => isDepositSuccess && depositData,
        [isDepositSuccess, depositData]
    );
    const isLoading = useMemo(
        () => approveMutation.isLoading || isDepositLoading,
        [approveMutation, isDepositLoading]
    );

    const handleConnect = useCallback(() => {
        setError(undefined);
        connect({ connector: connectors[0] });
    }, [connect, connectors]);

    const handleApprove = useCallback(() => {
        setError(undefined);
        approveMutation
            .mutateAsync(amountBN)
            .then(() => setTimeout(() => allowanceRequest.refetch(), 1000))
            .catch((err) => setError(getReadableError(err)));
    }, [amountBN, approveMutation]);

    const handleDeposit = useCallback(() => {
        setError(undefined);
        if (transactionId !== undefined && amountBN !== undefined && feePercent !== undefined) {
            depositAsync({
                tx: BigInt(transactionId),
                amount: amountBN,
                fee: BigInt(feePercent),
            }).catch((err) => setError(getReadableError(err)));
        }
    }, [depositAsync, transactionId, amountBN, feePercent]);

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

            <div className="app__text">
                {chain?.name} {chain?.id} {chain?.network} {chain?.unsupported}
            </div>

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
                            <span className="app__value">{network}</span>
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
                                    {allowanceRequest.isLoading || approveMutation.isLoading ? (
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

                {depositData ? (
                    <div className="app__notification" onClick={() => handleOpenScan(depositData)}>
                        <img src={ok} alt="Success icon" />
                        <div className="app__flex">
                            <div className="app__notification-label">Транзакция отправлена</div>
                            <div className="app__notification-text">
                                Нажмите для просмотра транзакции
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default App;
