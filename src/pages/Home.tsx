import React, { useState, useEffect } from 'react';
import apiClient from '../services/api';

interface Block {
  id: string;
  height: number;
  version: number;
  timestamp: number;
  tx_count: number;
  size: number;
  weight: number;
  merkle_root: string;
  previousblockhash: string;
  mediantime: number;
  nonce: number;
  bits: number;
  difficulty: number;
}

const truncateHash = (hash: string, len = 8) => {
  if (!hash) return '';
  return hash.length > len * 2
    ? `${hash.slice(0, len)}...${hash.slice(-len)}`
    : hash;
};

const Home: React.FC = () => {
  const [activeButton, setActiveButton] = useState<'even' | 'odd' | null>(null);
  const [blocks, setBlocks] = useState<Block[]>([]);

  useEffect(() => {
    const loadBlocks = async () => {
      try {
        const latestBlocks = await apiClient.getBlocks();
        setBlocks(latestBlocks.slice(0, 10)); // Get last 3 blocks
      } catch (error) {
        console.error('Error loading blocks:', error);
      }
    };

    loadBlocks();
  }, []);

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
            <div key={block.id} className="block-item">
              <div className="block-main-info">
                <div className="block-hash">x{truncateHash(block.id)}</div>
                <div className="block-number">Block #{block.height}</div>
                <div className="block-time">{formatTimestamp(block.timestamp * 1000)}</div>
              </div>
              <div className="block-details">
                <div><strong>Transactions:</strong> {block.tx_count}</div>
                <div><strong>Size:</strong> {block.size} bytes</div>
                <div><strong>Previous:</strong> {truncateHash(block.previousblockhash)}</div>
                <div><strong>Nonce:</strong> {block.nonce}</div>
                <div><strong>Bits:</strong> {block.bits}</div>
                <div><strong>Difficulty:</strong> {block.difficulty}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
