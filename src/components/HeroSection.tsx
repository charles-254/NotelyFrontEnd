import { Stack, Typography, Button } from "@mui/material";
import Navbar from "./NavBar";
import { MdOutlineArrowOutward } from "react-icons/md";
import { motion } from "framer-motion";

function HeroSection() {
  return (
    <Stack
      sx={{
        height: "100vh",
        backgroundImage: 'url("hero.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
      }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Navbar />

      <Stack
        direction={{ xs: "column", md: "row" }}
        width={"100%"}
        height={"100%"}
      >
        <Stack
          maxWidth={{ xs: "100%", md: "50%" }}
          textAlign={"center"}
          sx={{
            bgcolor: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(8px)",
          }}
          height={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
          px={4}
        >
          <Typography
            variant="h1"
            textTransform={"uppercase"}
            fontFamily={'"Archivo Black", sans-serif'}
          >
            Think
          </Typography>

          <Stack direction={"row"}>
            <Typography
              variant="h1"
              textTransform={"uppercase"}
              fontFamily={'"Archivo Black", sans-serif'}
            >
              Big
            </Typography>
            <Typography
              variant="h1"
              fontFamily={'"Nothing You Could Do", cursive'}
              color="secondary.main"
            >
              ger!
            </Typography>
          </Stack>

          <Typography
            variant="h2"
            textTransform={"capitalize"}
            fontFamily={'"Noto Serif", serif'}
            fontWeight={700}
            sx={{ mt: 2, mb: 1 }}
          >
            All notes in one place
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
            fontFamily={"Fira Code"}
            px={{ xs: 2, md: 6 }}
          >
            Notely is your personal space to capture thoughts, explore ideas,
            and keep your mind organized and inspired.
          </Typography>

          <Stack
            direction={"row"}
            justifyContent={"center"}
            mt={"2rem"}
            spacing={2}
          >
            <Button
              color="secondary"
              variant="contained"
              sx={{
                fontSize: "1.3rem",
                fontWeight: 500,
              }}
              endIcon={<MdOutlineArrowOutward />}
            >
              Explore
            </Button>
            <Button
              color="primary"
              variant="outlined"
              sx={{
                fontSize: "1.3rem",
                fontWeight: 500,
              }}
              href="/register"
              endIcon={<MdOutlineArrowOutward />}
            >
              Get started
            </Button>
          </Stack>
        </Stack>
        <Stack
          width={{ xs: "100%", md: "50%" }}
          position="relative"
          height={"100%"}
          bgcolor={"rgba(0, 0, 0, 0.83)"}
        >
          <motion.img
            src="note1.jpg"
            alt="Note 1"
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            style={{
              width: "18rem",
              position: "absolute",
              top: 40,
              left: 50,
              zIndex: 4,
              borderRadius: 2,
            }}
          />

          <motion.img
            src="note3.png"
            alt="Note 3"
            initial={{ opacity: 0, y: -160 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            style={{
              width: "16rem",
              position: "absolute",
              top: 90,
              right: 130,
              zIndex: 3,
              borderRadius: 2,
            }}
          />

          <motion.img
            src="note4.jpg"
            alt="Note 4"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{
              width: "18rem",
              position: "absolute",
              bottom: 20,
              left: 160,
              zIndex: 1,
              borderRadius: 2,
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}

export default HeroSection;
