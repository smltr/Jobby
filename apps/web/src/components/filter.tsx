import React, { useState, useCallback } from "react";
import { Box, Chip } from "@mui/material";

interface FilterProps {
  onFilter: (jobTypes: string[]) => void;
}

const jobTypes = [
  "Full Stack",
  "Back End",
  "Front End",
  "Data",
  "AI",
  "DevOps",
];

const Filter: React.FC<FilterProps> = ({ onFilter }) => {
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);

  const handleJobTypeToggle = useCallback((jobType: string) => {
    setSelectedJobTypes((prev) => {
      const newJobTypes = prev.includes(jobType)
        ? prev.filter((type) => type !== jobType)
        : [...prev, jobType];

      onFilter(newJobTypes);
      return newJobTypes;
    });
  }, [onFilter]);

  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ mb: 2 }}>
        {jobTypes.map((jobType) => (
          <Chip
            key={jobType}
            label={jobType}
            onClick={() => handleJobTypeToggle(jobType)}
            color={selectedJobTypes.includes(jobType) ? "primary" : "default"}
            sx={{ mr: 1, mb: 1 }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Filter;