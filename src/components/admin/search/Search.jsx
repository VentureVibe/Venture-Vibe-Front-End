import React from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

const DropdownOnly = () => {
  const navigate = useNavigate();

  const handleSelectionChange = (event, value) => {
    const routes = {
      "Dashboard Overview": "/",
      "User Management": "/users",
      "Event Organizer Listings": "/service-providers",
      "Travel Guide Listings": "/travel-guide",
      "Content Oversight": "/content",
      "Financial Insights": "/financials",
      Reports: "/reports",
      Recommendations: "/recommendations",
      Settings: "/settings",
    };

    if (value && routes[value]) {
      navigate(routes[value]);
    }
  };

  return (
    <Stack sx={{ width: 300 }}>
      <Autocomplete
        id="dropdown-navigation"
        disableClearable
        options={topTitles.map((option) => option.title)}
        onChange={handleSelectionChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Navigate to"
            sx={{
              "& .MuiInputBase-root": {
                backgroundColor: "white",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ccc",
              },
            }}
          />
        )}
      />
    </Stack>
  );
};

const topTitles = [
  { title: "Dashboard Overview" },
  { title: "User Management" },
  { title: "Event Organizer Listings" },
  { title: "Travel Guide Listings" },
  { title: "Content Oversight" },
  { title: "Financial Insights" },
  { title: "Reports" },
  { title: "Recommendations" },
  { title: "Settings" },
];

export default DropdownOnly;
