import React, { useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import JobItem from "./jobitem";
import Posting from "./posting";

const PostJob: React.FC = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Posting>>({
    title: "",
    company: "",
    salaryStart: "",
    salaryEnd: "",
    jobType: "",
    country: "",
    jobLink: "",
    postedDate: new Date(Date.now()).toISOString(),
    companyUrl: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    let tempErrors: { [key: string]: string } = {};
    if (!formData.title) tempErrors.title = "Title is required";
    if (!formData.company) tempErrors.company = "Company is required";
    if (!formData.salaryStart)
      tempErrors.salaryStart = "Salary start is required";
    if (!formData.salaryEnd) tempErrors.salaryEnd = "Salary end is required";
    if (!formData.jobType) tempErrors.jobType = "Job type is required";
    if (!formData.country) tempErrors.country = "Country is required";
    if (!formData.jobLink) tempErrors.jobLink = "Job link is required";
    if (!formData.companyUrl) tempErrors.companyUrl = "Company URL is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const response = await axios.post("/api/postings", formData);
      setOpen(false);
      resetForm();
      setSnackbarMessage(`New job posted: ${response.data.title} at ${response.data.company}`);
      setSnackbarOpen(true);
    } catch (err) {
      alert("Failed to post job");
    }
  };

  const handleSnackbarClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      company: "",
      salaryStart: "",
      salaryEnd: "",
      jobType: "",
      country: "",
      jobLink: "",
      postedDate: new Date(Date.now()).toISOString(),
      companyUrl: "",
    });
    setErrors({});
  };

  const previewPosting: Posting = {
    ...formData,
    id: 0,
    salaryStart: formData.salaryStart || "0",
    salaryEnd: formData.salaryEnd || "0",
  } as Posting;

  return (
    <>
      <Button variant="contained" disableElevation color="primary" onClick={() => setOpen(true)}>
        Post a Job
      </Button>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          resetForm();
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Post a New Job</DialogTitle>
        <DialogContent>
          <Box mb={2}>
            <Typography variant="h6">Preview</Typography>
            <JobItem posting={previewPosting} isNew={false} isPreview={true}/>
          </Box>
          <form onSubmit={handleSubmit} noValidate>
            <TextField
              fullWidth
              margin="normal"
              name="title"
              label="Job Title"
              value={formData.title}
              onChange={handleChange}
              required
              error={!!errors.title}
              helperText={errors.title}
            />

            <TextField
              fullWidth
              margin="normal"
              name="jobLink"
              label="Job Posting Link"
              value={formData.jobLink}
              onChange={handleChange}
              required
              error={!!errors.jobLink}
              helperText={errors.jobLink}
            />
            <TextField
              fullWidth
              margin="normal"
              name="company"
              label="Company Name"
              value={formData.company}
              onChange={handleChange}
              required
              error={!!errors.company}
              helperText={errors.company}
            />
            <TextField
              fullWidth
              margin="normal"
              name="companyUrl"
              label="Company URL"
              value={formData.companyUrl}
              onChange={handleChange}
              required
              error={!!errors.companyUrl}
              helperText={errors.companyUrl}
            />
            <Box display="flex" justifyContent="space-between">
              <TextField
                margin="normal"
                name="salaryStart"
                label="Salary Start (in k)"
                type="number"
                inputProps={{ maxLength: 3 }}
                value={formData.salaryStart}
                onChange={handleChange}
                required
                error={!!errors.salaryStart}
                helperText={errors.salaryStart}
                style={{ flexBasis: "48%" }}
              />
              <TextField
                margin="normal"
                name="salaryEnd"
                label="Salary End (in k)"
                type="number"
                inputProps={{ maxLength: 3 }}
                value={formData.salaryEnd}
                onChange={handleChange}
                required
                error={!!errors.salaryEnd}
                helperText={errors.salaryEnd}
                style={{ flexBasis: "48%" }}
              />
            </Box>
            <TextField
              select
              fullWidth
              margin="normal"
              name="jobType"
              label="Job Type"
              value={formData.jobType}
              onChange={handleChange}
              required
              variant="outlined"
              error={!!errors.jobType}
              helperText={errors.jobType}
              SelectProps={{
                native: true,
              }}
            >
              <option value=""></option>
              <option value="Full Stack">Full Stack</option>
              <option value="Back End">Back End</option>
              <option value="Front End">Front End</option>
              <option value="Data">Data</option>
              <option value="AI">AI</option>
              <option value="DevOps">DevOps</option>
            </TextField>
            <TextField
              select
              fullWidth
              margin="normal"
              name="country"
              label="Country"
              value={formData.country}
              onChange={handleChange}
              required
              error={!!errors.country}
              helperText={errors.country}
              SelectProps={{
                native: true,
              }}
            >
              <option value=""></option>
              <option value="USA">USA</option>
              <option value="CAN">CAN</option>
              <option value="MEX">MEX</option>
            </TextField>
            
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              resetForm();
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Post Job
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default PostJob;
