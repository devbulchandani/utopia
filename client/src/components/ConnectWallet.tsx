import { useWallet } from "@aptos-labs/wallet-adapter-react";
// Internal Components
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Header } from "./wallets/Header";
import { WalletDetails } from "../components/wallets/WalletDetails";
import { NetworkInfo } from "../components/wallets/NetworkInfo";
import React from "react";
import { AccountInfo } from "./wallets/AccountInfo";
import { MessageBoard } from "./wallets/MessageBoard";
import { TransferAPT } from "./wallets/TransferAPT";
// import { AccountInfo } from "@/components/AccountInfo";
// import { TransferAPT } from "@/components/TransferAPT";

function AptosConnect() {
  const { connected } = useWallet();

  return (
    <>
    
      <Header />
      <div className="flex items-center justify-center flex-col">
        {connected ? (
          <Card>
            <CardContent className="flex flex-col gap-10 pt-6">
              {/* <WalletDetails />
              <NetworkInfo />
              <AccountInfo />
              <TransferAPT />
              <MessageBoard /> */}
            </CardContent>
          </Card>
        ) : (<></>
          // <CardHeader>
          //   <CardTitle>To get started Connect a wallet</CardTitle>
          // </CardHeader>
        )}
      </div>
    </>
  );
}

export default AptosConnect;
