import {
  Stack,
  Typography,
  Avatar,
  Button,
  Divider,
  IconButton,
  Tooltip,
  Chip,
  CircularProgress,
} from "@mui/material";
import axiosInstance from "../apis/axios";
import { useQuery } from "@tanstack/react-query";
import Markdown from "markdown-to-jsx";
import { useParams } from "react-router-dom";
import { IoIosMore } from "react-icons/io";
import { LuShare } from "react-icons/lu";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { GiPin } from "react-icons/gi";
import { IoMdBookmark } from "react-icons/io";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { TbPinnedOff } from "react-icons/tb";

function ReadNote() {
  const queryClient = useQueryClient();
  const { noteId } = useParams();
  const userData = JSON.parse(localStorage.getItem("user") || "{}");

  const { data } = useQuery({
    queryKey: ["get-specific-note"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/notes/${noteId}`);

      return response.data;
    },
  });
  console.log(data);
  const isUserAmongSavers = data?.note?.saves.some(
    (save: { userId: string }) => save.userId === userData.id,
  );

  const isUserAmongPinners = data?.note?.pins.some(
    (pin: { userId: string }) => pin.userId === userData.id,
  );

  const isUserAmongFollowers = data?.note?.author.followers.some(
    (follower: { followerId: string }) => follower.followerId === userData.id,
  );

  const numberOfFollowers = data?.note?.author.followers.length;
  const numberOfFollowing = data?.note?.author.following.length;

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
      queryClient.invalidateQueries({ queryKey: ["get-specific-note"] });
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
      queryClient.invalidateQueries({ queryKey: ["get-specific-note"] });
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
      queryClient.invalidateQueries({ queryKey: ["get-specific-note"] });
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
      queryClient.invalidateQueries({ queryKey: ["get-specific-note"] });
      toast.success(data.message);
    },
  });

  const followUserMutation = useMutation({
    mutationKey: ["follow-user"],
    mutationFn: async (followerId) => {
      const response = await axiosInstance.post(
        `/api/user/${followerId}/followUser`,
      );
      return response.data;
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.error);
      } else {
        toast.error("Failed to follow user. Try again later");
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["get-specific-note"] });
      toast.success(data.message);
    },
  });

  return (
    <Stack direction={"row"} justifyContent={"center"} mt={"2rem"}>
      <Stack width={"60%"}>
        {data && (
          <Stack component={"div"}>
            <Stack component={"div"} mb={"2rem"}>
              <Stack
                component={"div"}
                direction={"row"}
                spacing={2}
                alignItems={"center"}
                mt={"1rem"}
              >
                {data.note.author.profileImageUrl ? (
                  <Avatar
                    sx={{ height: "6rem", width: "6rem" }}
                    src={data.note.author.profileImageUrl}
                  />
                ) : (
                  <Avatar
                    sx={{
                      fontSize: "2.2rem",
                      color: "white",
                      height: "5rem",
                      width: "5rem",
                    }}
                  >
                    {data.note.author.firstName[0].toUpperCase()}
                    {data.note.author.lastName[0].toUpperCase()}
                  </Avatar>
                )}
                <Stack>
                  <Typography textTransform={"capitalize"} variant="h4">
                    {data.note.author.firstName} {data.note.author.lastName}
                  </Typography>
                  <Typography color="text.secondary">
                    @{data.note.author.username}
                  </Typography>
                </Stack>
                <Stack gap={".3rem"}>
                  <Chip
                    variant="outlined"
                    label={`${numberOfFollowing} following`}
                  />
                  <Chip
                    variant="outlined"
                    label={`${numberOfFollowers} followers`}
                  />
                </Stack>
                <Stack>
                  <Typography variant="body2">
                    Created: {formatNoteDate(data.note.createdAt)}
                  </Typography>
                  <Typography variant="body2">
                    {data.note.readTime} min read
                  </Typography>
                </Stack>
                <Button
                  variant="outlined"
                  sx={{ height: "fit-content" }}
                  loading={followUserMutation.isPending}
                  onClick={() => {
                    followUserMutation.mutate(data.note.authorId);
                  }}
                >
                  {isUserAmongFollowers ? "unfollow" : "follow"}
                </Button>
              </Stack>
            </Stack>
            <Divider></Divider>
            <Stack my={".5rem"}>
              <Stack
                component={"div"}
                direction={"row"}
                justifyContent={"space-between"}
              >
                <Stack
                  direction={"row"}
                  color={"text.secondary"}
                  spacing={"2rem"}
                >
                  {isUserAmongPinners ? (
                    <Tooltip
                      title="Unpin"
                      placement="top"
                      componentsProps={tooltipStyles}
                    >
                      <IconButton
                        onClick={() =>
                          deleteNoteFromPinsMutation.mutate(data.note.id)
                        }
                      >
                        {unPinningNote === data.note.id ? (
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
                        onClick={() => pinNoteMutation.mutate(data.note.id)}
                      >
                        {pinningNote === data.note.id ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <GiPin color="#d1d0d0" size={20} />
                        )}
                      </IconButton>
                    </Tooltip>
                  )}
                  {isUserAmongSavers ? (
                    <Tooltip
                      title="Remove from saved"
                      placement="top"
                      componentsProps={tooltipStyles}
                    >
                      <IconButton
                        onClick={() =>
                          deleteNoteFromSavesMutation.mutate(data.note.id)
                        }
                      >
                        {deletingSavedNoteId === data.note.id ? (
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
                        onClick={() => saveNoteMutation.mutate(data.note.id)}
                        disabled={savingNoteId === data.note.id}
                      >
                        {savingNoteId === data.note.id ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <MdOutlineBookmarkBorder color="#d1d0d0" size={23} />
                        )}
                      </IconButton>
                    </Tooltip>
                  )}

                  <Tooltip
                    title="Share"
                    placement="top"
                    componentsProps={tooltipStyles}
                    arrow
                  >
                    <IconButton sx={{ fontSize: "1.5rem" }}>
                      <LuShare style={{ color: "rgb(156, 156, 156)" }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    title="More"
                    placement="top"
                    componentsProps={tooltipStyles}
                    arrow
                  >
                    <IconButton sx={{ fontSize: "1.5rem" }}>
                      <IoIosMore style={{ color: "rgb(156, 156, 156)" }} />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Stack>
            </Stack>
            <Divider></Divider>
            <Stack component={"div"} mt={"4rem"}>
              <Typography
                variant="h4"
                gutterBottom
                textTransform={"uppercase"}
                fontWeight={800}
              >
                {data.note.title}
              </Typography>

              <Typography
                gutterBottom
                variant="h5"
                textTransform={"uppercase"}
                fontWeight={700}
                mt={"3rem"}
              >
                Synopsis
              </Typography>
              <Typography color="text.secondary">
                {data.note.synopsis}
              </Typography>
              <Divider sx={{ my: "3.5rem" }}></Divider>
              <Stack component={"div"} mb={"8rem"}>
                <Markdown>{data.note.content}</Markdown>
              </Stack>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}

export default ReadNote;

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
