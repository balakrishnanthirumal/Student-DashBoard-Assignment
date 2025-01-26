import { doc, setDoc, collection, query, getDocs, where } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

import { useDispatch } from 'react-redux';
import { createStudent } from 'src/store/studentSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useGetStudents from './useGetStudents';

const useAddStudents = () => {
  const dispatch = useDispatch();
  const { getStudentList } = useGetStudents();
  export const interface student {
    id: string;
    name: string;
    class: string;
    section: string;
    rollNumber: number;
    email: string;
    dob: Date;
    gender: string;
    phone: number;
    address: string;
    password: string;
    confirmPassword: string;
  }
  const addStudent = async (inputs: student) => {
    const userRef = collection(firestore, 'student');
    const q = query(userRef, where('rollNumber', '==', inputs.rollNumber));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      toast.error('student with this email already exists');
      return;
    }

    try {
      const newUser = inputs;

      if (newUser) {
        let userDoc;

        userDoc = {
          uid: newUser.id,
          email: inputs.email,
          name: inputs.name,
          class: inputs.class,
          section: inputs.section,
          rollNumber: inputs.rollNumber,
          dob: inputs.dob,
          gender: inputs.gender,
          phone: inputs.phone,
          address: inputs.address,
        };

        await setDoc(doc(firestore, 'student', newUser.id), userDoc);
        console.log('User document created successfully');

        dispatch(createStudent(userDoc));
        await getStudentList();
        toast.success('Student created');
      }
    } catch (err) {
      toast(err?.message);
    }
  };

  return { addStudent };
};

export default useAddStudents;
