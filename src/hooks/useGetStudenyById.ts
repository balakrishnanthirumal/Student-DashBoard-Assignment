import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

type student = {
  uid: string;
  name: string;
  class: string;
  section: string;
  rollNumber: number;
  email: string;
  dob: string;
  gender: string;
  phone: number;
  address: string;
};

const useGetUserProfileById = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [studentProfile, setStudentProfile] = useState<any>();

  const getUserProfile = async (userId: any) => {
    setIsLoading(true);
    setStudentProfile(null);
    try {
      const userRef = await getDoc(doc(firestore, 'student', userId));
      if (userRef.exists()) {
        setStudentProfile(userRef.data());
        console.log(userRef.data());
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, studentProfile, getUserProfile };
};

export default useGetUserProfileById;
