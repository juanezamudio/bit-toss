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
  const [userGuess, setUserGuess] = useState<'even' | 'odd' | null>(null);
  const [resultMsg, setResultMsg] = useState<string | null>(null);
  const [lastCheckedBlock, setLastCheckedBlock] = useState<string | null>(null);

  useEffect(() => {
    const loadBlocks = async () => {
      try {
        const latestBlocks = await apiClient.getBlocks();
        setBlocks(latestBlocks.slice(0, 10));
      } catch (error) {
        console.error('Error loading blocks:', error);
      }
    };
    loadBlocks();
  }, []);

  // Effect: when blocks update, check if a new block has appeared
  useEffect(() => {
    if (blocks.length === 0 || !userGuess) return;
    const latestBlock = blocks[0];
    if (lastCheckedBlock && lastCheckedBlock === latestBlock.id) return;
    // Only run if user has made a guess and new block is here
    if (userGuess) {
      // Get last byte of hash (block.id is hex string)
      const hash = latestBlock.id;
      const lastByteHex = hash.slice(-2);
      const lastByte = parseInt(lastByteHex, 16);
      const isEven = lastByte % 2 === 0;
      const didWin = (userGuess === 'even' && isEven) || (userGuess === 'odd' && !isEven);
      // Random BTC loss between 0 and 1
      const btcLoss = (Math.random()).toFixed(8);
      setResultMsg(
        didWin
          ? `You WIN! The last bit was ${isEven ? 'EVEN' : 'ODD'}. You lost ${btcLoss} BTC (demo).`
          : `You LOSE! The last bit was ${isEven ? 'EVEN' : 'ODD'}. You lost ${btcLoss} BTC (demo).`
      );
      setActiveButton(null);
      setUserGuess(null);
      setLastCheckedBlock(latestBlock.id);
      // Clear message after 4 seconds
      setTimeout(() => setResultMsg(null), 4000);
    }
  }, [blocks]);

  const handleBlockCheck = (type: 'even' | 'odd') => {
    setActiveButton(type);
    setUserGuess(type);
    setResultMsg(null); // Clear previous result
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
          disabled={!!activeButton}
        >
          Even
        </button>
        <button 
          className={`block-button odd ${activeButton === 'odd' ? 'active' : ''}`}
          onClick={() => handleBlockCheck('odd')}
          disabled={!!activeButton}
        >
          Odd
        </button>
      </div>
      {resultMsg && (
        <div className="result-message">
          <p>{resultMsg}</p>
        </div>
      )}
      <div>
        <p>
          {activeButton
            ? `Selected: ${activeButton.toUpperCase()}`
            : resultMsg
              ? ''
              : 'Click a button to check the next block'}
        </p>
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
