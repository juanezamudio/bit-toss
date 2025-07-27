import React, { useState, useEffect } from 'react';

interface Transaction {
  id: string;
  hash: string;
  timestamp: number;
}

const Explorer: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        // TODO: Replace with actual API call
        const mockTransactions: Transaction[] = [
          { id: '1', hash: '0x123...', timestamp: Date.now() }
        ];
        setTransactions(mockTransactions);
      } catch (error) {
        console.error('Error loading transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  return (
    <div className="explorer">
      <h1>ALKANES Explorer</h1>
      {loading ? (
        <p>Loading transactions...</p>
      ) : (
        <div className="transactions-list">
          {transactions.length === 0 ? (
            <p>No transactions found.</p>
          ) : (
            transactions.map((tx: any) => (
              <div key={tx.id} className="transaction-item">
                {/* Add transaction details here */}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Explorer;
