import React, { useState} from 'react';
import { Tabs, Spin, Input, Button, Col, Row, InputNumber, Space, Form, Card, Select, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import {HSQCFormatSelect} from "./HSQC_config_selection";
import FilterComponent from "./MW_filter";
const { Option } = Select;
// import 'antd/dist/antd.css';

const { TextArea } = Input;

export const renderTruncatedBulletList = (items) => {
    if (!Array.isArray(items)) return null;
  
    const limitedItems = items.slice(0, 15);
  
    return (
      <ul style={{ paddingLeft: '20px', textAlign: 'left' }}>
        {limitedItems.map((item, idx) => {
          const displayText = item.length > 50 ? item.slice(0, 50) + '...' : item;
          return <li key={idx}>{displayText}</li>;
        })}
        {items.length > 15 && (
          <li style={{ fontStyle: 'italic', color: '#666' }}>
            ... and {items.length - 15} more
          </li>
        )}
      </ul>
    );
};

  
const TabsNMR = () => {
  const [tabContent, setTabContent] = useState({
    HSQC: '',
    CNMR: '',
    HNMR: '',
    MolecularWeight: '',
    // k_samples: 50,
  });

  const [modelType, setModelType] = useState("auto");
  const [k_samples, setK_samples] = useState(10);
  const [MW_range, setMW_range] = useState(null);

  const [retrievals, setRetrievals] = useState([]);
  const textAreaSize = {  rows: 30, cols: 50  }
  const [NMRPlot, setNMRPlot] = useState()
  const [loading, setLoading] = useState(false);

  const [selectedHSQCFormat, setSelectedHSQCFormat] = useState(null);

  const handleInputChange = (key, value) => {
    setTabContent(prevContent => ({
      ...prevContent,
      [key]: value
    }));
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
        console.log("posting...")
        const body = JSON.stringify({
            "HSQC": tabContent.HSQC,
            "C_NMR": tabContent.CNMR,
            "H_NMR": tabContent.HNMR,
            "MW": tabContent.MolecularWeight,
            "HSQC_format": selectedHSQCFormat,
            "k_samples": k_samples,
            "MW_range":MW_range,
            "model_type": modelType
        });
        console.log("body",body)
        const response = await fetch('https://spectre.ucsd.edu/api/generate-retrievals', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: body
      });

      const data = await response.json();
      console.log(data)
    //   console.log(data.retrievals.length)
      setRetrievals(data["retrievals"]);
      setNMRPlot(data["NMR_plt"]);
    } catch (error) {
        console.log("I met err")
      console.error('Error generating retrievals:', error);
    }
    finally {
        setLoading(false);
    }
  };

  const Kavaratamide_HSQC_edited = '5.83,78.42,4007870.8\n5.29,52.74,2477564.5\n5.07,94.71,5094458.5\n4.84,53.99,2458403.5\n4.50,64.48,4654612.5\n3.96,69.02,1210801.5\n3.85,58.69,8687922\n3.05,31.9,7752678\n2.58,28.46,1884285.1\n2.37,43.03,-1524417.4\n2.30,43.03,-1059693.9\n2.23,28.93,1750482.9\n2.07,31.28,1766429.6\n1.54,37.07,-724940.2\n1.45,14.21,5557558.5\n1.43,25.64,-1316963.6\n1.43,37.07,-928229.2\n1.32,25.48,-1071096\n1.29,29.56,-4185597\n1.29,22.82,-1438192.6\n1.28,29.56,-4035465\n1.27,31.9,-1888439.8\n1.09,18.75,6450184\n1.05,19.85,6829019.5\n1.02,19.85,7853741\n0.93,16.09,5485368\n0.92,17.5,6387154.5\n0.88,14.21,3599970.2\n0.78,15.3,7132712\n'
  const Kavaratamide_HSQC_normal = Kavaratamide_HSQC_edited
    .trim()
    .split('\n')
    .map(line => line.split(',').slice(0, 2).join(','))
    .join('\n');

  const LoadKavaratamideA_edited = () => {
    setTabContent({
      HSQC: Kavaratamide_HSQC_edited,
      CNMR: '180.01, 172.93, 172.25, 171.14, 170.16, 169.14, 94.71, 78.41, 68.98, 64.37, 58.70, 53.87, 52.75, 42.90, 37.09, 31.95, 31.91, 31.26, 29.85, 29.68, 29.38, 28.87, 28.47, 25.60, 22.80, 19.81, 19.77, 18.84, 17.43, 16.09, 15.32, 14.27, 14.24',
      HNMR: '5.83, 5.29, 5.07, 4.84, 4.50, 3.96, 3.85, 3.05, 2.58, 2.37, 2.30, 2.23, 2.07, 1.54, 1.45, 1.43, 1.43, 1.32, 1.29, 1.29, 1.28, 1.27, 1.09, 1.05, 1.02, 0.93, 0.92, 0.88, 0.78',
      MolecularWeight: '609.0',
      k_samples: k_samples,
      MW_range: MW_range
    });
    setSelectedHSQCFormat('option1');
  };


  const LoadKavaratamideA_normal_HSQC = () => {
    setTabContent({
      HSQC: Kavaratamide_HSQC_normal,
      CNMR: '180.01, 172.93, 172.25, 171.14, 170.16, 169.14, 94.71, 78.41, 68.98, 64.37, 58.70, 53.87, 52.75, 42.90, 37.09, 31.95, 31.91, 31.26, 29.85, 29.68, 29.38, 28.87, 28.47, 25.60, 22.80, 19.81, 19.77, 18.84, 17.43, 16.09, 15.32, 14.27, 14.24',
      HNMR: '5.83, 5.29, 5.07, 4.84, 4.50, 3.96, 3.85, 3.05, 2.58, 2.37, 2.30, 2.23, 2.07, 1.54, 1.45, 1.43, 1.43, 1.32, 1.29, 1.29, 1.28, 1.27, 1.09, 1.05, 1.02, 0.93, 0.92, 0.88, 0.78',
      MolecularWeight: '609.0',
      k_samples: k_samples,
      MW_range: MW_range
    });
    setSelectedHSQCFormat('option1');
  };

  const tabItems = [
    {
      key: 'HSQC',
      label: 'HSQC',
      children: (
        <div>
        <HSQCFormatSelect initialFormat = {selectedHSQCFormat} setFormat={setSelectedHSQCFormat}/>
        <TextArea
          rows={textAreaSize.rows}
          value={tabContent.HSQC}
          onChange={e => handleInputChange('HSQC', e.target.value)}
          placeholder="Enter text for HSQC"
          style={{ width: `${textAreaSize.cols}ch` }}
        />
        </div>
      ),
    },
    {
      key: 'CNMR',
      label: '¹³C NMR',
      children: (
        <TextArea
          rows={textAreaSize.rows}
          value={tabContent.CNMR}
          onChange={e => handleInputChange('CNMR', e.target.value)}
          placeholder="Enter text for C NMR"
          style={{ width: `${textAreaSize.cols}ch` }}
        />
      ),
    },
    {
      key: 'HNMR',
      label: '¹H NMR',
      children: (
        <TextArea
          rows={textAreaSize.rows}
          value={tabContent.HNMR}
          onChange={e => handleInputChange('HNMR', e.target.value)}
          placeholder="Enter text for H NMR"
          style={{ width: `${textAreaSize.cols}ch` }}
        />
      ),
    },
    {
      key: 'MolecularWeight',
      label: 'Molecular Weight',
      children: (
        <TextArea
          rows={textAreaSize.rows}
          value={tabContent.MolecularWeight}
          onChange={e => handleInputChange('MolecularWeight', e.target.value)}
          placeholder="Enter text for MolecularWeight"
          style={{ width: `${textAreaSize.cols}ch` }}
        />
      ),
    },
  ];

  const [showMapping, setShowMapping] = useState(false);

  return (
    <div>
    <Row>
        <Col span={9} offset={1}>
            <Form layout="vertical">
                <Form.Item label={
                            <span>
                                Model Selection&nbsp;
                                <Tooltip title="By default(auto selection), the best-performing model will be selected based on the input data. If you want to always use the SPECTRE model, select 'SPECTRE'.">
                                <QuestionCircleOutlined style={{ color: '#1890ff' }} />
                                </Tooltip>
                            </span>
                            }>
                    <Select defaultValue="auto" onChange={setModelType}>
                    <Option value="auto">Auto Model Selection</Option>
                    <Option value="optional">SPECTRE</Option>
                    
                    </Select>
                </Form.Item>
            </Form> 

            <Button type="dashed" onClick={LoadKavaratamideA_edited} style={{ marginTop: '16px' }}>
              Load Example: Kavaratamide A (multiplicity-edited HSQC)
            </Button>
            <Button type="dashed" onClick={LoadKavaratamideA_normal_HSQC} style={{ marginTop: '16px' }}>
              Load Example: Kavaratamide A (Standard HSQC)
            </Button>
            <Tabs defaultActiveKey="HSQC" items={tabItems} />
            
            <Space direction="vertical" style={{ marginTop: '16px' }}>
                <Form.Item label="Number of Retrievals" style={{ margin: 0 }}>
                    <InputNumber
                        min={1}
                        parser={(value) => value.replace(/\D/g, '')}  // Ensures only positive integers
                        defaultValue={10}
                        style={{ width: '100px' }}
                        onChange={(value) => setK_samples(value)}
                    />
                </Form.Item>   
            
                <FilterComponent MW={tabContent.MolecularWeight} setMWRange={setMW_range}/>
            
                <button onClick={() => setShowMapping(!showMapping)}>
                    {showMapping ? 'Similarity map is showing, click to hide it' : 'Similarity map is hidden, click to show it'}
                </button>

                <Button type="primary" onClick={handleGenerate}>
                    Generate
                </Button>
            </Space>
        </Col>
        <Col span={12}>
        {loading ? (
            <Spin size="large"  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%'}}/>
        ) : 
            <div>
                { NMRPlot!=null && <div>
                    <h4 style={{ textAlign: 'center' }} >Plot of NMR data</h4>
                    <img key={0} src={`data:image/png;base64,${NMRPlot}`} alt={`NMR plot`} style={{ maxWidth: '100%', height: 'auto' }} />
                    <br />
                </div> }

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                    {retrievals.map((retrieval, index) => (
                    <Card
                        key={index}
                        title={`Retrieved Compound ${index + 1}`}
                        style={{ marginBottom: '24px', borderRadius: '12px' }}
                        bordered
                    >
                        <div key={index} style={{ margin: '10px', textAlign: 'center' }}>
                            {/* <h5>Retrieved Compound {index + 1}</h5> */}
                            <strong>Name:</strong>
                                {renderTruncatedBulletList(retrieval.name)}

                            <br /> 
                            <strong>SMILES: </strong> 
                                {retrieval['smile']}
                            <br />
                            <strong>Molecular Weight: </strong>  
                                {retrieval['MW'].toFixed(3)}
                            <br />
                            <strong>Predicted cosine similarity between retrival and prediction : </strong>
                                {retrieval['cos'].toFixed(4)}
                            <br />
                            <img
                                src={`data:image/png;base64,${showMapping ? retrieval['image_with_sim_map'] : retrieval['image_no_sim_map']}`}
                                alt={`Generated ${index}`}
                                style={{ maxWidth: '100%', height: 'auto' }}
                                />
                            <br />
                            <div style={{ textAlign: 'left', fontSize: '0.9rem', marginTop: '8px' }}>
                                <strong>NP Classification:</strong>
                                {retrieval['np_class']?.error ? (
                                    <div style={{ color: 'red', fontWeight: 'bold' }}>
                                        Error: NP Classifier API failed with this query SMILES.
                                    </div>
                                ) : (
                                    <ul style={{ paddingLeft: '20px' }}>
                                        <li><strong>Pathway:</strong> {retrieval['np_class']['pathway_results']?.join(', ') || 'N/A'}</li>
                                        <li><strong>Superclass:</strong> {retrieval['np_class']['superclass_results']?.join(', ') || 'N/A'}</li>
                                        <li><strong>Class:</strong> {retrieval['np_class']['class_results']?.join(', ') || 'N/A'}</li>
                                        <li><strong>Glycoside:</strong> {retrieval['np_class']['isglycoside'] ? 'Yes' : 'No'}</li>
                                    </ul>
                                )}
                            </div>
                        </div>
                    </Card>
                    ))}
                </div>

            </div>
        }
        </Col>
    </Row>
    </div>

  );
};

export default TabsNMR;
