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
  const [expandedBlock, setExpandedBlock] = useState<string | null>(null);
  const [btcAtStake, setBtcAtStake] = useState<{ [blockId: string]: string }>({});

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
      return 'green';
    }
    return 'red';
  };

  const truncateHash = (hash: string, len = 8) => {
    if (!hash) return '';
    return hash.length > len * 2
      ? `${hash.slice(0, len)}...${hash.slice(-len)}`
      : hash;
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
            blocks.map((block: Block) => {
              const isExpanded = expandedBlock === block.id;
              // Use last byte for even/odd
              const lastByte = parseInt(block.id.slice(-2), 16);
              const isEven = lastByte % 2 === 0;
              const status = isEven ? 'Even' : 'Odd';
              const btcValue = btcAtStake[block.id] || '';
              return (
                <div
                  key={block.id}
                  className={`block-item${isExpanded ? ' expanded' : ''}`}
                  style={{ backgroundColor: getBlockColor(block.id), cursor: 'pointer' }}
                  onClick={() => {
                    if (expandedBlock === block.id) {
                      setExpandedBlock(null);
                    } else {
                      setExpandedBlock(block.id);
                      // Only generate BTC value if not already set for this expansion
                      setBtcAtStake(prev => ({ ...prev, [block.id]: (Math.random()).toFixed(8) }));
                    }
                  }}
                >
                  <p>x{truncateHash(block.id)}</p>
                  <p>{new Date(block.timestamp * 1000).toLocaleString()}</p>
                  <p>Transactions: {block.tx_count}</p>
                  {isExpanded && (
                    <div className="block-extra">
                      <p><strong>Status:</strong> {status} block (last byte: {block.id.slice(-2)})</p>
                      <p><strong>BTC at stake:</strong> {btcValue} BTC</p>
                      <p><strong>Block Height:</strong> {block.height}</p>
                      <p><strong>Nonce:</strong> {block.nonce}</p>
                      <p><strong>Difficulty:</strong> {block.difficulty}</p>
                      <p><strong>Previous Hash:</strong> x{truncateHash(block.previousblockhash)}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default Explorer;
