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

function ReadLaters() {
  const { data } = useQuery({
    queryKey: ["get-user-readLaters"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/notes/myReadLaters");
      return response.data;
    },
  });

  const ITEMS_PER_PAGE = 6;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(data?.length / ITEMS_PER_PAGE);

  const readLaterNotes = data?.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );
  if (readLaterNotes?.length === 0) {
    return (
      <Stack alignItems={"center"}>
        <Alert severity="info" sx={{ width: "fit-content" }}>
          Your read later notes will appear here.
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
        {readLaterNotes &&
          readLaterNotes.map((note: any) => (
            <Card sx={{ width: 385,
                      display: "flex",
                      flexDirection: "column",
                      minHeight: 270, }} key={note.id}>
              <CardActionArea sx={{ flexGrow: 1 }}>
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {note.note.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {note.note.synopsis.length > 140
                            ? `${note.note.synopsis.slice(0, 200)}...`
                            : note.note.synopsis}
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

export default ReadLaters;
