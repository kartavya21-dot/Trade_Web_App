export const marketsContent = {
  badge: "Live Markets",
  heading: "Trade top assets in real time",
  headers: {
    market: "Market",
    price: "Price (INR)",
    change: "24h Change"
  },
  whatsapp: {
    phoneNumber: "919876543210",
    messageTemplate: (name) => `Hello,\n\nI am interested in starting my trading journey. I want info related to ${name}\n\nPlease get in touch with me for onboarding.`
  },
  markets: [
    [
      { name: "NIFTY", price: "24,196.40", change: "+2.34%", up: true },
      { name: "SENSEX", price: "77,988.75", change: "+1.87%", up: true },
      { name: "BANK NIFTY", price: "56,086.30", change: "-0.92%", up: false },
      { name: "FINIFTY", price: "26,343.10", change: "+3.12%", up: true },
      { name: "NIFTY 100", price: "25,042.30", change: "-1.45%", up: false }
    ],
    [
      { name: "RELIANCE", price: "24,196.40", change: "+2.34%", up: true },
      { name: "SBIN", price: "11,988.75", change: "+1.27%", up: true },
      { name: "ADANIENSOL", price: "4,388.75", change: "-1.01%", up: false },
      { name: "ADANIENT", price: "7,988.75", change: "+4.87%", up: true },
      { name: "ADANIPORTS", price: "7,788.75", change: "+0.7%", up: true }
    ],
    [
      { name: "GOLD", price: "1,53,102.00", change: "+2.34%", up: true },
      { name: "SILVER", price: "2,51,542.01", change: "+1.37%", up: true },
      { name: "CRUDEOIL", price: "8,461.00", change: "-1.01%", up: false },
      { name: "NATURALGAS", price: "250.1", change: "+4.87%", up: true },
      { name: "COPPER", price: "1,276.5", change: "+0.7%", up: true }
    ]
  ]
};
