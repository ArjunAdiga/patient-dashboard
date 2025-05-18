import { Box, Button, Divider, Paper, Popover, Typography } from "@mui/material";
import React, { useState } from "react";
import ellipsis from "../../assets/ellipsis.png";
import { getDb } from "../dbService";

const ChildAppointment = ({ item, getPatientData }) => {
    const [openPaper, setOpenPaper] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openAddModal, setOpenAddModal] = useState(false);
  
    const handleModal = () => {
      setOpenAddModal((prev) => !prev);
    };
  
    const handlepaperOpen = (event) => {
      setAnchorEl(event.currentTarget);
      setOpenPaper(true);
    };
    const handlepaperClose = () => {
      setOpenPaper(false);
      setAnchorEl(null);
    };
    const onDelete = async(id) => {
        const db = await getDb();
        await db.exec(`
        DELETE from AppointmentDB WHERE id=${id}
        `);
        getPatientData();
      }
  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        width="100%"
        alignItems="center"
        gap="12px"
        key={item?.id}
      >
        <Box width="10%">
          <Typography
            sx={{ color: "#3D465A", fontSize: "14px", fontWeight: 400 }}
          >
            {item?.id}
          </Typography>
        </Box>
        <Box width="30%">
          <Typography
            sx={{ color: "#3D465A", fontSize: "14px", fontWeight: 400 }}
          >
            {item?.patient_name}
          </Typography>
        </Box>
        <Box width="20%">
          <Typography
            sx={{ color: "#3D465A", fontSize: "14px", fontWeight: 400 }}
          >
            {item?.dept}
          </Typography>
        </Box>
        <Box width="15%">
          <Typography
            sx={{ color: "#3D465A", fontSize: "14px", fontWeight: 400 }}
          >
            {`Dr ${item?.dname}`}
          </Typography>
        </Box>
        <Box width="20%">
          <Typography
            sx={{ color: "#3D465A", fontSize: "14px", fontWeight: 400 }}
          >
            {item?.description || "-"}
          </Typography>
        </Box>
        <Box width="5%">
          <Button onClick={handlepaperOpen}>
            <img src={ellipsis} alt="actions" width={16} height={16} />
          </Button>
        </Box>
      </Box>
      <Divider sx={{ marginTop: "8px", marginBottom: "12px" }} />
      <Popover
        open={openPaper}
        onClose={handlepaperClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{ position: "absolute", zIndex: 100 }}
      >
        <Paper>
          <Box padding="12px" display="flex" flexDirection="column" gap="8px">
            <Typography
              sx={{ cursor: "pointer", color: "#3D465A", fontSize: "14px" }}
              onClick={() => onDelete(item?.id)}
            >
              Delete
            </Typography>
          </Box>
        </Paper>
      </Popover>
    </>
  );
};

export default ChildAppointment;
