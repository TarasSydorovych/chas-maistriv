import React from "react";
import axios from "axios";

const TestWebhook = () => {
  const sendTestWebhook = async () => {
    const testPayload = {
      invoiceId: "24062826v9znw7j1XCGS",
      status: "success",
      payMethod: "pan",
      amount: 100,
      ccy: 980,
      finalAmount: 100,
      createdDate: "2024-06-28T16:48:53Z",
      modifiedDate: "2024-06-28T16:50:10Z",
      reference: "84d0070ee4e44667b31371d8f8813947",
      destination: "Оплата товарів час майстрів",
      paymentInfo: {
        rrn: "024041911109",
        approvalCode: "948052",
        tranId: "13758227652",
        terminal: "MI015324",
        bank: "ПриватБанк",
        paymentSystem: "mastercard",
        country: "804",
        fee: 1,
        paymentMethod: "pan",
        maskedPan: "51693600******94",
        agentFee: 0,
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/webhook",
        testPayload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Webhook sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending webhook:", error);
    }
  };

  return (
    <div>
      <h1>Test Webhook</h1>
      <button onClick={sendTestWebhook}>Send Test Webhook</button>
    </div>
  );
};

export default TestWebhook;
