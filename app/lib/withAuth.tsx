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

const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>,
  allowedRoles: string[]
) => {
  const WithAuthComponent = (props: P) => {
    const { user, isLoggedIn, logout }: AuthContext = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoggedIn || !allowedRoles.includes(user?.role as string)) {
        logout();
        router.push('/user/login');
      }
    }, [isLoggedIn, user]);

    return <WrappedComponent {...props} />;
  };

  WithAuthComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithAuthComponent;
};

export default withAuth;
