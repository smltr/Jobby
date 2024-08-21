import { useState, useEffect } from "react";
import axios from "axios";

interface JobType {
  id: number;
  name: string;
}

export const useJobTypes = (): JobType[] => {
  const [jobTypes, setJobTypes] = useState<JobType[]>([]);

  useEffect(() => {
    const fetchJobTypes = async () => {
      try {
        const response = await axios.get<JobType[]>("/api/jobtypes");
        setJobTypes(response.data);
      } catch (error) {
        console.error("Failed to fetch job types:", error);
      }
    };
    fetchJobTypes();
  }, []);

  return jobTypes;
};