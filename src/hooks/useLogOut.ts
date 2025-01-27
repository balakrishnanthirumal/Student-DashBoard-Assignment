import { useSignOut } from 'react-firebase-hooks/auth';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

import { auth } from '../firebase/firebase';

import { logout } from '../store/authSlice';

const useLogOut = () => {
  const [signOut, loading, error] = useSignOut(auth);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await signOut();
      localStorage.removeItem('user-info');
      dispatch(logout());
      toast.success('Logged Out');
    } catch (err) {
      toast.error('Try again');
    }
  };
  return { handleLogout, loading, error };
};
export default useLogOut;
