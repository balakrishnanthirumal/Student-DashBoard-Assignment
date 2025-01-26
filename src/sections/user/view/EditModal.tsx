import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, MenuItem } from '@mui/material';
import toast from 'react-hot-toast';
import useEditProfile from 'src/hooks/useEditStudent';
import { FaRegEdit } from 'react-icons/fa';
import useGetStudents from 'src/hooks/useGetStudents';

const EditModal = ({ userid, studentprofile }) => {
  const [open, setOpen] = useState(false);
  const { isUpdating, editProfile } = useEditProfile();
  const { getStudentList } = useGetStudents();
  console.log(studentprofile);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    class: '',
    section: '',
    rollNumber: '',
    email: '',
    dob: '',
    gender: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
  });

  const handleOpen = () => {
    setOpen(true);
    setFormData({
      id: studentprofile?.id || '',
      name: studentprofile?.name || '',
      class: studentprofile?.class || '',
      section: studentprofile?.section || '',
      rollNumber: studentprofile?.rollNumber || '',
      email: studentprofile?.email || '',
      dob: studentprofile?.dob || '',
      gender: studentprofile?.gender || '',
      phone: studentprofile?.phone || '',
      address: studentprofile?.address || '',
    });
  };
  const handleClose = () => {
    setOpen(false);
    setFormData({
      id: '',
      name: '',
      class: '',
      section: '',
      rollNumber: '',
      email: '',
      dob: '',
      gender: '',
      phone: '',
      address: '',
    });
  };

  const validate = () => {
    let isValid = true;

    if (!formData.id) {
      toast.error('ID is required');
      isValid = false;
    }
    if (!formData.name || !/^[A-Za-z\s]+$/.test(formData.name)) {
      toast.error('Name must be a valid string containing only alphabets');
      isValid = false;
    }
    if (!formData.class) {
      toast.error('Class is required');
      isValid = false;
    }
    if (!formData.section || !/^[A-Za-z]+$/.test(formData.section)) {
      toast.error('Section must be a valid string containing only alphabets');
      isValid = false;
    }
    if (!formData.rollNumber || !/^\d+$/.test(formData.rollNumber)) {
      toast.error('Roll Number must contain only numbers');
      isValid = false;
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('Enter a valid Email');
      isValid = false;
    }
    if (!formData.dob) {
      toast.error('Date of Birth is required');
      isValid = false;
    }
    if (!formData.gender) {
      toast.error('Gender is required');
      isValid = false;
    }
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
      toast.error('Phone number must contain exactly 10 digits');
      isValid = false;
    }
    if (!formData.address || typeof formData.address !== 'string') {
      toast.error('Address must be a valid string');
      isValid = false;
    }

    return isValid;
  };

  const handleChange = (e: React.FormEvent) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form Submitted:', formData);
      await editProfile({ ...formData });
      await getStudentList();
      toast.success('Student updated successfully');
      handleClose();
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        style={{ display: 'flex', marginBottom: 50 }}
      >
        <FaRegEdit />
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            maxHeight: '80vh',
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            overflowY: 'auto',
          }}
        >
          <Typography id="modal-title" variant="h6" gutterBottom>
            Edit Detail
          </Typography>
          <form onSubmit={handleEdit}>
            <TextField
              label="ID"
              name="id"
              value={formData?.id}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Name"
              name="name"
              value={formData?.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Class"
              name="class"
              value={formData?.class}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Section"
              name="section"
              value={formData?.section}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Roll Number"
              name="rollNumber"
              value={formData?.rollNumber}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              value={formData?.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Date of Birth"
              name="dob"
              type="date"
              value={formData?.dob}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Gender"
              name="gender"
              select
              value={formData?.gender}
              onChange={handleChange}
              fullWidth
              margin="normal"
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
            <TextField
              label="Phone Number"
              name="phone"
              value={studentprofile?.phone}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Address"
              name="address"
              value={studentprofile?.address}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
              margin="normal"
            />

            <Box sx={{ mt: 2 }}>
              <Button variant="contained" color="primary" type="submit">
                {isUpdating ? 'Updating...' : 'Submit'}
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleClose} sx={{ ml: 2 }}>
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default EditModal;
