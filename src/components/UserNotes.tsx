// components/UserNotes.tsx

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
} from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../apis/axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { GiPin } from "react-icons/gi";
import { IoMdBookmark } from "react-icons/io";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { TbPinnedOff } from "react-icons/tb";
import { CiEdit } from "react-icons/ci";
import { FaTrashAlt } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import DeleteNote from "./DeleteNote";
import { Note } from "@mui/icons-material";

function UserNotes() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showDeleteComp, setShowDeleteComp] = useState(false);
  const [deleteNoteId, setDeleteNoteId] = useState("");

  const { data } = useQuery({
    queryKey: ["get-user-notes"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/notes/myNotes");
      return response.data;
    },
  });

  const ITEMS_PER_PAGE = 6;
  const [page, setPage] = useState(1);

  const latestSorted = data?.slice().sort((a: any, b: any) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const finalSorted = latestSorted?.sort((a: any, b: any) => {
    const aPinned = a.pins.some(
      (pin: { userId: string }) => pin.userId === a.author.id,
    );
    const bPinned = b.pins.some(
      (pin: { userId: string }) => pin.userId === b.author.id,
    );
    if (aPinned === bPinned) return 0;
    return aPinned ? -1 : 1;
  });

  const totalPages = Math.ceil(finalSorted?.length / ITEMS_PER_PAGE);
  const userNotes = finalSorted?.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const [savingNoteId, setSavingNoteId] = useState<string | null>(null);
  const [deletingSavedNoteId, setDeletingSavedNoteId] = useState<string | null>(
    null,
  );
  const [pinningNote, setPinningNote] = useState<string | null>(null);
  const [unPinningNote, setUnpinningNote] = useState<string | null>(null);

  const saveNoteMutation = useMutation({
    mutationKey: ["save-note"],
    mutationFn: async (noteId: string) => {
      const response = await axiosInstance.post(`/api/notes/${noteId}/save`);
      return response.data;
    },
    onMutate: setSavingNoteId,
    onError: (error) => {
      setSavingNoteId(null);
      toast.error(
        isAxiosError(error)
          ? error.response?.data.message
          : "Failed to save note. Please try again.",
      );
    },
    onSuccess: (data) => {
      setSavingNoteId(null);
      queryClient.invalidateQueries({ queryKey: ["get-user-notes"] });
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
    onMutate: setDeletingSavedNoteId,
    onError: (error) => {
      setDeletingSavedNoteId(null);
      toast.error(
        isAxiosError(error)
          ? error.response?.data.message
          : "Failed to unsave note. Please try again.",
      );
    },
    onSuccess: (data) => {
      setDeletingSavedNoteId(null);
      queryClient.invalidateQueries({ queryKey: ["get-user-notes"] });
      toast.success(data.message);
    },
  });

  const pinNoteMutation = useMutation({
    mutationKey: ["pin note"],
    mutationFn: async (noteId: string) => {
      const response = await axiosInstance.post(`/api/notes/${noteId}/pin`);
      return response.data;
    },
    onMutate: setPinningNote,
    onError: (error) => {
      setPinningNote(null);
      toast.error(
        isAxiosError(error)
          ? error.response?.data.message
          : "Failed to pin note. Please try again.",
      );
    },
    onSuccess: (data) => {
      setPinningNote(null);
      queryClient.invalidateQueries({ queryKey: ["get-user-notes"] });
      toast.success(data.message);
    },
  });

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
      queryClient.invalidateQueries({ queryKey: ["get-user-notes"] });
      toast.success(data.message);
    },
  });

  if (userNotes?.length === 0) {
    return (
      <Stack alignItems={"center"}>
        <Alert severity="info" sx={{ width: "fit-content" }}>
          Your notes will appear here.
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
        {userNotes?.map((note: any) => {
          const isAuthorAmongSavers = note.saves.some(
            (save: { userId: string }) => save.userId === note.author.id,
          );
          const isAuthorAmongPinners = note.pins.some(
            (pin: { userId: string }) => pin.userId === note.author.id,
          );

          return (
            <Card sx={{ width: 360 }} key={note.id}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {note.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {note.synopsis}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions sx={{ justifyContent: "space-between", px: "1rem" }}>
                <Stack direction={"row"}>
                  {isAuthorAmongPinners ? (
                    <Tooltip
                      title="Unpin"
                      placement="top"
                      componentsProps={tooltipStyles}
                    >
                      <IconButton
                        onClick={() =>
                          deleteNoteFromPinsMutation.mutate(note.id)
                        }
                      >
                        {unPinningNote === note.id ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <TbPinnedOff color="#d1d0d0" size={20} />
                        )}
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title="Pin"
                      placement="top"
                      componentsProps={tooltipStyles}
                    >
                      <IconButton
                        onClick={() => pinNoteMutation.mutate(note.id)}
                      >
                        {pinningNote === note.id ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <GiPin color="#d1d0d0" size={20} />
                        )}
                      </IconButton>
                    </Tooltip>
                  )}

                  {isAuthorAmongSavers ? (
                    <Tooltip
                      title="Remove from saved"
                      placement="top"
                      componentsProps={tooltipStyles}
                    >
                      <IconButton
                        onClick={() =>
                          deleteNoteFromSavesMutation.mutate(note.id)
                        }
                      >
                        {deletingSavedNoteId === note.id ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <IoMdBookmark color="#d1d0d0" size={20} />
                        )}
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title="Save"
                      placement="top"
                      componentsProps={tooltipStyles}
                    >
                      <IconButton
                        onClick={() => saveNoteMutation.mutate(note.id)}
                        disabled={savingNoteId === note.id}
                      >
                        {savingNoteId === note.id ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <MdOutlineBookmarkBorder color="#d1d0d0" size={23} />
                        )}
                      </IconButton>
                    </Tooltip>
                  )}

                  <Tooltip
                    title="Edit"
                    placement="top"
                    componentsProps={tooltipStyles}
                  >
                    <IconButton
                      onClick={() => navigate(`/notes/${note.id}/edit`)}
                    >
                      <CiEdit color="#d1d0d0" size={23} />
                    </IconButton>
                  </Tooltip>

                  <Tooltip
                    title="Delete"
                    placement="top"
                    componentsProps={tooltipStyles}
                  >
                    <IconButton
                      onClick={() => {
                        setDeleteNoteId(note.id);
                        setShowDeleteComp(true);
                      }}
                    >
                      <FaTrashAlt color="#e00202" size={20} />
                    </IconButton>
                  </Tooltip>
                </Stack>

                <Button
                  size="small"
                  color="primary"
                  endIcon={<FiArrowUpRight />}
                  onClick={() => navigate(`/notes/${note.id}`)}
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
      {showDeleteComp && (
        <Stack>
          <DeleteNote
            noteId={deleteNoteId}
            open={showDeleteComp}
            onClose={() => setShowDeleteComp(false)}
          />
        </Stack>
      )}
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
