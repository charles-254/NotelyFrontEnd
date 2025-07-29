import {
  Stack,
  Alert,
  Pagination,
  Card,
  CardActionArea,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axiosInstance from "../apis/axios";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { toast } from "react-toastify";

function Trash() {
  const { isLoading, data } = useQuery({
    queryKey: ["get-trashed-notes"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/notes/trash");
      return response.data;
    },
  });
  const queryClient = useQueryClient();
const {mutate, isPending} = useMutation({
  mutationFn: (noteId: string) => axiosInstance.patch(`/api/notes/${noteId}/restore`),
  onSuccess: () => {
    toast.success("Note restored successfully")
    queryClient.invalidateQueries({queryKey: ["get-trashed-notes"]});
  },
});

  const ITEMS_PER_PAGE = 6;
  const [page, setPage] = useState(1);
  const totalPages = data ? Math.ceil(data.length / ITEMS_PER_PAGE) : 1;

  const trashedNotes = data?.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  if (isLoading) {
    return (
      <Stack alignItems="center" mt={4}>
        <Typography>Loading...</Typography>
      </Stack>
    );
  }

  if (!trashedNotes || trashedNotes.length === 0) {
    return (
      <Stack direction="row">
        <Sidebar />
        <Stack mt={4} alignItems="center" justifyContent="center" flex={1}>
          <Alert severity="info" sx={{ width: "fit-content" }}>
            Your deleted notes will appear here
          </Alert>
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack direction="row">
      <Sidebar />
      <Stack flex={1} p={2}>
        <Alert
          severity="warning"
          sx={{ width: "fit-content", alignSelf: "center", mb: 2 }}
        >
          Trashed notes will be permanently deleted after 30 days
        </Alert>
        <Stack
          direction="row"
          flexWrap="wrap"
          gap={2}
          justifyContent="center"
          alignItems="flex-start"
        >
          {trashedNotes.map((note: any) => (
            <Card sx={{
                width: 385,
                display: "flex",
                flexDirection: "column",
                minHeight: 270,
              }} key={note.id}>
              <CardActionArea sx={{ flexGrow: 1 }}>
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    {note.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {note.synopsis.length > 140
                      ? `${note.synopsis.slice(0, 200)}...`
                      : note.synopsis}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button onClick={() => mutate(note.id)} loading={isPending}>Restore</Button>
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
      </Stack>
    </Stack>
  );
}

export default Trash;
