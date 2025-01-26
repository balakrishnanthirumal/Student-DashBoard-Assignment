import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { auth, firestore } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

  const loginIn = async (inputs: { email: string; password: string }) => {
    if (!inputs.email || !inputs.password) {
      toast.error('Please enter all the fields');
      return;
    }
    try {
      const userCreds = await signInWithEmailAndPassword(inputs.email, inputs.password);

      if (userCreds) {
        const docRef = doc(firestore, 'user', userCreds.user.uid);
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data());
        localStorage.setItem('user-info', JSON.stringify(docSnap.data()));
        dispatch(login(docSnap.data()));
        toast.success('Logged in');
        navigate('/');
      }
    } catch (error) {
      toast.error('Try again');
    }
  };
  return { loginIn, loading, error };
};
export default useLogin;
