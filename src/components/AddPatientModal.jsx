import {
  Box,
  Button,
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import closeIcon from "../assets/closeIcon.svg";
import { getDb } from "./dbService";

const AddPatientModal = ({ open, onClose, getPatientData }) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [formData, setFormData] = React.useState({
    name: "",
    age: "",
    gender: "",
    ailment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    try {
      const db = await getDb();
      const { name, age, gender, ailment } = formData;
      await db.exec(`
    INSERT INTO patientsDB (name,age,gender,ailment)
    VALUES ('${name}', ${parseInt(age)}, '${gender}', '${ailment}');
    `);
      getPatientData();
      onClose();
      setFormData({});
    } catch (err) {
      console.error("failed to add patient", err);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <Box
          display="flex"
          flexDirection="column"
          width={isMobile ? "300px" : "436px"}
          padding={"24px 12px"}
          sx={{ borderRadius: "8px",boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)" }}
        >
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            marginBottom="24px"
          >
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent={"center"}
              marginRight={"auto"}
              marginLeft={"auto"}
            >
              <Typography
                sx={{ color: "#1D2330", fontSize: "18px", fontWeight: 500 }}
              >
                Add patient
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent={"end"}
              sx={{ cursor: "pointer" }}
            >
              <img
                src={closeIcon}
                alt="close"
                height={22}
                width={22}
                onClick={onClose}
              />
            </Box>
          </Box>
          <form onSubmit={(e) => onSubmit()}>
            <Box display="flex" flexDirection="column" gap="12px">
              <TextField
                id="outlined-basic"
                label="Name"
                name="name"
                variant="outlined"
                onChange={handleChange}
                required
                sx={{
                  "& .MuiInputBase-root": {
                    height: "44px",
                  },
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      color: "red",
                    },
                }}
              />
              <TextField
                id="outlined-basic"
                label="Age"
                name="age"
                variant="outlined"
                onChange={handleChange}
                required
                sx={{
                  "& .MuiInputBase-root": {
                    height: "44px",
                  },
                }}
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData?.gender}
                  required
                  label="Gender"
                  name="gender"
                  onChange={handleChange}
                  sx={{
                    height: "44px",
                    ".MuiSelect-select": {
                      display: "flex",
                      alignItems: "center",
                      height: "44px",
                      padding: "0 14px",
                    },
                  }}
                >
                  <MenuItem value={"male"}>Male</MenuItem>
                  <MenuItem value={"female"}>Female</MenuItem>
                </Select>
              </FormControl>
              <TextField
                id="outlined-basic"
                label="Ailment"
                variant="outlined"
                onChange={handleChange}
                name="ailment"
                sx={{
                  "& .MuiInputBase-root": {
                    height: "44px",
                  },
                }}
              />
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="end"
                gap="24px"
              >
                <Button variant="outlined" onClick={onClose} size="medium">
                  cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    onSubmit();
                  }}
                  size="medium"
                  sx={{ backgroundColor: "#a3b18a" }}
                >
                  Save
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Dialog>
    </>
  );
};

export default AddPatientModal;
