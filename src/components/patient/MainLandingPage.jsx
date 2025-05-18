import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import EMPTYTABLE from "../../assets/emptyTable.svg";
import AddPatientModal from "./AddPatientModal";
import { getDb } from "../dbService";
import TablePatient from "./TablePatient";

const MainLandingPage = () => {
  const [db, setDb] = useState(null);
  const [patients, setPatients] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [loading, setLoading] = useState(true);
 
  const handleModal = () => {
    setOpenAddModal((prev) => !prev);
  };

  useEffect(() => {
    async function initDb() {
      try {
        setLoading(true);
        const dbInstance = await getDb();
        setDb(dbInstance);
        await getPatientData(dbInstance);
        setLoading(false);
      } catch (error) {
        console.error("Failed to initialize database:", error);
        setLoading(false);
      }
    }
    initDb();
  }, []);

  const getPatientData = async (dbInstance = db) => {
    if (!dbInstance) return;
    try {
      const result = await dbInstance.query("SELECT * FROM patientsDB");
      setPatients(result?.rows || []);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };


  return (
    <>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="50vh"
        >
          <CircularProgress sx={{color:"#a3b18a"}} />
        </Box>
      ) : (
        <Box sx={{ padding: "18px" }} display="flex" flexDirection="column">
          <Box display="flex" justifyContent="space-between" marginTop="12px">
            <Typography
              sx={{ fontWeight: 600, color: "#1D2330", fontSize: "20px" }}
            >
              Patients dashboard
            </Typography>
            {patients?.length > 0 && (
              <Button
                variant="contained"
                onClick={handleModal}
                sx={{ backgroundColor: "#a3b18a" }}
              >
                Add patient
              </Button>
            )}
          </Box>
          {patients?.length === 0 ? (
            <Box
              display={"flex"}
              justifyContent="center"
              alignItems="center"
              width={"100%"}
            >
              <Box
                display={"flex"}
                justifyContent="center"
                alignItems="center"
                height="50vh"
                flexDirection="column"
                gap="8px"
              >
                <img src={EMPTYTABLE} alt="noData" />
                <Typography
                  sx={{ fontSize: "14px", color: "#3D465A", fontWeight: 500 }}
                >
                  No patients to see
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleModal}
                  sx={{ backgroundColor: "#a3b18a" }}
                >
                  Add patient
                </Button>
              </Box>
            </Box>
          ) : (
            <Box marginTop={"24px"}>
              <TablePatient data={patients} getPatientData={getPatientData}/>
            </Box>
          )}
        </Box>
      )}
      {openAddModal && (
        <AddPatientModal
          open={openAddModal}
          onClose={handleModal}
          getPatientData={getPatientData}
        />
      )}
    </>
  );
};

export default MainLandingPage;
