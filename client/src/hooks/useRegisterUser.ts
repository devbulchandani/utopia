import { useEffect } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';

const useRegisterUser = () => {
    const { user } = useUser();

    useEffect(() => {
        if (user) {
            fetch('http://localhost:4000/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    clerkId: user.id,
                    email: user.emailAddresses[0].emailAddress,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    walletId: user.web3Wallets[0]?.id,
                }),
            }).catch(err => console.error('Error registering user:', err));
        }
    }, [user]);
};

export default useRegisterUser;
