// Fix: Replaced placeholder content with actual constant definitions and mock data.
import { Batch, BatchStatus, Alert } from './types';

export const STATUS_COLORS: Record<BatchStatus, string> = {
  [BatchStatus.COLLECTED]: 'bg-yellow-100 text-yellow-800',
  [BatchStatus.TESTING]: 'bg-orange-100 text-orange-800',
  [BatchStatus.PROCESSED]: 'bg-blue-100 text-blue-800',
  [BatchStatus.RECALLED]: 'bg-red-100 text-red-800',
  [BatchStatus.SHIPPED]: 'bg-green-100 text-green-800',
};

const generateHash = () => `0x${Math.random().toString(16).slice(2, 10)}...`;

export const MOCK_BATCHES: Batch[] = [
  {
    id: 'ASH-UP-001',
    farmerName: 'Ramesh Kumar',
    plantType: 'Ashwagandha',
    blockchainId: '0x1a2b3c4d5e6f7g8h9i0j',
    status: BatchStatus.SHIPPED,
    location: { lat: 26.8467, lng: 80.9462, state: 'Uttar Pradesh' },
    history: [
      { actor: 'Farmer', action: 'Batch Collected', timestamp: '2023-10-01T08:00:00Z', hash: generateHash() },
      { actor: 'Laboratory', action: 'Quality Test Passed', timestamp: '2023-10-02T14:00:00Z', hash: generateHash() },
      { actor: 'Manufacturer', action: 'Processing Complete', timestamp: '2023-10-04T10:00:00Z', hash: generateHash() },
      { actor: 'Logistics', action: 'Shipped to Distributor', timestamp: '2023-10-05T18:00:00Z', hash: generateHash() },
    ]
  },
  {
    id: 'TUL-MP-002',
    farmerName: 'Sunita Devi',
    plantType: 'Tulsi',
    blockchainId: '0x2b3c4d5e6f7g8h9i0j1a',
    status: BatchStatus.PROCESSED,
    location: { lat: 22.9734, lng: 78.6569, state: 'Madhya Pradesh' },
    history: [
      { actor: 'Farmer', action: 'Batch Collected', timestamp: '2023-10-03T09:00:00Z', hash: generateHash() },
      { actor: 'Laboratory', action: 'Quality Test Passed', timestamp: '2023-10-04T16:00:00Z', hash: generateHash() },
      { actor: 'Manufacturer', action: 'Processing Complete', timestamp: '2023-10-06T11:00:00Z', hash: generateHash() },
    ]
  },
  {
    id: 'BRA-RJ-003',
    farmerName: 'Vikram Singh',
    plantType: 'Brahmi',
    blockchainId: '0x3c4d5e6f7g8h9i0j1a2b',
    status: BatchStatus.TESTING,
    location: { lat: 27.0238, lng: 74.2179, state: 'Rajasthan' },
    history: [
      { actor: 'Farmer', action: 'Batch Collected', timestamp: '2023-10-05T07:30:00Z', hash: generateHash() },
      { actor: 'Logistics', action: 'Transported to Lab', timestamp: '2023-10-05T12:00:00Z', hash: generateHash() },
    ]
  },
  {
    id: 'NEEM-GJ-004',
    farmerName: 'Priya Patel',
    plantType: 'Neem',
    blockchainId: '0x4d5e6f7g8h9i0j1a2b3c',
    status: BatchStatus.COLLECTED,
    location: { lat: 22.2587, lng: 71.1924, state: 'Gujarat' },
    history: [
      { actor: 'Farmer', action: 'Batch Collected', timestamp: '2023-10-06T10:00:00Z', hash: generateHash() },
    ]
  },
  {
    id: 'TUL-MP-003',
    farmerName: 'Sunita Devi',
    plantType: 'Tulsi',
    blockchainId: '0x5e6f7g8h9i0j1a2b3c4d',
    status: BatchStatus.RECALLED,
    location: { lat: 23.2599, lng: 77.4126, state: 'Madhya Pradesh' },
    history: [
      { actor: 'Farmer', action: 'Batch Collected', timestamp: '2023-09-28T11:00:00Z', hash: generateHash() },
      { actor: 'Laboratory', action: 'Quality Test Failed', timestamp: '2023-09-29T15:00:00Z', hash: generateHash(), details: { reason: 'Pesticide levels exceed limits' } },
      { actor: 'Regulator', action: 'Batch Recalled', timestamp: '2023-09-30T10:00:00Z', hash: generateHash(), details: { reason: 'Failed quality testing' } },
    ]
  },
  {
    id: 'ASH-MH-005',
    farmerName: 'Anil Deshmukh',
    plantType: 'Ashwagandha',
    blockchainId: '0x6f7g8h9i0j1a2b3c4d5e',
    status: BatchStatus.SHIPPED,
    location: { lat: 19.7515, lng: 75.7139, state: 'Maharashtra' },
    history: [
      { actor: 'Farmer', action: 'Batch Collected', timestamp: '2023-09-25T08:30:00Z', hash: generateHash() },
      { actor: 'Laboratory', action: 'Quality Test Passed', timestamp: '2023-09-26T13:00:00Z', hash: generateHash() },
      { actor: 'Manufacturer', action: 'Processing Complete', timestamp: '2023-09-28T09:00:00Z', hash: generateHash() },
      { actor: 'Logistics', action: 'Shipped to Distributor', timestamp: '2023-09-29T17:00:00Z', hash: generateHash() },
    ]
  },
];

export const MOCK_ALERTS: Alert[] = [
  {
    id: 'ALERT1',
    title: 'Recall Issued: TUL-MP-003',
    description: 'Batch TUL-MP-003 failed quality testing due to high pesticide levels.',
    timestamp: '2023-09-30T10:05:00Z',
    type: 'danger',
  },
  {
    id: 'ALERT2',
    title: 'Inspection Scheduled',
    description: 'A regulator has scheduled an inspection for batch BRA-RJ-003.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    type: 'info',
  },
  {
    id: 'ALERT3',
    title: 'Unusual Harvest Volume',
    description: 'Farmer Ramesh Kumar reported a harvest volume 35% higher than average.',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    type: 'warning',
  },
];

export const MOCK_RECALL_COMMUNICATION = `
**URGENT: PRODUCT RECALL NOTIFICATION**

**Subject:** Immediate Recall of Batch {{batchId}} ({{plantType}})

To all concerned stakeholders,

This is a formal notification from the AYUSH Ministry to initiate an immediate recall of the following batch:
- **Batch ID:** {{batchId}}
- **Product:** {{plantType}}
- **Farmer:** {{farmerName}}

**Reason for Recall:** {{reason}}

All parties must cease distribution and sale of this batch immediately. Please quarantine any remaining stock and await further instructions on return or disposal procedures.

---

**तत्काल: उत्पाद वापस लेने की सूचना**

**विषय:** बैच {{batchId}} ({{plantType}}) की तत्काल वापसी

सभी संबंधित हितधारकों को,

यह आयुष मंत्रालय की ओर से निम्नलिखित बैच को तत्काल वापस लेने के लिए एक औपचारिक सूचना है:
- **बैच आईडी:** {{batchId}}
- **उत्पाद:** {{plantType}}
- **किसान:** {{farmerName}}

**वापसी का कारण:** {{reason}}

सभी पक्षों को इस बैच का वितरण और बिक्री तत्काल बंद कर देनी चाहिए। कृपया शेष स्टॉक को अलग करें और वापसी या निपटान प्रक्रियाओं पर अगले निर्देशों की प्रतीक्षा करें।
`;

export const MOCK_RULE_DRAFT = `
**AYUSH Ministry Directive - 2023/10-A**

**Effective Date:** Immediately
**Subject:** New Compliance Rule Regarding "{{ruleTopic}}"

Based on a review of current supply chain practices and in the interest of public safety and product integrity, the following rule is hereby issued under the authority of the AYUSH Ministry:

**Rule:**
All supply chain partners are mandated to implement procedures addressing the matter of "{{ruleTopic}}". This includes updating documentation, training personnel, and ensuring system-wide adherence within the next 30 days.

**Enforcement:**
Compliance will be verified through random audits and inspection of blockchain records. Non-compliance will result in penalties, including suspension of licenses.

**Signed,**
AYUSH Regulator
`;


export const MOCK_UPGRADE_PLAN = `
**Smart Contract Upgrade Plan: AyurTrace v2.1**

**Reason for Upgrade:** {{upgradeReason}}

Here is the high-level technical plan for the upcoming smart contract upgrade.

**1. Key Steps:**
   - **Code Freeze:** Halt all development on the current contract.
   - **New Contract Development:** Implement the required changes in a new contract version (v2.1).
   - **Testing:**
     - Unit tests for all new and modified functions.
     - Integration tests on a private testnet.
     - Security audit by a third-party firm.
   - **Deployment:**
     - Deploy the new contract to the mainnet.
     - Execute a data migration script to transfer state from the old contract.
   - **Verification:**
     - Verify the new contract on Etherscan.
     - Announce the new contract address to all stakeholders.

**2. Potential Risks:**
   - **Data Migration Errors:** A bug in the migration script could lead to data loss. Mitigation: Extensive testing and dry runs.
   - **Replay Attacks:** Ensure nonces are handled correctly to prevent transaction replay. Mitigation: Follow standard security practices.
   - **Downtime:** The migration process may require a short period of downtime. Mitigation: Announce a maintenance window in advance.

**3. Testing Strategy:**
   - A comprehensive test suite will cover all contract functions.
   - The testnet deployment will simulate real-world usage patterns.
   - The third-party audit will focus on identifying potential security vulnerabilities.

This plan ensures a safe and efficient upgrade with minimal disruption to the network.
`;