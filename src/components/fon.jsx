import "./pay.css";
import { useEffect, useState } from "react";
import sha1 from "sha1";
import { v4 as uuidv4 } from "uuid";
export default function NewPayBlock({}) {
  const totalPrice = 1;
  const orderId = 2323;

  useEffect(() => {}, [totalPrice]);

  const params = {
    order_id: `ID${orderId}`,
    order_desc: "test order",
    currency: "USD",
    amount: `${totalPrice * 100}`,
    merchant_id: "1396424",
  };

  function getSignature(merchant_id, password, params) {
    const orderKey = Object.keys(params).sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
    const signatureRow = orderKey.map((v) => params[v]).join("|");

    return sha1(`${password}|${signatureRow}`);
  }

  const merchant_id = "1396424";
  const password = "test";
  const signature = getSignature(merchant_id, password, params);

  return (
    <form action="https://pay.fondy.eu/api/checkout/redirect/" method="POST">
      <input type="hidden" name="merchant_id" value="1396424" />
      <input type="hidden" name="order_id" value={`ID${orderId}`} />
      <input type="hidden" name="order_desc" value="test order" />
      <input type="hidden" name="currency" value="USD" />
      <input type="hidden" name="amount" value={`${totalPrice * 100}`} />
      <input type="hidden" name="signature" value={signature} />

      <button type="submit" onClick={(e) => {}}>
        ${totalPrice}
      </button>
    </form>
  );
}
