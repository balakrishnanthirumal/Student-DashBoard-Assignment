import { TextField } from '@mui/material';
import { Box, Modal, Typography } from '@mui/material';
import { Button } from '@mui/material';
import { useState } from 'react';
import { FaRegEye } from 'react-icons/fa';
import { Label } from 'src/components/label';
const ViewModal = ({ studentprofile }) => {
  const [open, setOpen] = useState(false);
  console.log(studentprofile);
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
        <FaRegEye cursor={'pointer'} />
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
            <TextField disabled={true} value={studentprofile?.uid} fullWidth margin="normal" />
            <Label>Name</Label>
            <TextField disabled={true} value={studentprofile?.name} fullWidth margin="normal" />
            <Label>Class</Label>
            <TextField disabled={true} value={studentprofile?.class} fullWidth margin="normal" />
            <Label>Section</Label>
            <TextField disabled={true} value={studentprofile?.section} fullWidth margin="normal" />
            <Label>Roll Number</Label>
            <TextField
              disabled={true}
              value={studentprofile?.rollNumber}
              fullWidth
              margin="normal"
            />
            <Label>Email</Label>
            <TextField disabled={true} value={studentprofile?.email} fullWidth margin="normal" />
            <Label>Date of Birth</Label>
            <TextField
              disabled={true}
              type="date"
              value={studentprofile?.dob}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <Label>Gender</Label>
            <TextField
              disabled={true}
              value={studentprofile?.gender}
              fullWidth
              margin="normal"
            ></TextField>
            <Label> Phone Number</Label>
            <TextField disabled={true} value={studentprofile?.phone} fullWidth margin="normal" />
            <Label>Address</Label>
            <TextField
              disabled={true}
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
