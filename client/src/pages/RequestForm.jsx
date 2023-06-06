import React, { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Box, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Container from '../components/common/Container';
import uiConfigs from '../configs/ui.configs';
import { toast } from 'react-toastify';
import userApi from '../api/modules/user.api';

const RequestForm = () => {
  const [onRequest, setOnRequest] = useState(false);


  const form = useFormik({
    initialValues: {
      subject: '',
      sender: '',
      recipient: '',
      content: '',
    },
    validationSchema: Yup.object({
      subject: Yup.string().required('Subject is required'),
      sender: Yup.string().email('Invalid email').required('Sender email is required'),
      recipient: Yup.string().email('Invalid email').required('Recipient email is required'),
      content: Yup.string().required('Content is required'),
    }),
    onSubmit: async (values) => {
      if (onRequest) return;
      setOnRequest(true);

      try {
        const response = await userApi.createMessage(values);
        console.log('Message created:', response);
        toast.success('Message sent successfully!');
      } catch (error) {
        console.error('Error creating message:', error);
        toast.error('Failed to send message. Please try again.');
      }

      setOnRequest(false);
    },
  });

  return (
    <Box sx={{ ...uiConfigs.style.mainContent, display: 'flex', justifyContent: 'center' }}>
      <Container header="Send report">
        <Box component="form" maxWidth="600px" onSubmit={form.handleSubmit}>
          <Stack spacing={2}>
            <TextField
              type="text"
              placeholder="Subject"
              name="subject"
              fullWidth
              value={form.values.subject}
              onChange={form.handleChange}
              color="success"
              error={form.touched.subject && form.errors.subject !== undefined}
              helperText={form.touched.subject && form.errors.subject}
              inputProps={{ style: { minWidth: '400px' } }}
            />
            <TextField
              type="email"
              placeholder="Sender Email"
              name="sender"
              fullWidth
              value={form.values.sender}
              onChange={form.handleChange}
              color="success"
              error={form.touched.sender && form.errors.sender !== undefined}
              helperText={form.touched.sender && form.errors.sender}
              inputProps={{ style: { minWidth: '400px' } }}
            />
            <TextField
              type="email"
              placeholder="Recipient Email"
              name="recipient"
              fullWidth
              value={form.values.recipient}
              onChange={form.handleChange}
              color="success"
              error={form.touched.recipient && form.errors.recipient !== undefined}
              helperText={form.touched.recipient && form.errors.recipient}
              inputProps={{ style: { minWidth: '400px' } }}
            />
            <TextField
              type="text"
              placeholder="Content"
              name="content"
              fullWidth
              value={form.values.content}
              onChange={form.handleChange}
              color="success"
              error={form.touched.content && form.errors.content !== undefined}
              helperText={form.touched.content && form.errors.content}
              inputProps={{ style: { minWidth: '400px' } }}
              multiline
              rows={4}
            />

            <LoadingButton
              type="submit"
              variant="contained"
              fullWidth
              sx={{ marginTop: 4 }}
              loading={onRequest}
            >
              Send Request
            </LoadingButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default RequestForm;
