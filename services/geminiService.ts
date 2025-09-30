import { GoogleGenAI } from "@google/genai";
import { Batch } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const model = 'gemini-2.5-flash';

export const generateRecallCommunication = async (batch: Batch, reason: string): Promise<string> => {
  const prompt = `
    You are a regulatory officer for the AYUSH Ministry in India.
    Your task is to draft a formal and urgent product recall notification for an Ayurvedic supply chain.
    The communication must be bilingual (English and Hindi).

    Use the following details:
    - Batch ID: ${batch.id}
    - Product: ${batch.plantType}
    - Farmer: ${batch.farmerName}
    - Reason for Recall: ${reason}

    Generate the complete, formatted recall notification.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
  });

  return response.text;
};

export const draftRule = async (ruleTopic: string): Promise<string> => {
    const prompt = `
        You are a regulatory officer for the AYUSH Ministry in India.
        Draft an official directive for a new compliance rule for the Ayurvedic supply chain.
        The topic of the rule is: "${ruleTopic}".
        
        The directive should be formal, clear, and include:
        1. A directive number (e.g., AYUSH Ministry Directive - YYYY/MM-A).
        2. An effective date (Immediately).
        3. The subject of the rule.
        4. The body of the rule, clearly stating the new mandate.
        5. An enforcement section mentioning audits and penalties for non-compliance.
        6. A closing signature line for "AYUSH Regulator".

        Generate the full text of the directive.
    `;
    const response = await ai.models.generateContent({ model, contents: prompt });
    return response.text;
};


export const generateUpgradePlan = async (upgradeReason: string): Promise<string> => {
    const prompt = `
        You are a senior blockchain developer creating a technical plan for a smart contract upgrade on the AyurTrace network.
        The reason for the upgrade is: "${upgradeReason}".

        Generate a high-level technical plan that includes the following sections:
        1.  **Key Steps:** Detail the process from code freeze to deployment and verification.
        2.  **Potential Risks:** Identify potential issues like data migration errors, replay attacks, or downtime, and suggest mitigation strategies for each.
        3.  **Testing Strategy:** Describe the testing approach, including unit tests, integration tests on a testnet, and a third-party security audit.
        
        The plan should be clear, concise, and technically sound, ensuring a safe and efficient upgrade.
    `;
    const response = await ai.models.generateContent({ model, contents: prompt });
    return response.text;
};

export const suggestInspectionNotes = async (batch: Batch): Promise<string> => {
    const prompt = `
        You are an AI assistant for an AYUSH Ministry regulator.
        Your task is to generate prioritized inspection notes for a specific batch based on available system data.

        **Batch Information:**
        - Batch ID: ${batch.id}
        - Farmer: ${batch.farmerName}
        - Location: ${batch.location.state}

        **System Context & Alerts (Hypothetical):**
        - There has been a recent alert for this farmer regarding unusually high harvest volume.
        - Other batches from the ${batch.location.state} region have recently failed quality tests due to high pesticide levels.
        - The blockchain record shows a shorter-than-average time between 'Collected' and 'Testing' for this batch.

        Based on this information, generate a concise, numbered list of 3-4 key points for the field inspector to prioritize during their inspection of batch ${batch.id}. The notes should be actionable and specific.
    `;
    const response = await ai.models.generateContent({ model, contents: prompt });
    return response.text;
};
