import React, { useEffect, useState } from "react";
import closeIcon from "../../assets/closeIcon.svg";
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
import { getDb } from "../dbService";

const AddApointmentModal = ({ open, onClose, getPatientData }) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [patientArray, setPatientArray] = useState([]);
  const [patientName, setPatientName] = useState([]);
  const [db, setDb] = useState(null);
  const [formData, setFormData] = useState({
    patient_name: "",
    dept: "",
    dName: "",
    description: "",
    patient_id: "",
  });
  const [deptArray, setDeptArray] = useState([
    { id: "Orthopedics", name: "Orthopedics" },
    { id: "Cardiology", name: "Cardiology" },
    { id: "General", name: "General" },
  ]);
  const [doc, setDoc] = useState([]);

  useEffect(() => {
    if (formData?.dept?.length > 0) {
      formData?.dept === "Orthopedics"
        ? setDoc([
            { id: "Ravi", name: "Dr Ravi" },
            { id: "Ram", name: "Dr Ram" },
          ])
        : formData?.dept === "Cardiology"
        ? setDoc([
            { id: "Aditya", name: "Dr Aditya" },
            { id: "Vivek", name: "Dr Vivek" },
          ])
        : setDoc([
            { id: "Vikram", name: "Dr Vikram" },
            { id: "Priya", name: "Dr Priya" },
          ]);
    }
  }, [formData?.dept]);

  const getPatient = async (dbInstance = db) => {
    if (!dbInstance) return;
    try {
      const result = await dbInstance.query("SELECT * FROM patientsDB");
      setPatientArray(result?.rows || []);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    if (patientArray) {
      const patientNameArray = patientArray.map((item) => {
        return { id: item?.id, name: item?.name };
      });
      setPatientName(patientNameArray);
    }
  }, [patientArray]);

  useEffect(() => {
    async function initDb() {
      try {
        const dbInstance = await getDb();
        setDb(dbInstance);
        await getPatient(dbInstance);
      } catch (error) {
        console.error("Failed to initialize database:", error);
      }
    }
    initDb();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    try {
      const db = await getDb();
      const { patient_id, dept, dName, description } = formData;
      const pName = patientName?.find((item) => item?.id === patient_id);
      await db.exec(`
        INSERT INTO AppointmentDB (patient_id, patient_name, dept, dName, description)
        VALUES (${patient_id}, '${pName?.name}', '${dept}', '${dName}', '${description}');
        `);
      onClose();
      setFormData({});
      getPatientData();
    } catch (err) {
      console.error("failed to add patient", err);
    }
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <Box
        display="flex"
        flexDirection="column"
        width={isMobile ? "300px" : "436px"}
        padding={"24px 12px"}
        sx={{
          borderRadius: "8px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        }}
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
              Add appointment
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
            <FormControl fullWidth>
              <InputLabel
                id="demo-simple-select-label"
                sx={{
                  "&.Mui-focused": {
                    color: "#a3b18a",
                  },
                }}
              >
                <Box display="flex" flexDirection="row" gap="2px">
                  Patient name{" "}
                  <Typography sx={{ color: "#DE1135" }}>*</Typography>
                </Box>
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData?.patient_id}
                label="Patient Name"
                name="patient_id"
                onChange={handleChange}
                sx={{
                  height: "44px",
                  ".MuiSelect-select": {
                    display: "flex",
                    alignItems: "center",
                    height: "44px",
                    padding: "0 14px",
                  },
                  "& .MuiInputLabel-asterisk": {
                    color: "#DE1135",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#a3b18a",
                  },
                }}
              >
                {patientName?.map((item) => (
                  <MenuItem value={item?.id}>{item?.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel
                id="demo-simple-select-label"
                sx={{
                  "&.Mui-focused": {
                    color: "#a3b18a",
                  },
                }}
              >
                <Box display="flex" flexDirection="row" gap="2px">
                  Department{" "}
                  <Typography sx={{ color: "#DE1135" }}>*</Typography>
                </Box>
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData?.dept}
                label="Patient Name"
                name="dept"
                onChange={handleChange}
                sx={{
                  height: "44px",
                  ".MuiSelect-select": {
                    display: "flex",
                    alignItems: "center",
                    height: "44px",
                    padding: "0 14px",
                  },
                  "& .MuiInputLabel-asterisk": {
                    color: "#DE1135",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#a3b18a",
                  },
                }}
              >
                {deptArray?.map((item) => (
                  <MenuItem value={item?.id}>{item?.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel
                id="demo-simple-select-label"
                sx={{
                  "&.Mui-focused": {
                    color: "#a3b18a",
                  },
                }}
              >
                <Box display="flex" flexDirection="row" gap="2px">
                  Doctor name{" "}
                  <Typography sx={{ color: "#DE1135" }}>*</Typography>
                </Box>
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData?.dName}
                label="Doctor Name"
                name="dName"
                onChange={handleChange}
                disabled={formData?.dept?.length < 1}
                sx={{
                  height: "44px",
                  ".MuiSelect-select": {
                    display: "flex",
                    alignItems: "center",
                    height: "44px",
                    padding: "0 14px",
                  },
                  "& .MuiInputLabel-asterisk": {
                    color: "#DE1135",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#a3b18a",
                  },
                }}
              >
                {doc?.map((item) => (
                  <MenuItem value={item?.id}>{item?.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              id="outlined-basic"
              label="Description about illness"
              variant="outlined"
              onChange={handleChange}
              name="description"
              sx={{
                "& .MuiInputBase-root": {
                  height: "44px",
                },
                "& .MuiInputLabel-root": {
                  lineHeight: "1",
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#a3b18a",
                  },
                },
                "& label.Mui-focused": {
                  color: "#a3b18a",
                },
              }}
              multiline={4}
            />
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="end"
              gap="24px"
            >
              <Button
                variant="text"
                onClick={onClose}
                size="medium"
                sx={{ color: "#a3b18a" }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  onSubmit();
                }}
                disabled={
                  formData?.patient_id?.length < 1 ||
                  formData?.dName?.length < 1 ||
                  formData?.dept?.length < 1
                }
                size="medium"
                sx={{ backgroundColor: "#a3b18a" }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Dialog>
  );
};

export default AddApointmentModal;
