import React from 'react';
import { Input } from '../components/ui';

const PlaceInput = ({ value, onChange }) => (
  <Input
    onChangeText={onChange}
    value={value}
    placeholder="Place Name"
  />
);

export default PlaceInput;
