import { useEffect, useState } from 'react';
import { createStudent } from 'src/store/studentSlice';
import { collection, getDocs, query } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { firestore } from '../firebase/firebase';
import toast from 'react-hot-toast';

const useGetStudents = () => {
  const [isLoading, setIsLoading] = useState(true);
  const students = useSelector((state) => state.student.students);
  const authUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  let studentLists;
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
