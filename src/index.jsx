import React from "react";
import ReactDOM from "react-dom/client";
import { WagmiConfig } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { client } from "./config";
import App from "./App";
import "./index.css";
import "./assets/normalize.css";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <WagmiConfig client={client}>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </WagmiConfig>
    </React.StrictMode>
);
