import { Select } from 'antd';

const { Option } = Select;

const HSQCFormatSelect = (props) => {
  const HSQCFormat = props.initialFormat;
  const setHSQCFormat = props.setFormat;

//   useEffect(() => {
//     setHSQCFormat(props.initialFormat);
//   }, [props]);

  const handleChange = (value) => {
    setHSQCFormat(value);
  };

  return (
    <div style={{ width: 200, margin: '20px 0' }}>
        <h3>HSQC Input Format</h3>
      <Select
        placeholder="Select HSQC input format"
        onChange={handleChange}
        value={HSQCFormat}
        style={{ width: '100%' }}
      >
        <Option value="option1">¹H, ¹³C, peak intensity</Option>
        <Option value="option2">¹³C, ¹H, peak intensity</Option>
        {/* <Option value="option3">¹H, ¹³C</Option>
        <Option value="option4">¹³C, ¹H</Option> */}
      </Select>
      {/* {selectedOption && <div style={{ marginTop: '10px' }}>Selected: {selectedOption}</div>} */}
    </div>
  );
};

const MultiOptionSelect = () => {
//   const [selectedOptions, setSelectedOptions] = useState([]);

//   const handleChange = (value) => {
//     setSelectedOptions(value);
//   };

//   return (
//     <div style={{ width: 200, margin: '20px 0' }}>
//       <Select
//         mode="multiple"
//         placeholder="Select options"
//         onChange={handleChange}
//         value={selectedOptions}
//         style={{ width: '100%' }}
//       >
//         <Option value="option1">Option 1</Option>
//         <Option value="option2">Option 2</Option>
//         <Option value="option3">Option 3</Option>
//       </Select>
//       {selectedOptions.length > 0 && (
//         <div style={{ marginTop: '10px' }}>Selected: {selectedOptions.join(', ')}</div>
//       )}
//     </div>
//   );
};

export { HSQCFormatSelect, MultiOptionSelect };
