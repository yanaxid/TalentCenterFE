/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// src/components/FilterSelect.js
import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const FilterSelect = ({ id, label, value, onChange, options }) => {
  return (
    <FormControl
      sx={{
        m: 1,
        minWidth: 130,
        backgroundColor: "rgba(255,255,255,1)",
      }}
      size="small"
    >
      <InputLabel id={id}>{label}</InputLabel>
      <Select
        labelId={id}
        id={id}
        value={value}
        label={label}
        onChange={onChange}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterSelect;
