import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import ellipsis from "../assets/ellipsis.png";

const TablePatient = ({ data }) => {
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
          <Box
            display="flex"
            flexDirection="row"
            width="100%"
            alignItems="center"
            gap="12px"
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
                sx={{ color: "#3D465A", fontSize: "14px", fontWeight: 400, }}
              >
                {item?.name}
              </Typography>
            </Box>
            <Box width="10%">
              <Typography
                sx={{ color: "#3D465A", fontSize: "14px", fontWeight: 400 }}
              >
                {item?.age}
              </Typography>
            </Box>
            <Box width="10%">
              <Typography
                sx={{ color: "#3D465A", fontSize: "14px", fontWeight: 400 }}
              >
                {item?.gender}
              </Typography>
            </Box>
            <Box width="30%">
              <Typography
                sx={{ color: "#3D465A", fontSize: "14px", fontWeight: 400 }}
              >
                {item?.ailment || "-"}
              </Typography>
            </Box>
            <Box width="10%">
              <Button>
                <img src={ellipsis} alt="actions" width={16} height={16}/>
              </Button>
            </Box>
          </Box>
          <Divider sx={{ marginTop: "8px", marginBottom: "12px" }} />
        </>
      ))}
    </>
  );
};

export default TablePatient;
