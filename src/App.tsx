import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { useDeposit, useHasApprove, useSetApprove } from "./hooks";
import logo from "./logo.svg";
import ok from "./assets/ok.svg";
import loader from "./assets/loader.svg";
import "./App.css";
import { getQueryParam, getReadableError } from "./utils";

const DECIMALS = 6;
const PERCENT_DEL = 1000;
function App() {
    const { isConnected } = useAccount();
    const { connect, connectors } = useConnect();
    const [error, setError] = useState<string>();

    const [amount, setAmount] = useState<number>();
    const [fee, setFee] = useState<number>();
    const [transactionId, setTransactionId] = useState<number>();

    const amountBN = useMemo(() => BigInt((amount || 0) * 10 ** DECIMALS), [amount]);
    const feeBN = useMemo(() => BigInt((fee || 0) * 10 ** DECIMALS), [fee]);

    const network = "Polygon Chain";
    const currency = "USDT";

    useEffect(() => {
        const queryString = window.location.search;
        const _amount = Number(getQueryParam(queryString, "amount"));
        const _txId = Number(getQueryParam(queryString, "tx"));
        const _fee = Number(getQueryParam(queryString, "fee"));

        if (isNaN(_amount) || isNaN(_txId) || isNaN(_fee)) {
            setError("Не удалось корректно загрузить страницу");
        } else {
            const feeUsd = (_amount * _fee) / PERCENT_DEL;
            setAmount(_amount);
            setFee(feeUsd);
            setTransactionId(_txId);
        }
    }, []);

    const { hasApprove, isLoading: isApproveLoading } = useHasApprove(amountBN);
    const {
        approve,
        isLoading: isSetApproveLoading,
        result: approveResult,
        hash: approveHash,
    } = useSetApprove();
    const {
        deposit,
        isLoading: isDepositLoading,
        result: depositResult,
        hash: depositHash,
    } = useDeposit();

    const isCompleted = useMemo(
        () => depositResult.isSuccess && depositHash,
        [depositResult, depositHash]
    );
    const isLoading = useMemo(
        () => isApproveLoading || isSetApproveLoading || isDepositLoading,
        [isApproveLoading, isSetApproveLoading, isDepositLoading]
    );

    const handleConnect = useCallback(() => {
        setError(undefined);
        connect({ connector: connectors[0] });
    }, [connect, connectors]);

    const handleApprove = useCallback(() => {
        setError(undefined);
        approve(amountBN).catch((err: any) => setError(getReadableError(err)));
    }, [amountBN, approve]);

    const handleDeposit = useCallback(() => {
        setError(undefined);
        if (transactionId && amountBN && feeBN) {
            deposit(BigInt(transactionId), amountBN, feeBN).catch((err: any) =>
                setError(getReadableError(err))
            );
        }
    }, [deposit, transactionId, amountBN, feeBN]);

    const handleOpenScan = useCallback((hash?: string) => {
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
                                    Внести депозит
                                </button>
                            ) : (
                                <button className="app__action" onClick={handleApprove}>
                                    Разрешить использование {currency}
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
                ) : (
                    <>
                        {isLoading ? (
                            <>
                                <div className="app__status">
                                    <div className="app__loader">
                                        <img src={loader} alt="Loader icon" />
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
                )}

                {isCompleted ? (
                    <button className="app__action app__action--footer" onClick={handleCloseWindow}>
                        Можете закрыть данное окно
                    </button>
                ) : null}

                {(approveHash && approveResult.isLoading) ||
                (depositHash && depositResult.isLoading) ? (
                    <div
                        className="app__notification"
                        onClick={() => handleOpenScan(depositHash || approveHash)}
                    >
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
