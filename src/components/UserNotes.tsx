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
} from "@mui/material";
import { useQuery , useMutation} from "@tanstack/react-query";
import axiosInstance from "../apis/axios";
import { useState } from "react";
import { GiPin } from "react-icons/gi";
import { IoMdBookmark } from "react-icons/io";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { TbPinnedOff } from "react-icons/tb";
import { CiEdit } from "react-icons/ci";
import { FaTrashAlt } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";

function UserNotes() {
  const { data } = useQuery({
    queryKey: ["get-user-notes"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/notes/myNotes");
      return response.data;
    },
  });

  const ITEMS_PER_PAGE = 6;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(data?.length / ITEMS_PER_PAGE);

  const userNotes = data?.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );
  if (userNotes?.length === 0) {
    return (
      <Stack alignItems={"center"}>
        <Alert severity="info" sx={{ width: "fit-content" }}>
          Your notes will appear here.
        </Alert>
      </Stack>
    );
  }
  const saveNoteMutation = useMutation({
  mutationFn: async (noteId: string) => {
    return await axiosInstance.post(`/api/notes/${noteId}/save`);
  },
});

const deleteNoteFromSavesMutation = useMutation({
  mutationFn: async (noteId: string) => {
    return await axiosInstance.delete(`/api/notes/${noteId}/unsave`);
  },
});

const pinNoteMutation = useMutation({
  mutationFn: async (noteId: string) => {
    return await axiosInstance.post(`/api/notes/${noteId}/pin`);
  },
});

const deleteNoteFromPinsMutation = useMutation({
  mutationFn: async ({ noteId, data }: { noteId: string; data: any }) => {
    return await axiosInstance.put(`/api/notes/${noteId}/unPin`);
  },
});

  return (
    <Stack>
      <Stack
        direction={"row"}
        gap={"1rem"}
        flexWrap={"wrap"}
        justifyContent={"center"}
      >
        {userNotes &&
          userNotes.map((note: any) => {
            const isAuthorAmongSavers = note.saves.some(
              (save: { userId: string }) => save.userId === note.author.id,
            );
            const isAuthorAmongPinners = note.pins.some(
              (pin: { userId: string }) => pin.userId === note.author.id,
            );

            return (
              <Card sx={{ width: 345 }} key={note.id}>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {note.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {note.synopsis}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions
                  sx={{ justifyContent: "space-between", px: "1rem" }}
                >
                  <Stack direction={"row"}>
                    {isAuthorAmongPinners ? (
                      <Tooltip
                        title="Unpin"
                        placement="top"
                        componentsProps={tooltipStyles}
                      >
                        <IconButton>
                          <TbPinnedOff color="#d1d0d0" size={20} />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip
                        title="Pin"
                        placement="top"
                        componentsProps={tooltipStyles}
                      >
                        <IconButton>
                          <GiPin color="#d1d0d0" size={20} />
                        </IconButton>
                      </Tooltip>
                    )}
                    {isAuthorAmongSavers ? (
                      <Tooltip
                        title="Unsave"
                        placement="top"
                        componentsProps={tooltipStyles}
                      >
                        <IconButton>
                          <IoMdBookmark color="#d1d0d0" size={20} />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip
                        title="Save"
                        placement="top"
                        componentsProps={tooltipStyles}
                      >
                        <IconButton onClick={() => saveNoteMutation.mutate(note.id)}>
                          <MdOutlineBookmarkBorder color="#d1d0d0" size={23} />
                        </IconButton>
                      </Tooltip>
                    )}
                    <Tooltip
                      title="Edit"
                      placement="top"
                      componentsProps={tooltipStyles}
                    >
                      <IconButton>
                        <CiEdit color="#d1d0d0" size={23} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      title="Delete"
                      placement="top"
                      componentsProps={tooltipStyles}
                    >
                      <IconButton>
                        <FaTrashAlt color="#e00202" size={20} />
                      </IconButton>
                    </Tooltip>
                  </Stack>

                  <Button
                    size="small"
                    color="primary"
                    endIcon={<FiArrowUpRight />}
                  >
                    readmore
                  </Button>
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

export default UserNotes;

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
