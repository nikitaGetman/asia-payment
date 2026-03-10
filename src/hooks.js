import { useState, useCallback, useEffect } from "react";
import {
    useAccount,
    useWriteContract,
    useReadContract,
    useSwitchChain,
    useWaitForTransactionReceipt,
} from "wagmi";
import { safeABI, safeAddress, usdtABI, usdtAddress } from "./abi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSafeContract = () => {
    const { chain } = useAccount();
    const { chains, switchChainAsync } = useSwitchChain();
    const { writeContractAsync } = useWriteContract();

    const [depositTx, setDepositTx] = useState();

    const receipt = useWaitForTransactionReceipt({ hash: depositTx });

    console.log("receipt", receipt);

    const deposit = useCallback(
        async ({ id, amount, fee }) => {
            if (!chain) {
                console.log("switch", chains[0]);
                const res = await switchChainAsync({ chainId: chains[0].id });
                console.log("res", res);
            }

            console.log("deposit", id, amount, fee);

            const tx = await writeContractAsync({
                abi: safeABI,
                address: safeAddress,
                functionName: "deposit",
                args: [id, amount, fee],
            });
            console.log("tx", tx);
            // const res = await waitForTransactionReceipt(config, {
            //     hash: tx,
            //     chainId: 137,
            // });
            // console.log("res", res);
            setDepositTx(tx);
        },
        [writeContractAsync]
    );

    return {
        deposit,
        depositTx,
        receipt,
        isSuccess: receipt.isSuccess,
        isLoading: receipt.isLoading,
        isError: receipt.isError,
    };
};

const ALLOWANCE_REQUEST = "allowance-request";
export const useUsdtAllowance = (amount) => {
    const { address, isConnected, chain } = useAccount();

    const write = useWriteContract();
    const allowanceRequest = useReadContract({
        abi: usdtABI,
        address: usdtAddress,
        functionName: "allowance",
        args: [address, safeAddress],
    });
    const queryClient = useQueryClient();
    const { chains, switchChainAsync } = useSwitchChain();
    const [approveTx, setApproveTx] = useState();

    const approveReceipt = useWaitForTransactionReceipt({
        hash: approveTx,
        pollingInterval: 1_000,
        confirmations: 1,
    });

    // После подтверждения approve в сети — обновляем allowance, чтобы кнопка сменилась
    useEffect(() => {
        if (approveReceipt.isSuccess) {
            allowanceRequest.refetch();
        }
    }, [approveReceipt.isSuccess, allowanceRequest.refetch]);

    const approveMutation = useMutation({
        mutationFn: async (_amount) => {
            if (!chain) {
                await switchChainAsync({ chainId: chains[0].id });
            }
            const tx = await write.writeContractAsync({
                abi: usdtABI,
                address: usdtAddress,
                functionName: "approve",
                args: [safeAddress, _amount],
            });
            setApproveTx(tx);
            return tx;
        },
        mutationKey: ["approve-mutation"],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [ALLOWANCE_REQUEST] });
        },
    });

    const allowance = allowanceRequest.data;
    const hasApprove = allowanceRequest.isFetched && allowance >= amount;

    return {
        allowanceRequest,
        approveMutation,
        approveReceipt,

        allowance,
        hasApprove,
        isLoading:
            allowanceRequest.isLoading ||
            allowanceRequest.isFetching ||
            allowanceRequest.isRefetching ||
            approveMutation.isPending,
        isError: allowanceRequest.isError || allowanceRequest.isLoadingError,
    };
};
