import { useEffect, useState } from 'react';
import { createStudent } from 'src/store/studentSlice';
import { collection, getDocs, query } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import { firestore } from '../firebase/firebase';

const useGetStudents = () => {
  const [isLoading, setIsLoading] = useState(true);
  const students = useSelector((state: any) => state.student.students);
  const authUser = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();
  let studentLists: any[];
  const getStudentList = async () => {
    setIsLoading(true);

    try {
      studentLists = [];
      const q = query(collection(firestore, 'student'));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        studentLists.push({ id: doc.id, ...doc.data() });
      });

      dispatch(createStudent(studentLists));
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (authUser) {
      getStudentList();
    }
  }, [authUser]);

  return { isLoading, students, getStudentList };
};

export default useGetStudents;
