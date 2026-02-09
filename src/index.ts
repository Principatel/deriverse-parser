import * as fs from 'fs';

function generateFullDeriverseDataset() {
  console.log('📊 Generating 200+ trades matching deriverse-insight-hub...');
  
  const markets = ['SOL-USDC', 'BTC-USDC', 'ETH-USDC', 'DRVS-USDC'];
  const traders = Array.from({length: 25}, (_, i) => `Trader${i+1}`);
  
  const trades = [];
  
  // Generate 200 trades with realistic patterns
  for (let i = 0; i < 200; i++) {
    const basePnL = Math.sin(i * 0.3) * 50 + (Math.random() - 0.5) * 100;
    trades.push({
      signature: `5Gk${i.toString(16).padStart(6, '0')}abc123...`,
      trader: traders[Math.floor(Math.random() * traders.length)],
      market: markets[Math.floor(Math.random() * markets.length)],
      side: Math.random() > 0.48 ? 'long' : 'short',
      size: (1 + Math.random() * 100).toFixed(2),
      price: (100 + Math.random() * 300).toFixed(2),
      pnl: basePnL.toFixed(2),
      fee: (0.0003 + Math.random() * 0.0008).toFixed(6),
      volume: (10 + Math.random() * 500).toFixed(2),
      blockTime: new Date(Date.now() - i * 2 * 3600000).toLocaleString(), // 2hr intervals
      timestamp: new Date(Date.now() - i * 2 * 3600000).toISOString()
    });
  }
  
  fs.writeFileSync('deriverse-trades.json', JSON.stringify(trades, null, 2));
  
  const totalPnL = trades.reduce((sum, t) => sum + parseFloat(t.pnl), 0);
  const winRate = trades.filter(t => parseFloat(t.pnl) > 0).length / trades.length * 100;
  
  console.table({
    totalTrades: trades.length,
    totalPnL: `$${totalPnL.toFixed(2)}`,
    winRate: `${winRate.toFixed(1)}%`,
    avgDailyVolume: `${(trades.reduce((sum, t) => sum + parseFloat(t.volume), 0) / 30).toFixed(0)}`
  });
  
  console.log('✅ 200 trades saved → deriverse-trades.json');
  console.log('🎯 Matches deriverse-insight-hub data volume!');
}

generateFullDeriverseDataset();
