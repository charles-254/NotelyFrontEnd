import {
  Stack,
  Pagination,
  Typography,
  Alert,
  CardActionArea,
  Card,
  CardContent,
  Button,
  CardActions,
  Tooltip,
  IconButton,
  CircularProgress,
  Avatar,
  Link,
} from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../apis/axios";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

function Saves() {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["get-user-saves"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/notes/mySaves");
      return response.data;
    },
  });

  const ITEMS_PER_PAGE = 6;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(data?.length / ITEMS_PER_PAGE);

  const savedNotes = data?.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const [deletingSavedNoteId, setDeletingSavedNoteId] = useState<string | null>(
    null,
  );

  const deleteNoteFromSavesMutation = useMutation({
    mutationKey: ["unsave-note"],
    mutationFn: async (noteId: string) => {
      const response = await axiosInstance.delete(
        `/api/notes/${noteId}/unSave`,
      );
      return response.data;
    },
    onMutate: (noteId) => {
      setDeletingSavedNoteId(noteId);
    },
    onError: (error) => {
      setDeletingSavedNoteId(null);
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Failed to unsave note. Please try again.");
      }
    },
    onSuccess: (data) => {
      setDeletingSavedNoteId(null);
      queryClient.invalidateQueries({ queryKey: ["get-user-saves"] });
      toast.success(data.message);
    },
  });

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
      return `${diffInHours} hr${diffInHours > 1 ? "s" : ""} ago`;
    if (diffInDays === 1) return "yesterday";
    if (diffInDays < 2) return `${diffInDays} days ago`;

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }).format(date);
  }
  if (savedNotes?.length === 0) {
    return (
      <Stack alignItems={"center"}>
        <Alert severity="info" sx={{ width: "fit-content" }}>
          Your saved notes will appear here.
        </Alert>
      </Stack>
    );
  }

  return (
    <Stack>
      <Stack
        direction={"row"}
        gap={"1rem"}
        flexWrap={"wrap"}
        justifyContent={"center"}
      >
        {savedNotes &&
          savedNotes.map((note: any) => {
            const isOwner = note.note.authorId === userData.id;
            return (
              <Card sx={{ width: 385,
                      display: "flex",
                      flexDirection: "column",
                      minHeight: 270, }} key={note.id}>
                <CardActionArea sx={{ flexGrow: 1 }}>
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {note.note.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {note.note.synopsis.length > 140
                            ? `${note.note.synopsis.slice(0, 200)}...`
                            : note.note.synopsis}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions sx={{ justifyContent: "space-between" }}>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    spacing={".5rem"}
                  >
                    {note.note.author.profileImageUrl ? (
                      <Avatar src={note.note.author.profileImageUrl} />
                    ) : (
                      <Avatar>
                        {note.user.firstName[0].toUpperCase()}
                        {note.user.lastName[0].toUpperCase()}
                      </Avatar>
                    )}
                    <Link
                      href={isOwner ? "/profile" : "userProfile-listuserNotes"}
                    >
                      {isOwner ? (
                        <Typography>By you</Typography>
                      ) : (
                        <Typography noWrap sx={{
                          maxWidth: 110,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}>{note.note.author.username}</Typography>
                      )}
                    </Link>
                    <Typography variant="body2" color="text.secondary">
                      {formatNoteDate(note.note.createdAt)}
                    </Typography>
                  </Stack>
                  <Stack direction={"row"}>
                    {" "}
                    <Tooltip
                      title="Remove from saved"
                      placement="top"
                      componentsProps={tooltipStyles}
                    >
                      <IconButton
                        onClick={() =>
                          deleteNoteFromSavesMutation.mutate(note.noteId)
                        }
                      >
                        {deletingSavedNoteId === note.noteId ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <FaTrashAlt color="#e00202" size={20} />
                        )}
                      </IconButton>
                    </Tooltip>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => navigate(`/notes/${note.noteId}`)}
                    >
                      readmore
                    </Button>
                  </Stack>
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
    </Stack>
  );
}

export default Saves;

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
