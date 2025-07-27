import React, { useState, useEffect } from 'react';
import apiClient from '../services/api';

interface Transaction {
  id: string;
  hash: string;
  timestamp: number;
}

const Explorer: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const blocks = await apiClient.getBlocks(10);
        const txs = blocks.map((block: any) => ({
          id: block.id,
          hash: block.hash,
          timestamp: block.timestamp || Date.now()
        }));
        
        setTransactions(txs);
        setError(null);
      } catch (error) {
        console.error('Error loading transactions:', error);
        setError('Failed to load transactions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  if (loading) {
    return <div>Loading transactions...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="explorer">
      <h2>Recent Transactions</h2>
      <div className="transactions-list">
        {transactions.map((tx) => (
          <div key={tx.id} className="transaction-item">
            <div>Hash: {tx.hash}</div>
            <div>Time: {new Date(tx.timestamp).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Explorer;
