import { useEffect, ComponentType } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/auth-context';

interface User {
  role: string;
}

interface AuthContext {
  user: User | null;
  isLoggedIn: boolean;
  logout: () => void;
}

const withAuth = (WrappedComponent: ComponentType<any>, allowedRoles: string[]) => {
  return (props: any) => {
    const { user, isLoggedIn, logout }: AuthContext = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoggedIn || !allowedRoles.includes(user?.role as string)) {
        logout();
        router.push('/user/login');
      }
    }, [isLoggedIn, user]);

    if (!isLoggedIn || !allowedRoles.includes(user?.role as string)) {
      logout();
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;