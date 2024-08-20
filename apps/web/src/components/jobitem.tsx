import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Chip from "@mui/material/Chip";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Posting from "./posting";


interface JobItemProps {
  posting: Posting;
  isNew: boolean;
  isPreview: boolean;
}

const JobItem: React.FC<JobItemProps> = ({ posting, isNew, isPreview }) => (
  <Box
    sx={{
      "&:hover": { backgroundColor: "#f0f0f0" },
      borderBottom: "1px solid #f2f2f2",
      backgroundColor: isNew ? "#FFFDE7" : "inherit",
      transition: "background-color 1s ease",
    }}
    pb={2}
    pt={2}
    pl={2}
  >
    <Box>
      <Box display="flex" justifyContent="left" alignItems="top" mb={0}>
        <Box flexBasis="5%" display="flex" alignItems="center" mr={{xs: 3, sm: 2}}>
          <img
            src={(posting.companyUrl.startsWith('http') ? posting.companyUrl : `https://${posting.companyUrl}`) + "/favicon.ico"}
            style={{ height: "24px" }}
          />
        </Box>
        <Box>
          <Typography variant="body1" sx={{ fontWeight: "500" }}>
            <Link href={posting.jobLink} target="_blank" rel="noopener noreferrer" underline="hover" color="inherit">
              {!isPreview ? posting.title : posting.title || "<job title>"}
            </Link>
          </Typography>
          <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} alignItems={{xs:"left", sm: "center"}}>
            <Typography variant="body2" color="textSecondary">
                {!isPreview ? posting.company : posting.company || "<company name>"}
            </Typography>
            <Typography variant="body2" color="text.disabled" ml={{xs: 0, sm: 2}}>
              {(() => {
                if (isPreview) {
                  return "Today"
                }
                const postedDate = new Date(posting.postedDate);
                const today = new Date();
                const diffTime = today.getTime() - postedDate.getTime();
                const diffDays = Math.floor(
                  diffTime / (1000 * 60 * 60 * 24),
                );

                if (diffDays === 0) return "Today";
                if (diffDays === 1) return "Yesterday";
                return `${diffDays} days ago`;
              })()}
            </Typography>
          </Box>
        </Box>

        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} flexGrow={1} justifyContent={{ xs: 'right', sm: 'right' }} pl={0}>
          <Box display="flex" justifyContent="right" alignItems="center" mr={0} mb={{ xs: 1, sm: 0 }}>
            <Chip
              label={`${posting.salaryStart}-${posting.salaryEnd}k`}
            />
          </Box>
          <Box display="flex" justifyContent="right" alignItems="center" ml={{ xs: 0, sm: 2 }}>
            <Chip label={!isPreview ? posting.jobType : posting.jobType || "<job type>"} />
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems={"bottom"}
        >
          <Box display="flex" alignItems="center" ml={2} mr={2}>
            <Typography variant="body2" color="text.disabled">
              {!isPreview ? posting.country : posting.country || "<location>"}
            </Typography>
            <LocationOnIcon fontSize="small" color="disabled" />
          </Box>
        </Box>
      </Box>
    </Box>
  </Box>
);

export default JobItem;