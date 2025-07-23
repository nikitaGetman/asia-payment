import { useState, useCallback } from "react";
import {
    useAccount,
    useWriteContract,
    useReadContract,
    useSwitchChain,
    useWaitForTransactionReceipt,
    useConfig,
} from "wagmi";
import { waitForTransactionReceipt } from "wagmi/actions";
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
        hash: "0xb749451943b8c5c11cc6e01e5616238b2bf4e87d86a57f339ea1a43d07d36ca9",
        pollingInterval: 1_000,
        confirmations: 1,
    });
    console.log("approveReceipt", approveReceipt);

    const approveMutation = useMutation({
        mutationFn: async (_amount) => {
            console.log("approve", _amount, chain, chains, isConnected);
            if (!chain) {
                console.log("switch", chains[0]);
                const res = await switchChainAsync({ chainId: chains[0].id });
                console.log("res", res);
            }
            console.log("approving", usdtAddress, safeAddress, _amount);
            const tx = await write.writeContractAsync({
                abi: usdtABI,
                address: usdtAddress,
                functionName: "approve",
                args: [safeAddress, _amount],
            });
            console.log("tx", tx);
            setApproveTx(tx);
        },
        mutationKey: ["approve-mutation"],
        onSuccess: () => {
            queryClient.invalidateQueries([ALLOWANCE_REQUEST]);
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
