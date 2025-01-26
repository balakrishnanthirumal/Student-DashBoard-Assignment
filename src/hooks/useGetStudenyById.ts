import { useEffect, useState } from 'react';
import useShowToast from './useShowToast';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

const useGetUserProfileById = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [studentProfile, setStudentProfile] = useState(null);

  const getUserProfile = async (userId) => {
    setIsLoading(true);
    setStudentProfile(null);
    try {
      const userRef = await getDoc(doc(firestore, 'student', userId));
      if (userRef.exists()) {
        setStudentProfile(userRef.data());
        console.log(userRef.data());
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, studentProfile, getUserProfile };
};

export default useGetUserProfileById;
