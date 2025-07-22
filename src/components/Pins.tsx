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
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../apis/axios";
import { useState } from "react";

function Pins() {
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
      <Stack>
        {pinnedNotes &&
          pinnedNotes.map((note: any) => (
            <Card sx={{ maxWidth: 345 }} key={note.id}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {note.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {note.synopsis}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  readmore
                </Button>
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
  );
}

export default Pins;
