import React, { useState } from 'react';

interface BlockInfo {
  hash: string;
  number: number;
  timestamp: number;
}

const Home: React.FC = () => {
  const [activeButton, setActiveButton] = useState<'even' | 'odd' | null>(null);
  const blocks: BlockInfo[] = [
    // Placeholder data
    { hash: '0x1234...5678', number: 12345678, timestamp: Date.now() - 60000 },
    { hash: '0xabcd...efgh', number: 12345677, timestamp: Date.now() - 120000 },
    { hash: '0x9876...5432', number: 12345676, timestamp: Date.now() - 180000 },
  ];

  const handleBlockCheck = (type: 'even' | 'odd') => {
    // TODO: Add blockchain interaction here
    setActiveButton(type);
    
    // Reset after 2 seconds for demo purposes
    setTimeout(() => {
      setActiveButton(null);
    }, 2000);
  };

  const formatTimestamp = (timestamp: number): string => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes} minutes ago`;
  };

  return (
    <div className="home">
      <div>
        <h1>Welcome to BitToss!</h1>
        <p>Explore and interact with the Alkanes metaprotocol on the Bitcoin blockchain.</p>
      </div>
      
      <div className="block-buttons">
        <button 
          className={`block-button even ${activeButton === 'even' ? 'active' : ''}`}
          onClick={() => handleBlockCheck('even')}
        >
          Even
        </button>
        <button 
          className={`block-button odd ${activeButton === 'odd' ? 'active' : ''}`}
          onClick={() => handleBlockCheck('odd')}
        >
          Odd
        </button>
      </div>
      
      <div>
        <p>{activeButton ? `Selected: ${activeButton.toUpperCase()}` : 'Click a button to check the next block'}</p>
      </div>

      <div className="block-info">
        <div className="block-info-header">
          <span className="block-info-title">Recent Blocks</span>
          <span>{blocks.length} blocks</span>
        </div>
        <div className="block-list">
          {blocks.map((block) => (
            <div key={block.hash} className="block-item">
              <div>
                <div className="block-hash">{block.hash}</div>
                <div className="block-number">Block #{block.number}</div>
              </div>
              <div>{formatTimestamp(block.timestamp)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
