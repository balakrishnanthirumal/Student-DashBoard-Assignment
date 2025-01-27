import { doc, updateDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import toast from 'react-hot-toast';

import useGetUserProfileById from './useGetStudenyById';
import { firestore } from '../firebase/firebase';

const useEditProfile = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const authUser = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();
  const { isLoading, studentProfile, getUserProfile } = useGetUserProfileById();

  const editProfile = async (inputs: any) => {
    console.log(inputs);
    getUserProfile(inputs.uid);
    setIsUpdating(true);
    const userDocRef = doc(firestore, 'student', inputs.id);
    try {
      let updatedUser = {};
      updatedUser = {
        address: inputs.address || studentProfile?.address,
        class: inputs.class || studentProfile?.class,
        dob: inputs.class || studentProfile?.class,
        email: inputs.email || studentProfile?.email,
        name: inputs.name || studentProfile?.name,
        phone: inputs.phone || studentProfile?.phone,
        rollNumber: inputs.rollNumber || studentProfile?.rollNumber,
        section: inputs.section || studentProfile?.section,
      };

      toast.success('Updated Successfully');

      await updateDoc(userDocRef, updatedUser);
      localStorage.setItem('user-info', JSON.stringify(updatedUser));
    } catch (error) {
      console.log(error);
    }
  };
  return { editProfile, isUpdating };
};
export default useEditProfile;
