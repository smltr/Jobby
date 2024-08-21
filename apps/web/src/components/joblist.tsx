import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Fade from "@mui/material/Fade";
import JobItem from "./jobitem";
import Posting from "./posting";

interface JobsProps {
  filters: {
    jobTypes: string[];
  };
}

const JobList: React.FC<JobsProps> = ({ filters }) => {
  const [postings, setPostings] = useState<Posting[]>([]);
  const [newPostingIds, setNewPostingIds] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchPostings = useCallback(async () => {
    setError(null);
    try {
      const response = await axios.get("/api/postings", {
        params: {
          jobTypes: filters.jobTypes,
          page: 1,
          limit: 20,
        },
      });
      setPostings(response.data.results);
    } catch (err) {
      setError("Failed to fetch postings");
    }
  }, [filters]);

  useEffect(() => {
    fetchPostings();
  }, [fetchPostings]);

  useEffect(() => {
    const eventSource = new EventSource('/api/postings/sse');
    eventSource.onmessage = (event) => {
      const newPosting = JSON.parse(event.data);
      setPostings(prevPostings => {
        // Check if the posting already exists
        if (!prevPostings.some(posting => posting.id === newPosting.id)) {
          return [newPosting, ...prevPostings];
        }
        return prevPostings;
      });
      setNewPostingIds(prevIds => [newPosting.id, ...prevIds]);

      // Remove highlighting after 5 seconds
      setTimeout(() => {
        setNewPostingIds(prevIds => prevIds.filter(id => id !== newPosting.id));
      }, 5000);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <Stack spacing={0}>
      {postings.map((posting) => (
        <Fade key={posting.id} in={true} timeout={1000}>
          <div>
            <JobItem
              posting={posting}
              isNew={newPostingIds.includes(posting.id)}
              isPreview={false}
            />
          </div>
        </Fade>
      ))}
    </Stack>
  );
};

export default JobList;