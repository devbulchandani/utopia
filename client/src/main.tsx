import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ClerkProvider } from '@clerk/clerk-react';
import React from 'react';
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import {WrongNetworkAlert} from './components/wallets/WrongNetworkAlert';
// import { ToastViewport } from './components/ui/toast.tsx';

const PUBLISHABLE_KEY:string = 'pk_test_c3VwZXItZmFsY29uLTIwLmNsZXJrLmFjY291bnRzLmRldiQ';
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} >
    <AptosWalletAdapterProvider>
      <QueryClientProvider client={queryClient}>
        <App />
        <WrongNetworkAlert />
        {/* <ToastViewport /> */}
      </QueryClientProvider>
    </AptosWalletAdapterProvider>
    </ClerkProvider>

  </StrictMode>,
)
