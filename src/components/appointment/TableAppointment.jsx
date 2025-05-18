import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import ChildAppointment from "./ChildAppointment";

const TableAppointment = ({ data ,getPatientData}) => {
  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        width="100%"
        alignItems="center"
        gap="12px"
      >
        <Box width="10%">
          <Typography
            sx={{ color: "#1D2330", fontSize: "14px", fontWeight: 500 }}
          >
            Ap.Id
          </Typography>
        </Box>
        <Box width="30%">
          <Typography
            sx={{ color: "#1D2330", fontSize: "14px", fontWeight: 500 }}
          >
            Patient Name
          </Typography>
        </Box>
        <Box width="20%">
          <Typography
            sx={{ color: "#1D2330", fontSize: "14px", fontWeight: 500 }}
          >
            Department
          </Typography>
        </Box>
        <Box width="15%">
          <Typography
            sx={{ color: "#1D2330", fontSize: "14px", fontWeight: 500 }}
          >
            Doctor name
          </Typography>
        </Box>
        <Box width="20%">
          <Typography
            sx={{ color: "#1D2330", fontSize: "14px", fontWeight: 500 }}
          >
            Description
          </Typography>
        </Box>
        <Box width="5%">
          <Typography></Typography>
        </Box>
      </Box>
      <Divider sx={{ marginTop: "8px", marginBottom: "12px" }} />

      {data?.map((item) => (
        <>
          <ChildAppointment item={item} getPatientData={getPatientData}/>
        </>
      ))}
    </>
  );
};

export default TableAppointment;
