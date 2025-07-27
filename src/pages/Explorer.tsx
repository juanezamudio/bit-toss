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

const Explorer: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlocks = async () => {
      try {
        const height = await apiClient.getLatestBlockHeight();
        const latestBlocks = await apiClient.getBlocks(parseInt(height));
        setBlocks(latestBlocks);
      } catch (error) {
        console.error('Error loading blocks:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBlocks();
  }, []);

  const getBlockColor = (hash: string) => {
    const lastChar = hash.slice(-1);
    if (parseInt(lastChar, 16) % 2 === 0) {
      return 'red';
    }
    return 'green';
  };

  return (
    <div className="explorer">
      <h1>BitToss Explorer</h1>
      {loading ? (
        <p>Loading blocks...</p>
      ) : (
        <div className="blocks-grid">
          {blocks.length === 0 ? (
            <p>No blocks found.</p>
          ) : (
            blocks.map((block: Block) => (
              <div
                key={block.id}
                className="block-item"
                style={{ backgroundColor: getBlockColor(block.id) }}
              >
                <p>Height: {block.height}</p>
                <p>Timestamp: {new Date(block.timestamp * 1000).toLocaleString()}</p>
                <p>Transactions: {block.tx_count}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Explorer;
