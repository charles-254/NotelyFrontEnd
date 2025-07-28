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
  Chip,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../apis/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { IoMdMore } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";

function Home() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading, data: allNotes } = useQuery({
    queryKey: ["get-public-notes"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/notes/");
      return response.data;
    },
  });

  const { data: pinnedNotes, isLoading: isLoadingPins } = useQuery({
    queryKey: ["get-pinned-notes"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/notes/myPins");
      return response.data;
    },
  });

  const { data: savedNotes } = useQuery({
    queryKey: ["get-saved-notes"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/notes/mySaves");
      console.log(response.data);
      return response.data;
    },
  });

  const { data: readLaterNotes } = useQuery({
    queryKey: ["get-readLater-notes"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/notes/myReadLaters");
      console.log(response.data);
      return response.data;
    },
  });

  const pinnedNoteIds = pinnedNotes?.map((p: any) => p.note.id) || [];
  const pinnedNotesList = pinnedNotes?.map((p: any) => p.note) || [];
  const savedNotesIds = savedNotes?.map((s: any) => s.noteId) || [];
  const readLaterNotesIds = readLaterNotes?.map((s: any) => s.noteId) || [];

  const unpinnedPublicNotes =
    allNotes?.filter((note: any) => !pinnedNoteIds.includes(note.id)) || [];

  const combinedNotes = [...pinnedNotesList, ...unpinnedPublicNotes];

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const open = Boolean(anchorEl);
  const ITEMS_PER_PAGE = 9;

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    noteId: string,
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedNoteId(noteId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedNoteId(null);
  };

  const filteredNotes = combinedNotes.filter((note: any) => {
    const lowerSearch = searchTerm.toLowerCase();
    const titleMatch = note.title.toLowerCase().includes(lowerSearch);
    const synopsisMatch = note.synopsis.toLowerCase().includes(lowerSearch);
    const contentMatch = note.content.toLowerCase().includes(lowerSearch);
    const usernameMatch = note.author.username
      .toLowerCase()
      .includes(lowerSearch);
    return titleMatch || usernameMatch || synopsisMatch || contentMatch;
  });

  const totalPages = Math.ceil(filteredNotes.length / ITEMS_PER_PAGE);

  const publicNotes = filteredNotes.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
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
    if (diffInHours < 24)
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    if (diffInDays === 1) return "yesterday";
    if (diffInDays < 2) return `${diffInDays} days ago`;

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }).format(date);
  }

  const saveNoteMutation = useMutation({
    mutationKey: ["save-note"],
    mutationFn: async (noteId: string) => {
      const response = await axiosInstance.post(`/api/notes/${noteId}/save`);
      return response.data;
    },
    onError: (error) => {
      toast.error(
        isAxiosError(error)
          ? error.response?.data.message
          : "Failed to save note. Please try again.",
      );
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["get-saved-notes"] });
      toast.success(data.message);
    },
  });

  const deleteNoteFromSavesMutation = useMutation({
    mutationKey: ["unsave-note"],
    mutationFn: async (noteId: string) => {
      const response = await axiosInstance.delete(
        `/api/notes/${noteId}/unSave`,
      );
      return response.data;
    },
    onError: (error) => {
      toast.error(
        isAxiosError(error)
          ? error.response?.data.message
          : "Failed to unsave note. Please try again.",
      );
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["get-saved-notes"] });
      toast.success(data.message);
    },
  });

  const pinNoteMutation = useMutation({
    mutationKey: ["pin-note"],
    mutationFn: async (noteId: string) => {
      const response = await axiosInstance.post(`/api/notes/${noteId}/pin`);
      return response.data;
    },
    onError: (error) => {
      toast.error(
        isAxiosError(error)
          ? error.response?.data.message
          : "Failed to pin note. Please try again.",
      );
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["get-pinned-notes"] });
      toast.success(data.message);
    },
  });

  const deleteNoteFromPinsMutation = useMutation({
    mutationKey: ["unpin-note"],
    mutationFn: async (noteId: string) => {
      const response = await axiosInstance.delete(`/api/notes/${noteId}/unPin`);
      return response.data;
    },
    onError: (error) => {
      toast.error(
        isAxiosError(error)
          ? error.response?.data.message
          : "Failed to unpin note. Please try again.",
      );
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["get-pinned-notes"] });
      toast.success(data.message);
    },
  });

  const readLaterNoteMutation = useMutation({
    mutationKey: ["save-note-to-readlater"],
    mutationFn: async (noteId: string) => {
      const response = await axiosInstance.post(
        `/api/notes/${noteId}/readLater`,
      );
      return response.data;
    },
    onError: (error) => {
      toast.error(
        isAxiosError(error)
          ? error.response?.data.message
          : "Failed to pin note. Please try again.",
      );
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["get-readLater-notes"] });
      toast.success(data.message);
    },
  });

  const deleteNoteFromReadLatersMutation = useMutation({
    mutationKey: ["remove-note-from-readlater"],
    mutationFn: async (noteId: string) => {
      const response = await axiosInstance.delete(
        `/api/notes/${noteId}/unReadLater`,
      );
      return response.data;
    },
    onError: (error) => {
      toast.error(
        isAxiosError(error)
          ? error.response?.data.message
          : "Failed to unpin note. Please try again.",
      );
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["get-readLater-notes"] });
      toast.success(data.message);
    },
  });

  if (isLoading || isLoadingPins) {
    return (
      <Stack alignItems="center" mt={4}>
        <Typography>Loading...</Typography>
      </Stack>
    );
  }

  return (
    <Stack direction="row">
      <Sidebar />
      <Stack flex={1} p={2} mb={"3rem"} mt={"1rem"}>
        <Typography
          variant="h4"
          fontWeight={600}
          textAlign="center"
          color="primary.main"
          gutterBottom
        >
          Public Notes Library
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          mb={2}
        >
          Search and read notes published by users across various topics and
          interests.
        </Typography>

        <TextField
          label="Search... "
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
              {publicNotes.map((note: any) => {
                const isPinned = pinnedNoteIds.includes(note.id);
                const isSaved = savedNotesIds.includes(note.id);
                const isReadLater = readLaterNotesIds.includes(note.id);
                return (
                  <Card
                    sx={{
                      width: 385,
                      display: "flex",
                      flexDirection: "column",
                      minHeight: 270,
                      position: "relative",
                    }}
                    key={note.id}
                  >
                    {isPinned && (
                      <Chip
                        label="Pinned"
                        color="secondary"
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          zIndex: 1,
                        }}
                      />
                    )}
                    <CardActionArea sx={{ flexGrow: 1 }}>
                      <CardContent>
                        <Typography gutterBottom variant="h6">
                          {note.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {note.synopsis.length > 140
                            ? `${note.synopsis.slice(0, 200)}...`
                            : note.synopsis}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions sx={{ justifyContent: "space-between" }}>
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        gap={".5rem"}
                      >
                        {note.author.profileImageUrl ? (
                          <Avatar src={note.author.profileImageUrl} />
                        ) : (
                          <Avatar>
                            {note.author.firstName[0].toUpperCase()}
                            {note.author.lastName[0].toUpperCase()}
                          </Avatar>
                        )}
                        <Typography
                          variant="body2"
                          noWrap
                          sx={{
                            maxWidth: 85,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {note.author.username}
                        </Typography>
                        <Typography> • </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {formatNoteDate(note.createdAt)}
                        </Typography>
                        <Typography> • </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {note.readTime} min read
                        </Typography>
                      </Stack>

                      <Tooltip
                        title="More"
                        placement="top"
                        componentsProps={tooltipStyles}
                      >
                        <IconButton onClick={(e) => handleMenuOpen(e, note.id)}>
                          <IoMdMore />
                        </IconButton>
                      </Tooltip>

                      {selectedNoteId === note.id && (
                        <Menu
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleMenuClose}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                        >
                          {isReadLater ? (
                            <MenuItem
                              onClick={() => {
                                deleteNoteFromReadLatersMutation.mutate(
                                  note.id,
                                );
                                handleMenuClose();
                              }}
                            >
                              Remove from Read Later
                            </MenuItem>
                          ) : (
                            <MenuItem
                              onClick={() => {
                                readLaterNoteMutation.mutate(note.id);
                                handleMenuClose();
                              }}
                            >
                              Save to Read Later
                            </MenuItem>
                          )}

                          <MenuItem
                            onClick={() => {
                              navigate(`/notes/${note.id}`);
                              handleMenuClose();
                            }}
                          >
                            Read More{" "}
                            <HiArrowTopRightOnSquare
                              size={20}
                              style={{ marginLeft: "1rem" }}
                            />
                          </MenuItem>

                          {isPinned ? (
                            <MenuItem
                              onClick={() => {
                                console.log("Unpinning note:", note.id);
                                deleteNoteFromPinsMutation.mutate(note.id);
                                handleMenuClose();
                              }}
                            >
                              Unpin
                            </MenuItem>
                          ) : (
                            <MenuItem
                              onClick={() => {
                                console.log("Pinning note:", note.id);
                                pinNoteMutation.mutate(note.id);
                                handleMenuClose();
                              }}
                            >
                              Pin
                            </MenuItem>
                          )}

                          {isSaved ? (
                            <MenuItem
                              onClick={() => {
                                console.log("UnSaving note:", note.id);
                                deleteNoteFromSavesMutation.mutate(note.id);
                                handleMenuClose();
                              }}
                            >
                              UnSave
                            </MenuItem>
                          ) : (
                            <MenuItem
                              onClick={() => {
                                console.log("Saving note:", note.id);
                                saveNoteMutation.mutate(note.id);
                                handleMenuClose();
                              }}
                            >
                              Save
                            </MenuItem>
                          )}
                        </Menu>
                      )}
                    </CardActions>
                  </Card>
                );
              })}
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
  alignSelf: "center",
  maxWidth: "30rem",
  mb: "2rem",
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "primary.main",
    },
    "&.Mui-focused fieldset": {
      borderColor: "primary.main",
    },
  },
};
