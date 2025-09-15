// Mock data for OptionsSpread entity
const mockSpreads = [
  {
    id: 1,
    symbol: "AAPL",
    company_name: "Apple Inc.",
    spread_type: "bull_call_spread",
    expected_value: 125.50,
    max_profit: 250.00,
    max_loss: -125.00,
    profit_probability: 72.5,
    days_to_expiration: 23,
    strike_price_long: 180,
    strike_price_short: 185,
    premium_paid: 125.00,
    premium_received: 0
  },
  {
    id: 2,
    symbol: "MSFT",
    company_name: "Microsoft Corporation",
    spread_type: "bear_put_spread",
    expected_value: 89.25,
    max_profit: 200.00,
    max_loss: -110.75,
    profit_probability: 68.3,
    days_to_expiration: 31,
    strike_price_long: 420,
    strike_price_short: 415,
    premium_paid: 200.00,
    premium_received: 110.75
  },
  {
    id: 3,
    symbol: "GOOGL",
    company_name: "Alphabet Inc.",
    spread_type: "iron_condor",
    expected_value: 156.80,
    max_profit: 180.00,
    max_loss: -220.00,
    profit_probability: 81.2,
    days_to_expiration: 28,
    strike_price_long: 2800,
    strike_price_short: 2820,
    premium_paid: 220.00,
    premium_received: 180.00
  },
  {
    id: 4,
    symbol: "TSLA",
    company_name: "Tesla Inc.",
    spread_type: "calendar_spread",
    expected_value: 45.30,
    max_profit: 85.00,
    max_loss: -39.70,
    profit_probability: 58.7,
    days_to_expiration: 45,
    strike_price_long: 240,
    strike_price_short: 240,
    premium_paid: 85.00,
    premium_received: 39.70
  },
  {
    id: 5,
    symbol: "NVDA",
    company_name: "NVIDIA Corporation",
    spread_type: "butterfly_spread",
    expected_value: 78.90,
    max_profit: 150.00,
    max_loss: -71.10,
    profit_probability: 65.4,
    days_to_expiration: 19,
    strike_price_long: 900,
    strike_price_short: 920,
    premium_paid: 150.00,
    premium_received: 71.10
  }
];

export class OptionsSpread {
  static async list(sortBy = "-expected_value", limit = 100) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let sorted = [...mockSpreads];
    
    if (sortBy.startsWith('-')) {
      const field = sortBy.slice(1);
      sorted.sort((a, b) => b[field] - a[field]);
    } else {
      sorted.sort((a, b) => a[sortBy] - b[sortBy]);
    }
    
    return sorted.slice(0, limit);
  }
  
  static async get(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockSpreads.find(spread => spread.id === id);
  }
  
  static async create(data) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newSpread = {
      id: mockSpreads.length + 1,
      ...data,
      created_at: new Date().toISOString()
    };
    mockSpreads.push(newSpread);
    return newSpread;
  }
}
