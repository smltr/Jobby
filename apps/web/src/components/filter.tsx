import React, { useState, useCallback } from "react";
import { Box, Chip } from "@mui/material";
import { useJobTypes } from "../hooks/useJobTypes"; // Import the hook

interface FilterProps {
  onFilter: (jobTypes: string[]) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilter }) => {
  const jobTypes = useJobTypes();
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
            key={jobType.id}
            label={jobType.name}
            onClick={() => handleJobTypeToggle(jobType.name)}
            color={selectedJobTypes.includes(jobType.name) ? "primary" : "default"}
            sx={{ mr: 1, mb: 1 }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Filter;