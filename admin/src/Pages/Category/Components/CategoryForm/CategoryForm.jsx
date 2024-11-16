import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

const CategoryForm = ({
  formFields,
  handleInputChange,
  formErrors,
  bgColor,
}) => (
  <div className="form-group">
    <h6 className="mb-2">CATEGORY NAME</h6>
    <input
      type="text"
      name="name"
      value={formFields.name}
      onChange={handleInputChange}
      className={formErrors.name ? 'input-error' : ''}
    />
    {formErrors.name && (
      <span className="error-message">{formErrors.name}</span>
    )}
    <h6 className="mb-2">CATEGORY COLOR</h6>
    <FormControl fullWidth variant="outlined">
      <InputLabel id="color-select-label"></InputLabel>
      <Select
        labelId="color-select-label"
        id="color-select"
        value={formFields.color}
        onChange={handleInputChange}
        name="color"
        className={formErrors.color ? 'input-error' : ''}
      >
        {bgColor.map((colorCode, index) => (
          <MenuItem
            key={index}
            value={colorCode}
            style={{ backgroundColor: colorCode }}
          >
            {colorCode}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    {formErrors.color && (
      <span className="error-message">{formErrors.color}</span>
    )}
  </div>
);

export default CategoryForm;
