import React, { useState } from 'react';
import { Input, Button, Row, Col, Card, Typography, Space, InputNumber, Spin, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { renderTruncatedBulletList } from './NMR_tabs';

const { Title, Text } = Typography;
const { TextArea } = Input;

const SMILESSearchTab = () => {
  const [smilesInput, setSmilesInput] = useState('');
  const [kSamples, setKSamples] = useState(10);
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showMapping, setShowMapping] = useState(false);

  const handleSearch = async () => {
    if (!smilesInput.trim()) {
      message.warning('Please enter a SMILES string');
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch('/api/search-retrievals-by-smiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          SMILES: smilesInput.trim(),
          k_samples: kSamples
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSearchResults(data.retrievals);
      message.success(`Found ${data.retrievals.length} similar structures`);
      
    } catch (error) {
      console.error('Search error:', error);
      message.error('Failed to search structures. Please try again.');
      setSearchResults(null);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSmilesInput('');
    setSearchResults(null);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Row justify="center">
        <Col span={22}>
          <Card title="SMILES Structure Search" size="large">
            <Spin spinning={loading} tip="Searching for similar structures...">
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div>
                <Title level={4}>Enter SMILES String:</Title>
                <TextArea
                  rows={3}
                  value={smilesInput}
                  onChange={(e) => setSmilesInput(e.target.value)}
                  onPressEnter={handleSearch}
                  placeholder="Enter your SMILES string here... "
                />
              </div>

              <div>
                <Title level={5}>Number of Similar Structures to Retrieve:</Title>
                <InputNumber
                  min={1}
                  max={100}
                  value={kSamples}
                  onChange={setKSamples}
                  style={{ width: 120 }}
                />
              </div>
              
              <Row gutter={16}>
                <Col>
                  <Button 
                    type="primary" 
                    icon={<SearchOutlined />}
                    onClick={handleSearch}
                    loading={loading}
                    disabled={!smilesInput.trim()}
                  >
                    Search Structure
                  </Button>
                </Col>
                <Col>
                  <Button onClick={handleClear}>
                    Clear
                  </Button>
                </Col>
              </Row>

              {searchResults && searchResults.length > 0 && (
                <div style={{ marginTop: 20 }}>
                  <div style={{ marginBottom: 16, textAlign: 'center' }}>
                    <Title level={4}>Search Results ({searchResults.length} matches found)</Title>
                    <button onClick={() => setShowMapping(!showMapping)}>
                      {showMapping ? 'Similarity map is showing, click to hide it' : 'Similarity map is hidden, click to show it'}
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                    {searchResults.map((retrieval, index) => (
                      <Card
                        key={index}
                        title={`Retrieved Compound ${index + 1}`}
                        style={{ marginBottom: '24px', borderRadius: '12px' }}
                        bordered
                      >
                        <div style={{ margin: '10px', textAlign: 'center' }}>
                          <strong>Name:</strong>
                                                          {renderTruncatedBulletList(retrieval.name)}
                          <br />
                          <strong>SMILES:</strong> {retrieval.smile}
                          <br />
                          <strong>Molecular Weight:</strong> {retrieval.MW ? retrieval.MW.toFixed(3) : 'N/A'}
                          <br />
                          <strong>Cosine Similarity:</strong> {retrieval.cos ? retrieval.cos.toFixed(4) : 'N/A'}
                          <br />
                          <img
                            src={`data:image/png;base64,${showMapping ? retrieval.image_with_sim_map : retrieval.image_no_sim_map}`}
                            alt={`Retrieved compound ${index + 1}`}
                            style={{ maxWidth: '100%', height: 'auto', marginTop: '10px' }}
                          />
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {searchResults && searchResults.length === 0 && (
                <div style={{ marginTop: 20 }}>
                  <Card title="No Results">
                    <Text>No similar structures found for the given SMILES string.</Text>
                  </Card>
                </div>
              )}
                          </Space>
            </Spin>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SMILESSearchTab;