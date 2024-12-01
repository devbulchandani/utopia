import './App.css'
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import LoginPage from './pages/sign-in';
import useRegisterUser from './hooks/useRegisterUser';

function App() {
  useRegisterUser();
  return (
    <header>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <LoginPage />
      </SignedOut>
    </header>
  )
}

export default App
