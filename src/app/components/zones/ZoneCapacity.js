import {FormControl, InputLabel, MenuItem, Select, Input} from '@mui/material';
import React from 'react';

function ZoneCapacity() {
  return (
    <div className="row">
      <div className="col-sm-4 d-flex align-items-center ">
        <p className="mt-4" style={{fontSize: '1.1rem', fontWeight: '400'}}>
          Sunday
        </p>
      </div>
      <div className="col-sm-4">
        <FormControl
          className="m-2 "
          fullWidth
          required
          variant="standard"
          sx={{minWidth: 120}}>
          <InputLabel id="status">Slot Id</InputLabel>
          <Select labelId="isActive" id="isActive" label="Is Active">
            <MenuItem value={true} className="d-block p-2">
              True
            </MenuItem>
            <MenuItem value={false} className="d-block p-2">
              false
            </MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="col-sm-4">
        <FormControl
          className="m-2 "
          fullWidth
          required
          variant="standard"
          sx={{minWidth: 120}}>
          <InputLabel htmlFor="my-input">Capacity</InputLabel>
          <Input
            required
            fullWidth
            margin="dense"
            id="totalShareCount"
            label="Total Share Count"
            type="text"
          />
        </FormControl>
      </div>
    </div>
  );
}

export default ZoneCapacity;
