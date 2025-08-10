import { useEffect, useRef } from "react";
import { useAccount, useSwitchChain } from "wagmi";

export const useSwitchNetworkToSupported = () => {
    const { isConnected, chain } = useAccount();

    const { chains, switchChain } = useSwitchChain();

    const isSwitchTried = useRef(false);

    //   Switch network if it is unsupported
    useEffect(() => {
        const handleSwitch = async () => {
            if (isConnected && chain?.unsupported) {
                if (switchChain) {
                    isSwitchTried.current = true;
                    switchChain(chains[0].id).catch((err) => console.warn(err));
                }
            }
        };

        if (!isSwitchTried.current) {
            handleSwitch();
        }
    }, [isConnected, chain, chains, switchChain]);
};
