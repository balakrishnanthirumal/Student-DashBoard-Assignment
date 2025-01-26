import { doc, deleteDoc } from 'firebase/firestore';
import { firestore } from 'src/firebase/firebase';
import useGetStudents from './useGetStudents';

const useDeleteStudent = () => {
  const { getStudentList } = useGetStudents();
  const deleteStudent = async (documentId: string) => {
    try {
      const docRef = doc(firestore, 'student', documentId);

      await deleteDoc(docRef);
      await getStudentList();
      console.log('Document deleted successfully');
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };
  return { deleteStudent };
};

export default useDeleteStudent;
