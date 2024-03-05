import { useContext } from 'react';
import { ManagerContext } from '../providers/ManagerProvider';

// ----------------------------------------------------------------------

const useAuth = () => {
  const context = useContext(ManagerContext);

  if (!context) throw new Error('Auth context must be use inside AuthProvider');

  return context;
};

export default useAuth;
