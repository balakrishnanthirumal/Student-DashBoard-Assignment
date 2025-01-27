import {
  doc,
  setDoc,
  serverTimestamp,
  collection,
  query,
  getDocs,
  where,
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useDispatch } from 'react-redux';

import { login } from '../store/authSlice';
import { auth, firestore } from '../firebase/firebase';

const useSignUpWithEmail = () => {
  const dispatch = useDispatch();
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const navigate = useNavigate();
  const signup = async (inputs: { email: string; password: string }) => {
    if (!inputs.email || !inputs.password) {
      toast.error('Please fill all the fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputs.email)) {
      toast.error('Please enter the valid email');
      return;
    }

    if (inputs.password.length < 6) {
      toast.error('Password must be atleast 6 characters');
      return;
    }

    const userRef = collection(firestore, 'user');
    const q = query(userRef, where('email', '==', inputs.email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      toast.error('User already exists');
      return;
    }

    try {
      const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);

      if (!newUser && error) {
        toast.error(error.message);
        return;
      }

      if (newUser) {
        const userDoc = {
          uid: newUser.user.uid,
          email: inputs.email,
        };

        await setDoc(doc(firestore, 'user', newUser.user.uid), userDoc);
        console.log('User document created successfully');

        dispatch(login(userDoc));
        navigate('/');
        toast.success('User created');

        localStorage.setItem('user-info', JSON.stringify(userDoc));
      }
    } catch (err) {
      toast(err?.message);
      console.log(error);
    }
  };

  return { loading, error, signup };
};

export default useSignUpWithEmail;
