// import Retrievals from './Retrieval';
import TabsNMR from './NMR_tabs';
import {Typography, Col, Row } from 'antd';

const { Title } = Typography;

// import './App.css';

function App() {
  return (
    <div className="App">
      <Col span={23} offset={1}> {/* Adjusted the span and offset for centering */}
        <Row justify="center" >
          <Title level={1} >Welcome to SPECTRE(beta)</Title>
        </Row>
        
        <Row>
          <Title level={5} >SPECTRE is the latest transformer-based structure annotation model that accepts multiple types of NMR.</Title>
        </Row>

        <Row>
          <Title level={5} >Load the Kavaratamide A example using the button below to see how it works!</Title>
        </Row>
      </Col>
      <TabsNMR />
    </div>

  );
}

export default App;
