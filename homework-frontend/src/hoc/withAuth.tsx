import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function withAuth<P extends JSX.IntrinsicAttributes>(
  WrappedComponent: React.ComponentType<P>,
) {
  return (props: P) => {
    const navigate = useNavigate();

    useEffect(() => {
      const user = localStorage.getItem('user');
      if (!user) {
        navigate('/login');
      }
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };
}
