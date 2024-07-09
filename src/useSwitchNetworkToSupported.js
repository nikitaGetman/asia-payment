import { useEffect, useRef } from "react";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";

export const useSwitchNetworkToSupported = () => {
    const { isConnected } = useAccount();
    const { chain } = useNetwork();

    const { chains, switchNetworkAsync } = useSwitchNetwork();

    const isSwitchTried = useRef(false);

    //   Switch network if it is unsupported
    useEffect(() => {
        const handleSwitch = async () => {
            if (isConnected && chain?.unsupported) {
                if (switchNetworkAsync) {
                    isSwitchTried.current = true;
                    switchNetworkAsync(chains[0].id).catch((err) => console.warn(err));
                }
            }
        };

        if (!isSwitchTried.current) {
            handleSwitch();
        }
    }, [isConnected, chain, chains, switchNetworkAsync]);
};
