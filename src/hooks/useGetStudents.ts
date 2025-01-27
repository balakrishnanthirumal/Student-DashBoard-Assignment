import { useCallback, useEffect, useState } from 'react';
import { createStudent } from 'src/store/studentSlice';
import { collection, getDocs, query } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';

import { firestore } from '../firebase/firebase';

const useGetStudents = () => {
  const [isLoading, setIsLoading] = useState(true);
  const students = useSelector((state: any) => state.student.students);
  const authUser = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();

  const getStudentList = useCallback(async () => {
    setIsLoading(true);

    try {
      const studentLists: any[] = []; // Declare locally inside the callback
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
  }, [dispatch]);

  useEffect(() => {
    if (authUser) {
      getStudentList();
    }
  }, [authUser, getStudentList]);

  return { isLoading, students, getStudentList };
};

export default useGetStudents;
