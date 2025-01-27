import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Typography,
  Button,
} from '@mui/material';
import { useSelector } from 'react-redux';
import useGetStudents from 'src/hooks/useGetStudents';

import { MdOutlineDelete } from 'react-icons/md';
import useGetUserProfileById from 'src/hooks/useGetStudenyById';
import useDeleteStudent from 'src/hooks/useDeleteStudent';
import toast from 'react-hot-toast';
import EditModal from './EditModal';

import AddStudentModal from '../AddStudentModal';

import ViewModal from './ViewModal';

const ExampleTable = () => {
  const students = useSelector((state: any) => state.student.students);
  console.log(students);
  const { isLoading } = useGetStudents();
  const { studentProfile: studentDetail, getUserProfile } = useGetUserProfileById();
  const { deleteStudent } = useDeleteStudent();
  const handleView = (userId: string) => {
    getUserProfile(userId);
    console.log(studentProfile);
  };

  const studentProfile: any = studentDetail;
  const handleDelete = async (userId: any) => {
    await deleteStudent(userId);
    alert('DO YOU WANT TO DELETE');
    toast.success('Deleted Successfully');
  };

  if (isLoading) return <Typography variant="h2">Loading.....</Typography>;

  return (
    <>
      <div>
        <Typography variant="h3" sx={{ mt: 5, mb: 5, ml: 10 }}>
          Manage Students
        </Typography>

        <AddStudentModal />

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Class</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Roll Number</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students?.map((student: any, index: any) => (
                <TableRow key={index}>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.rollNumber}</TableCell>
                  <TableCell align="right" sx={{ gap: 5, display: 'flex', alignItems: 'center' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ display: 'flex', marginBottom: 50 }}
                      onClick={() => handleDelete(student.id)}
                    >
                      <MdOutlineDelete />
                    </Button>
                    <div>
                      <EditModal userid={student.uid} studentprofile={student} />
                    </div>
                    <Button onClick={(e) => handleView(student.id)}>
                      <ViewModal studentprofile={studentProfile} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default ExampleTable;
