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
  Link,
  Avatar,
} from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../apis/axios";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

function Pins() {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const queryClient = useQueryClient();
  const navigate = useNavigate()
  const { data } = useQuery({
    queryKey: ["get-user-pins"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/notes/myPins");
      return response.data;
    },
  });

  const ITEMS_PER_PAGE = 6;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(data?.length / ITEMS_PER_PAGE);

  const pinnedNotes = data?.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );
  
  const [unPinningNote, setUnpinningNote] = useState<string | null>(null);
  const deleteNoteFromPinsMutation = useMutation({
    mutationKey: ["unpin-note"],
    mutationFn: async (noteId: string) => {
      const response = await axiosInstance.delete(`/api/notes/${noteId}/unPin`);
      return response.data;
    },
    onMutate: setUnpinningNote,
    onError: (error) => {
      setUnpinningNote(null);
      toast.error(
        isAxiosError(error)
          ? error.response?.data.message
          : "Failed to unpin note. Please try again.",
      );
    },
    onSuccess: (data) => {
      setUnpinningNote(null);
      queryClient.invalidateQueries({ queryKey: ["get-user-pins"] });
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
  if (pinnedNotes?.length === 0) {
    return (
      <Stack alignItems={"center"}>
        <Alert severity="info" sx={{ width: "fit-content" }}>
          Your pinned notes will appear here.
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
        {pinnedNotes &&
          pinnedNotes.map((note: any) => {
            const isOwner = note.note.authorId === userData.id;
            console.log(note)
            return (
              <Card sx={{ width: 360 }} key={note.id}>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {note.note.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {note.note.synopsis}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions sx={{ justifyContent: "space-between" }}>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    spacing={".5rem"}
                  >
                    {note.user.profileImageUrl ? (
                      <Avatar src={note.user.profileImageUrl} />
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
                        <Typography>{note.note.author.username}</Typography>
                      )}
                    </Link>
                    <Typography variant="body2" color="text.secondary">
                      {formatNoteDate(note.note.createdAt)}
                    </Typography>
                  </Stack>
                  <Stack direction={"row"}>
                    {" "}
                    <Tooltip
                      title="Unpin Note"
                      placement="top"
                      componentsProps={tooltipStyles}
                    >
                      <IconButton
                        onClick={() =>
                          deleteNoteFromPinsMutation.mutate(note.noteId)
                        }
                      >
                        {unPinningNote === note.noteId ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <FaTrashAlt color="#e00202" size={20} />
                        )}
                      </IconButton>
                    </Tooltip>
                    <Button size="small" color="primary" onClick={() => navigate(`/notes/${note.noteId}`)}>
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

export default Pins;

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
