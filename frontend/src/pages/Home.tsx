import React, { useState, useEffect } from 'react';

interface BlockInfo {
  hash: string;
  number: number;
  timestamp: number;
  tx_count: number;
  size: number;
  merkle_root: string;
  prev_block: string;
}

const Home: React.FC = () => {
  const [activeButton, setActiveButton] = useState<'even' | 'odd' | null>(null);
  const [blocks, setBlocks] = useState<BlockInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        setLoading(true);
        setError(null);
        // Get latest block height
        const heightRes = await fetch('https://blockstream.info/api/blocks/tip/height');
        const latestHeight = parseInt(await heightRes.text(), 10);
        const blockInfos: BlockInfo[] = [];
        // Get last 10 blocks
        for (let i = 0; i < 10; i++) {
          const height = latestHeight - i;
          const hashRes = await fetch(`https://blockstream.info/api/block-height/${height}`);
          const hash = await hashRes.text();
          // Fetch block details
          const blockRes = await fetch(`https://blockstream.info/api/block/${hash}`);
          const blockData = await blockRes.json();
          blockInfos.push({
            hash,
            number: height,
            timestamp: blockData.timestamp,
            tx_count: blockData.tx_count,
            size: blockData.size,
            merkle_root: blockData.merkle_root,
            prev_block: blockData.prev_block,
          });
        }
        setBlocks(blockInfos);
      } catch (err) {
        setError('Failed to load blocks');
      } finally {
        setLoading(false);
      }
    };
    fetchBlocks();
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
    const now = Math.floor(Date.now() / 1000);
    const seconds = now - timestamp;
    if (seconds < 60) return `just now`;
    const hours = Math.floor(seconds / 3600);
    if (hours < 1) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} min ago`;
    }
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  };

  const truncate = (str?: string, len = 8) =>
    !str ? 'N/A' : str.length <= len * 2 ? str : `${str.slice(0, len)}...${str.slice(-len)}`;


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

      {loading ? (
        <div>Loading blocks...</div>
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : (
        <div className="block-info">
          <div className="block-info-header">
            <span className="block-info-title">Recent Blocks</span>
            <span>{blocks.length} blocks</span>
          </div>
          <div className="block-list">
            {blocks.map((block) => (
              <div key={block.hash} className="block-item" style={{
                border: '1px solid #e2e8f0', borderRadius: 8, marginBottom: 16, padding: 16, background: '#fff', boxShadow: '0 2px 6px #0001', maxWidth: 420, wordBreak: 'break-all'
              }}>
                <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Block #{block.number}</div>
                <div style={{ fontFamily: 'monospace', fontSize: 13, marginBottom: 2 }}>
                  <span style={{ color: '#555' }}>Hash:</span> {truncate(block.hash)}
                </div>
                <div style={{ color: '#666', fontSize: 13, marginBottom: 2 }}>
                  <span>Time:</span> {formatTimestamp(block.timestamp)}
                </div>
                <div style={{ color: '#666', fontSize: 13, marginBottom: 2 }}>
                  <span>Transactions:</span> {block.tx_count}
                </div>
                <div style={{ color: '#666', fontSize: 13, marginBottom: 2 }}>
                  <span>Size:</span> {block.size} bytes
                </div>
                <div style={{ color: '#666', fontSize: 13, marginBottom: 2 }}>
                  <span>Merkle Root:</span> {truncate(block.merkle_root)}
                </div>
                <div style={{ color: '#666', fontSize: 13 }}>
                  <span>Prev Block:</span> {truncate(block.prev_block)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
