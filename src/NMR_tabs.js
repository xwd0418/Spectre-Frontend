import React, { useState } from 'react';
import { Tabs, Spin, Input, Button, Row, Col, InputNumber, Space, Form } from 'antd';
import {HSQCFormatSelect} from "./HSQC_config_selection";
// import 'antd/dist/antd.css';

const { TextArea } = Input;

const TabsNMR = () => {
  const [tabContent, setTabContent] = useState({
    HSQC: '',
    CNMR: '',
    HNMR: '',
    MolecularWeight: '',
    k_samples: 50
  });

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
            "k_samples": tabContent.k_samples
        });
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

  const LoadKavaratamideA = () => {
    setTabContent({
      HSQC: '5.83,78.42,4007870.8\n5.29,52.74,2477564.5\n5.07,94.71,5094458.5\n4.84,53.99,2458403.5\n4.50,64.48,4654612.5\n3.96,69.02,1210801.5\n3.85,58.69,8687922\n3.05,31.9,7752678\n2.58,28.46,1884285.1\n2.37,43.03,-1524417.4\n2.30,43.03,-1059693.9\n2.23,28.93,1750482.9\n2.07,31.28,1766429.6\n1.54,37.07,-724940.2\n1.45,14.21,5557558.5\n1.43,25.64,-1316963.6\n1.43,37.07,-928229.2\n1.32,25.48,-1071096\n1.29,29.56,-4185597\n1.29,22.82,-1438192.6\n1.28,29.56,-4035465\n1.27,31.9,-1888439.8\n1.09,18.75,6450184\n1.05,19.85,6829019.5\n1.02,19.85,7853741\n0.93,16.09,5485368\n0.92,17.5,6387154.5\n0.88,14.21,3599970.2\n0.78,15.3,7132712\n',
      CNMR: '180.01, 172.93, 172.25, 171.14, 170.16, 169.14, 94.71, 78.41, 68.98, 64.37, 58.70, 53.87, 52.75, 42.90, 37.09, 31.95, 31.91, 31.26, 29.85, 29.68, 29.38, 28.87, 28.47, 25.60, 22.80, 19.81, 19.77, 18.84, 17.43, 16.09, 15.32, 14.27, 14.24',
      HNMR: '6.55, 6.53, 5.82, 5.81, 5.31, 5.30, 5.28, 5.27, 5.07, 4.85, 4.84, 4.83, 4.82, 4.50, 4.50, 3.95, 3.85, 3.85, 3.04, 2.60, 2.59, 2.58, 2.57, 2.39, 2.37, 2.36, 2.31, 2.29, 2.28, 2.26, 2.24, 2.24, 2.23, 2.22, 2.22, 2.21, 2.08, 2.07, 2.06, 2.05, 1.56, 1.55, 1.53, 1.51, 1.46, 1.45, 1.10, 1.08, 1.05, 1.04, 1.02, 1.00, 0.93, 0.91, 0.90, 0.90, 0.89, 0.88, 0.86, 0.78, 0.77',
      MolecularWeight: '609.0',
      k_samples: tabContent.k_samples
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
      label: 'C-13 NMR',
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
      label: 'H-1 NMR',
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

  return (
    <div>
        <Row gutter={16}>
        <Col span={9} offset={1}>
            <Tabs defaultActiveKey="HSQC" items={tabItems} />
            <Button type="primary" onClick={LoadKavaratamideA} style={{ marginTop: '16px' }}>
              Load Example: Kavaratamide A
            </Button>
            <br />
            <Space style={{ marginTop: '16px' }}>
                <Form.Item label="Number of Retrievals" style={{ margin: 0 }}>
                    <InputNumber
                        min={1}
                        parser={(value) => value.replace(/\D/g, '')}  // Ensures only positive integers
                        defaultValue={50}
                        style={{ width: '160px' }}
                        onChange={(value) => handleInputChange('k_samples', value)}
                    />
                </Form.Item>
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
                    <h4>Plot of NMR data</h4>
                    <img key={0} src={`data:image/png;base64,${NMRPlot}`} alt={`NMR plot`} style={{ maxWidth: '100%', height: 'auto' }} />
                    <br />
                </div> }

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                    {retrievals.map((retrieval, index) => (
                        <div key={index} style={{ margin: '10px', textAlign: 'center' }}>
                        <h5>Retrieved Compound {index + 1}</h5>
                        Name : {retrieval['name']}
                        <br /> 
                        SMILES : {retrieval['smile']}
                        <br />
                        Molecular Weight : {retrieval['MW']}
                        <br />
                        cosine similarity between retrival and prediction : {retrieval['cos']}
                        <br />
                        <img key={index} src={`data:image/png;base64,${retrieval['image']}`} alt={`Generated ${index}`} style={{ maxWidth: '100%', height: 'auto' }} />
                        <br />
                        </div>
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
