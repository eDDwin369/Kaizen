const templateLeads = [
  { status: "New", appliedAmount: 5000000, eligibilityScore: 92, price: 750, readiness: "Yes", leadType: "Flat", location: "California, USA", name: "James Brown" },
  { status: "In Discussion", appliedAmount: 5000000, eligibilityScore: 83, price: 698, readiness: "Yes", leadType: "Flat", location: "New York, USA", name: "James John" },
  { status: "Purchased", appliedAmount: 5000000, eligibilityScore: 95, price: 850, readiness: "Yes", leadType: "Percentage", location: "Texas, USA", name: "Arthur Pendragon" },
  { status: "Ready to close", appliedAmount: 5000000, eligibilityScore: 89, price: 720, readiness: "Yes", leadType: "Flat", location: "California, USA", name: "Robert Downey" },
  { status: "No response", appliedAmount: 5000000, eligibilityScore: 64, price: 450, readiness: "No", leadType: "Flat", location: "Florida, USA", name: "Emma Watson" },
  { status: "Re-engaging", appliedAmount: 5000000, eligibilityScore: 78, price: 580, readiness: "Yes", leadType: "Percentage", location: "Texas, USA", name: "Sarah Connor" },
  { status: "Accepted", appliedAmount: 5000000, eligibilityScore: 91, price: 790, readiness: "Yes", leadType: "Flat", location: "New York, USA", name: "Michael Scott" },
  { status: "Disbursed", appliedAmount: 5000000, eligibilityScore: 94, price: 820, readiness: "Yes", leadType: "Percentage", location: "Florida, USA", name: "Pam Beesly" },
  { status: "Settled", appliedAmount: 5000000, eligibilityScore: 86, price: 710, readiness: "Yes", leadType: "Flat", location: "California, USA", name: "Jim Halpert" }
];

const generatedLeads = [];
for (let i = 0; i < 112; i++) {
  const template = templateLeads[i % templateLeads.length];
  const leadNum = 120 + i;
  generatedLeads.push({
    id: `Lead#${leadNum}`,
    leadCode: `LEAD-${String(i + 1).padStart(3, '0')}`,
    contactName: template.name,
    appliedAmount: template.appliedAmount,
    status: template.status,
    eligibilityScore: Math.min(100, Math.max(50, template.eligibilityScore + (i % 7) - 3)),
    scoreLabel: template.eligibilityScore >= 90 ? "Excellent" : template.eligibilityScore >= 80 ? "Good" : "Fair",
    price: template.price + (i % 10) * 5 - 25,
    readiness: template.readiness,
    leadType: template.leadType,
    location: template.location
  });
}

export const initialLeads = generatedLeads;
