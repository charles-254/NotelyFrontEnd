import { Stack, Typography, Paper, Button } from "@mui/material";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../apis/axios";
import { isAxiosError } from "axios";

interface DeleteNoteProps {
  noteId: string;
  open: boolean;
  onClose: () => void;
}

function DeleteNote({ noteId, open, onClose }: DeleteNoteProps) {
  console.log("Deleting note with ID:", noteId);

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["delete-note"],
    mutationFn: async (noteId: String) => {
      const response = await axiosInstance.patch(`/api/notes/${noteId}/delete`);
      return response.data;
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["get-user-notes"] });
      onClose();
    },
  });

  function handleDeleteNote() {
    mutate(noteId);
  }

  if (!open) return null;
  return (
    <Stack
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(5px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
      }}
      onClick={onClose}
    >
      <Paper
        sx={{
          backgroundColor: "#121212",
          padding: "2rem",
          borderRadius: ".5rem",
          minWidth: "350px",
          width: "90%",
          maxWidth: "400px",
          textAlign: "center",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Typography variant="h5"> Delete Note</Typography>
        <Typography mb="1rem">
          Are you sure you want to delete this note ?
        </Typography>
        <Stack spacing={"1rem"} direction={"row"}>
          <Button
            variant="outlined"
            fullWidth
            sx={{ borderRadius: ".3rem" }}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            fullWidth
            sx={{ borderRadius: ".3rem" }}
            color="error"
            onClick={handleDeleteNote}
            loading={isPending}
          >
            Delete
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
}

export default DeleteNote;
