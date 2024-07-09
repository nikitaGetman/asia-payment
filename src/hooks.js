import {
    useAccount,
    useContract,
    useNetwork,
    useProvider,
    useSigner,
    useSwitchNetwork,
} from "wagmi";
import { safeABI, safeAddress, usdtABI, usdtAddress } from "./abi";
import { waitForTransaction } from "./utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useUsdtContract = () => {
    const { data: signer } = useSigner();
    const provider = useProvider();

    const contract = useContract({
        address: usdtAddress,
        abi: usdtABI,
        signerOrProvider: signer || provider,
    });

    const allowance = async (owner, spender) => {
        return contract.allowance(owner, spender);
    };
    const approve = async (spender, amount) => {
        const tx = await contract.approve(spender, amount);
        return waitForTransaction(tx);
    };

    return { allowance, approve, contract };
};
const useSafeContract = () => {
    const { data: signer } = useSigner();
    const provider = useProvider();

    const contract = useContract({
        address: safeAddress,
        abi: safeABI,
        signerOrProvider: signer || provider,
    });

    const deposit = async (id, amount, commission) => {
        const tx = await contract.deposit(id, amount, commission);
        return waitForTransaction(tx);
    };

    return { deposit, contract };
};

const ALLOWANCE_REQUEST = "allowance-request";
export const useUsdtAllowance = (amount) => {
    const { address, isConnected } = useAccount();
    const usdtContract = useUsdtContract();
    const queryClient = useQueryClient();
    const { chain } = useNetwork();
    const { chains, switchNetworkAsync } = useSwitchNetwork();

    const allowanceRequest = useQuery(
        [ALLOWANCE_REQUEST, amount.toString(), address],
        async () => await usdtContract.allowance(address, safeAddress),
        {
            enabled: Boolean(amount) && isConnected,
        }
    );

    const approveMutation = useMutation(
        ["approve-mutation"],
        async (_amount) => {
            if (isConnected && chain?.unsupported) {
                await switchNetworkAsync(chains[0].id);
            }
            return usdtContract.approve(safeAddress, _amount);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ALLOWANCE_REQUEST]);
            },
        }
    );

    const allowance = allowanceRequest.data;
    const hasApprove = allowanceRequest.isFetched && allowance >= amount;

    return {
        allowanceRequest,
        approveMutation,

        allowance,
        hasApprove,
        isLoading:
            allowanceRequest.isLoading ||
            allowanceRequest.isFetching ||
            allowanceRequest.isRefetching,
        isError: allowanceRequest.isError || allowanceRequest.isLoadingError,
    };
};

export const useDeposit = () => {
    const safeContract = useSafeContract();
    const { isConnected } = useAccount();
    const { chain } = useNetwork();
    const { chains, switchNetworkAsync } = useSwitchNetwork();

    return useMutation(["deposit-mutation"], async ({ tx, amount, fee }) => {
        if (isConnected && chain?.unsupported) {
            await switchNetworkAsync(chains[0].id);
        }
        return safeContract.deposit(tx, amount, fee);
    });
};
