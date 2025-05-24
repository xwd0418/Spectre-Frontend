// import Retrievals from './Retrieval';
import TabsNMR from './NMR_tabs';
import SMILESSearchTab from './SMILES_search_tab'; // Import your new component
import { Typography, Col, Row, Tabs } from 'antd';

const { Title, Paragraph } = Typography;

// import './App.css';

function App() {
  const tabItems = [
    {
      key: 'nmr',
      label: 'NMR Analysis',
      children: <TabsNMR />
    },
    {
      key: 'smiles',
      label: 'Retrival Database Search based on SMILES',
      children: <SMILESSearchTab />
    }
  ];

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

      </Col>

      <Tabs 
        defaultActiveKey="nmr"
        items={tabItems}
        size="large"
        centered
        style={{ marginTop: 20 }}
      />

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