import "./pending-page.css";
import { useState, useEffect } from "react";
import { fetchCompanies, addPendingUserToCompany } from "../../CompanyApi";
import PandingMessage from "./PandingMessage";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const PendingPage = ({ user }) => {
  const [companies, setCompanies] = useState([]);
  const [showPendingMessage, setShowPendingMessage] = useState(false);

  useEffect(() => {
    const getCompanies = async () => {
      const fetchedCompanies = await fetchCompanies();
      setCompanies(fetchedCompanies);
    };
    getCompanies();
  }, []);

  const onCompanySubmit = async (companyId) => {
    await addPendingUserToCompany(companyId, user._id);
    setShowPendingMessage(true);
  };

  return (
    <div id="pending-page-container">
      {companies && (
        <Autocomplete
          options={companies}
          sx={{ width: 300 }}
          onChange={(e, option) => onCompanySubmit(option._id)}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField {...params} label="Choose A Company" />
          )}
        />
      )}

      {showPendingMessage && <PandingMessage />}
    </div>
  );
};

export default PendingPage;
