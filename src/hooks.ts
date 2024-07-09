import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { safeABI, safeAddress, usdtABI, usdtAddress } from "./abi";
import { useCallback, useMemo, useState } from "react";

export const useHasApprove = (amount: bigint) => {
    const { address } = useAccount();

    // @ts-ignore
    const result = useReadContract({
        abi: usdtABI,
        address: usdtAddress,
        functionName: "allowance",
        args: [address, safeAddress],
        refetchInterval: 1_000,
    });

    const allowance = result.data as bigint;
    const hasApprove = result.isFetched && allowance >= amount;

    return {
        allowance,
        hasApprove,
        isLoading: result.isLoading || result.isFetching || result.isRefetching,
        isError: result.isError || result.isLoadingError,
        refetch: result.refetch,
    };
};

export const useSetApprove = () => {
    const { writeContractAsync } = useWriteContract();
    const [hash, setHash] = useState<`0x${string}`>();

    const approve = useCallback(
        (amount: bigint) => {
            // @ts-ignore
            return writeContractAsync({
                abi: usdtABI,
                address: usdtAddress,
                functionName: "approve",
                args: [safeAddress, amount],
            }).then((hash: any) => setHash(hash));
        },
        [writeContractAsync]
    );

    const result = useWaitForTransactionReceipt({ hash, pollingInterval: 2_000 });
    const isLoading = result.isLoading || result.isFetching;

    return { approve, result, hash, isLoading };
};

export const useDeposit = () => {
    const { writeContractAsync } = useWriteContract();
    const [hash, setHash] = useState<`0x${string}`>();

    const deposit = useCallback(
        (id: bigint, amount: bigint, commission: bigint) => {
            // @ts-ignore
            return writeContractAsync({
                abi: safeABI,
                address: safeAddress,
                functionName: "deposit",
                args: [id, amount, commission],
            }).then((hash: any) => setHash(hash));
        },
        [writeContractAsync]
    );

    const result = useWaitForTransactionReceipt({ hash, pollingInterval: 2_000 });
    const isLoading = result.isLoading || result.isFetching;

    return { deposit, result, hash, isLoading };
};
