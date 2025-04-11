import React, { useState } from 'react';
import { Radio, InputNumber, Space } from 'antd';

const FilterComponent = ({MW, setMWRange}) => {
  MW = Number(MW);
  const [filterChoice, setFilterChoice] = useState('none'); // Default to 'No Filter'

  const handleFilterChange = (value) => {
    setFilterChoice(value);
    if (value === 'none') {
        setMWRange(null);
    }
  }

  return (
    <Space  direction="vertical" style={{ display: 'flex', flexDirection: 'column' }}>
      Choose a Filter for retrievals' molecular weights:
      <Radio.Group value={filterChoice} onChange={(e) => handleFilterChange(e.target.value)}>
        <Radio value="none">No Filter</Radio>
        <Radio value="absolute">Absolute retrieval weight range</Radio>
        <Radio value="relative">Relative retrieval weight range</Radio>
      </Radio.Group>

      {filterChoice === 'absolute' && (
            <InputNumber
                min={0}
                parser={(value) => value.replace(/[^\d.]/g, '')}  // Allows decimal increments
                defaultValue={20}
                style={{ width: '200px' }}
                addonBefore="±"
                addonAfter="amu"
                onChange={(value) => setMWRange([MW - value, MW + value])}
            />
      )}

      {filterChoice === 'relative' && (
          <InputNumber
            min={0}
            parser={(value) => value.replace(/[^\d.]/g, '')}  // Allows decimal increments
            defaultValue={20}
            style={{ width: '200px' }}
            addonBefore="±"
            addonAfter="%"
            onChange={(value) => setMWRange([MW - MW * (value/100), MW + MW * (value/100)])}
          />
          
      )}

    
    </Space>
  );
};

export default FilterComponent;
