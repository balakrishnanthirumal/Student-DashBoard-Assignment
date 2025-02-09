import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { FaRegEye } from 'react-icons/fa';
import { Label } from 'src/components/label';

// Define the type for studentprofile
interface StudentProfile {
  uid: string;
  name: string;
  class: string;
  section: string;
  rollNumber: string;
  email: string;
  dob: string;
  gender: string;
  phone: string;
  address: string;
}

// Define the props for the component
interface ViewModalProps {
  studentprofile: StudentProfile;
}

const ViewModal: React.FC<ViewModalProps> = ({ studentprofile }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        style={{ display: 'flex', marginBottom: 50 }}
      >
        <FaRegEye cursor="pointer" />
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
            Student Detail
          </Typography>
          <form>
            <Label>ID</Label>
            <TextField disabled value={studentprofile?.uid} fullWidth margin="normal" />
            <Label>Name</Label>
            <TextField disabled value={studentprofile?.name} fullWidth margin="normal" />
            <Label>Class</Label>
            <TextField disabled value={studentprofile?.class} fullWidth margin="normal" />
            <Label>Section</Label>
            <TextField disabled value={studentprofile?.section} fullWidth margin="normal" />
            <Label>Roll Number</Label>
            <TextField disabled value={studentprofile?.rollNumber} fullWidth margin="normal" />
            <Label>Email</Label>
            <TextField disabled value={studentprofile?.email} fullWidth margin="normal" />
            <Label>Date of Birth</Label>
            <TextField
              disabled
              type="date"
              value={studentprofile?.dob}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <Label>Gender</Label>
            <TextField disabled value={studentprofile?.gender} fullWidth margin="normal" />
            <Label>Phone Number</Label>
            <TextField disabled value={studentprofile?.phone} fullWidth margin="normal" />
            <Label>Address</Label>
            <TextField
              disabled
              value={studentprofile?.address}
              multiline
              rows={3}
              fullWidth
              margin="normal"
            />

            <Box sx={{ mt: 2 }}>
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

export default ViewModal;
