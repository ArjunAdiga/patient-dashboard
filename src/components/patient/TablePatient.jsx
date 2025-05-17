import { Box,  Divider, Typography } from "@mui/material";
import React from "react";
import ChildDataPatient from "./ChildDataPatient";

const TablePatient = ({ data,getPatientData }) => {
 
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
            Id
          </Typography>
        </Box>
        <Box width="30%">
          <Typography
            sx={{ color: "#1D2330", fontSize: "14px", fontWeight: 500 }}
          >
            Name
          </Typography>
        </Box>
        <Box width="10%">
          <Typography
            sx={{ color: "#1D2330", fontSize: "14px", fontWeight: 500 }}
          >
            Age
          </Typography>
        </Box>
        <Box width="10%">
          <Typography
            sx={{ color: "#1D2330", fontSize: "14px", fontWeight: 500 }}
          >
            Gender
          </Typography>
        </Box>
        <Box width="30%">
          <Typography
            sx={{ color: "#1D2330", fontSize: "14px", fontWeight: 500 }}
          >
            Ailment
          </Typography>
        </Box>
        <Box width="10%">
          <Typography></Typography>
        </Box>
      </Box>
      <Divider sx={{ marginTop: "8px", marginBottom: "12px" }} />
      {data?.map((item) => (
        <>
          <ChildDataPatient  item={item} getPatientData={getPatientData}/>
        </>
      ))}
     
    </>
  );
};

export default TablePatient;
