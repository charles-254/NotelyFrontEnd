import {
  Box,
  TextField,
  Typography,
  Paper,
  Stack,
  Button,
  Divider,
  FormControlLabel,
  Switch,
} from "@mui/material";
import Markdown from "markdown-to-jsx";
import { useState, useMemo } from "react";
import z from "zod";
import Sidebar from "../components/Sidebar";
import removeMarkdown from "remove-markdown";
import axiosInstance from "../apis/axios";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { FaRegClock } from "react-icons/fa6";

interface Note {
  title: string;
  synopsis: string;
  content: string;
  readTime: number;
  isPublic: boolean;
}

function CreateNote() {
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [content, setContent] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const noteSchema = z.object({
    title: z.string().min(1, "Title is required."),
    synopsis: z.string().min(1, "Synopsis is required."),
    content: z.string().min(1, "Content is required."),
  });

  const estimateReadTime = (text: string, wpm: number = 120): number => {
    const cleanText = removeMarkdown(text || "");
    const wordCount = cleanText.trim().split(/\s+/).filter(Boolean).length;
    return Math.ceil(wordCount / wpm);
  };

  const readTime = useMemo(() => estimateReadTime(content), [content]);

  const { isPending, mutate } = useMutation({
    mutationKey: ["create-note"],
    mutationFn: async (note: Note) => {
      const response = await axiosInstance.post("/api/notes", note);
      return response.data;
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Failed to create note.Please try Again.");
      }
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
  });

  function handleCreateNote() {
    const noteData = { title, synopsis, content };
    const result = noteSchema.safeParse(noteData);
    if (!result.success) {
      const zodErrors: Record<string, string> = {};
      const fieldErrors: Record<string, string[]> =
        result.error.flatten().fieldErrors;

      for (const key in fieldErrors) {
        if (fieldErrors[key]?.[0]) {
          zodErrors[key] = fieldErrors[key][0];
        }
      }

      setFormErrors(zodErrors);
      return;
    }
    setFormErrors({});
    const finalNoteData = { ...result.data, readTime, isPublic };
    mutate(finalNoteData);
  }

  return (
    <Stack direction="row">
      <Sidebar />
      <Box
        sx={{ display: "flex", justifyContent: "center", my: 6, width: "100%" }}
      >
        <Box sx={{ width: "100%", maxWidth: "60%" }}>
          <Typography variant="h4" gutterBottom fontWeight={600}>
            Create a New Note
          </Typography>

          <Typography variant="body1" color="text.secondary" mb={3}>
            Fill out the form below to add a new note. Markdown is supported in
            the content field.
          </Typography>

          <Stack spacing={3}>
            <TextField
              required
              fullWidth
              label="Title"
              value={title}
              onChange={(e) => {
                formErrors.title = "";
                setTitle(e.target.value);
              }}
              error={!!formErrors.title}
              helperText={formErrors.title || `${title.length}/100 characters`}
              inputProps={{ maxLength: 100 }}
              sx={inputStyles}
              FormHelperTextProps={{ sx: { fontSize: ".85rem" } }}
            />

            <TextField
              required
              fullWidth
              multiline
              label="Synopsis"
              value={synopsis}
              onChange={(e) => {
                formErrors.synopsis = "";
                setSynopsis(e.target.value);
              }}
              error={!!formErrors.synopsis}
              helperText={
                formErrors.synopsis || "A short summary of your note."
              }
              sx={inputStyles}
              FormHelperTextProps={{ sx: { fontSize: ".85rem" } }}
            />

            <Box>
              <TextField
                required
                fullWidth
                multiline
                minRows={6}
                label="Content (Markdown Supported)"
                value={content}
                onChange={(e) => {
                  formErrors.content = "";
                  setContent(e.target.value);
                }}
                error={!!formErrors.content}
                helperText={
                  formErrors.content ||
                  "You can use **bold**, _italic_, lists, headings, links, and more!"
                }
                sx={inputStyles}
                FormHelperTextProps={{ sx: { fontSize: ".85rem" } }}
              />
              {content && (
                <Stack direction={"row"} alignItems={"center"} gap={".3rem"}>
                  <FaRegClock style={{ color: "#16d085" }} />
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    mt={1}
                    display="block"
                  >
                    {readTime} min read
                  </Typography>
                </Stack>
              )}
            </Box>
            <Stack direction={"row"}>
              <FormControlLabel
                label="Public"
                control={
                  <Switch
                    checked={isPublic}
                    onChange={() => setIsPublic(!isPublic)}
                  />
                }
              />
              <FormControlLabel
                label="Private"
                control={
                  <Switch
                    checked={!isPublic}
                    onChange={() => setIsPublic(!isPublic)}
                  />
                }
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateNote}
                sx={{ borderRadius: ".3rem" }}
                loading={isPending}
              >
                Save Note
              </Button>

              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setShowPreview((prev) => !prev)}
                sx={{ borderRadius: ".3rem" }}
              >
                {showPreview ? "Hide Preview" : "Preview Markdown"}
              </Button>
            </Stack>

            {showPreview && (
              <>
                <Divider />
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Markdown Preview
                  </Typography>
                  <Paper
                    sx={{
                      p: 2,
                      minHeight: 200,
                      border: "1px solid #ddd",
                      borderRadius: ".5rem",
                    }}
                  >
                    <Markdown>
                      {content || "Start typing in the content field..."}
                    </Markdown>
                  </Paper>
                </Box>
              </>
            )}
          </Stack>
        </Box>
      </Box>
    </Stack>
  );
}

export default CreateNote;

const inputStyles = {
  backgroundColor: "transparent",
  borderRadius: 2,
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "primary.main",
    },
    "&.Mui-focused fieldset": {
      borderColor: "primary.main",
    },
  },
};
