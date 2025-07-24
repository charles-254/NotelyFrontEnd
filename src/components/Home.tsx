import {
  Stack,
  Alert,
  Pagination,
  Card,
  CardActionArea,
  CardContent,
  CardActions,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
  TextField,
  Menu,
  MenuItem,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../apis/axios";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { IoMdMore } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate()
  const { isLoading, data } = useQuery({
    queryKey: ["get-trashed-notes"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/notes/");
      return response.data;
    },
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const open = Boolean(anchorEl);
  const ITEMS_PER_PAGE = 9;

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, noteId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedNoteId(noteId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedNoteId(null);
  };

  const filteredNotes = data?.filter((note: any) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const totalPages = Math.ceil(filteredNotes.length / ITEMS_PER_PAGE);

  const publicNotes = filteredNotes.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  function formatNoteDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInSeconds < 60) return `${diffInSeconds} sec ago`;
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    if (diffInDays === 1) return "yesterday";
    if (diffInDays < 2) return `${diffInDays} days ago`;

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }).format(date);
  }

  if (isLoading) {
    return (
      <Stack alignItems="center" mt={4}>
        <Typography>Loading...</Typography>
      </Stack>
    );
  }

  return (
    <Stack direction="row">
      <Sidebar />
      <Stack flex={1} p={2} mb={"3rem"} mt={'1rem'}>
        <Typography variant="h4" fontWeight={600} textAlign="center" color="primary.main" gutterBottom>
  Public Notes Library
</Typography>
<Typography variant="body2" color="text.secondary" textAlign="center" mb={2}>
  Search and read notes published by users across various topics and interests.
</Typography>

        <TextField
          label="Search by title"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          sx={inputStyles}
        />

        {publicNotes.length === 0 ? (
          <Stack alignItems="center" justifyContent="center" flex={1} mt={4}>
            <Alert severity="info">
              No notes matched your search. Try different keywords.
            </Alert>
          </Stack>
        ) : (
          <>
            <Stack
              direction="row"
              flexWrap="wrap"
              gap={2}
              justifyContent="center"
              alignItems="flex-start"
              
            >
              {publicNotes.map((note: any) => (
                <Card sx={{ width: 375, display: 'flex', flexDirection: 'column', minHeight: 220 }}key={note.id}>
                  <CardActionArea sx={{ flexGrow: 1 }}>
                    <CardContent>
                      <Typography gutterBottom variant="h6">
                        {note.title.length > 70 ? `${note.title.slice(0, 70)}...` : note.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {note.synopsis.length > 140
                          ? `${note.synopsis.slice(0, 137)}...`
                          : note.synopsis}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    {note.author.profileImageUrl ? (
                      <Avatar src={note.author.profileImageUrl} />
                    ) : (
                      <Avatar>
                        {note.author.firstName[0].toUpperCase()}
                        {note.author.lastName[0].toUpperCase()}
                      </Avatar>
                    )}
                    <Typography variant="body2">{note.author.username}</Typography>
                    <Typography> • </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {formatNoteDate(note.createdAt)}
                    </Typography>
                    <Typography> • </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {note.readTime} min read
                    </Typography>

                    <Tooltip title="More" placement="top" componentsProps={tooltipStyles}>
                      <IconButton onClick={(e) => handleMenuOpen(e, note.id)}>
                        <IoMdMore />
                      </IconButton>
                    </Tooltip>

                    {selectedNoteId === note.id && (
                      <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenuClose}
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        transformOrigin={{ vertical: "top", horizontal: "right" }}
                      >
                        <MenuItem onClick={()=>{
                          
                          handleMenuClose()
                        }}>Save to Read Later</MenuItem>
                        <MenuItem onClick={() => {
                          navigate(`/notes/${note.id}`)
                          handleMenuClose()
                        }}>Read More</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Pin</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Save</MenuItem>
                      </Menu>
                    )}
                  </CardActions>
                </Card>
              ))}
            </Stack>
            <Stack direction="row" justifyContent="center" mt={3}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, value) => setPage(value)}
                color="primary"
              />
            </Stack>
          </>
        )}
      </Stack>
    </Stack>
  );
}

export default Home;

const tooltipStyles = {
  tooltip: {
    sx: {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      color: "#fff",
      fontSize: "0.875rem",
      borderRadius: 1,
      px: 1.5,
      py: 0.5,
    },
  },
};

const inputStyles = {
  backgroundColor: "transparent",
  alignSelf:"center",
  maxWidth: "30rem",
  mb:"2rem",
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "primary.main",
    },
    "&.Mui-focused fieldset": {
      borderColor: "primary.main",
    },
  },
};
