// import Retrievals from './Retrieval';
import TabsNMR from './NMR_tabs';
import {Typography, Col, Row } from 'antd';

const { Title,Paragraph } = Typography;

// import './App.css';

function App() {
  return (
    <div className="App">
      <Col span={23} offset={1}>
        <Row justify="center">
          <Title level={1}>Welcome to SPECTRE</Title>
        </Row>

        <Row>
          <Title level={3}>
            SPECTRE is the latest transformer-based structure annotation model that accepts multiple types of NMR.
          </Title>
        </Row>

        
        <Row>
          <Title level={4}>
            Load the Kavaratamide A example using the button below to see how it works!
          </Title>
        </Row>

      </Col>
      <TabsNMR />
      <Col span={23} offset={1}>
        <Row style={{ marginTop: 40 }}>
          <Paragraph italic style={{ width: '100%' }}>
            This work was made possible in part by spectral data and software tools provided by ACD Labs. We thank them for their support in advancing our research in NMR-based molecular identification.
          </Paragraph>
        </Row>
      </Col>
    </div>
  );
}
export default App;
