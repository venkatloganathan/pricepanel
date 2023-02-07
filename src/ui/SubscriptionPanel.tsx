import React, { useEffect, useState } from "react";
import "./SubscriptionPanel.css";
import PriceSubscriptionInstance from "./service/PriceSubscription";

const SubscriptionPanel = () => {
  const [subscribe, setSubscribe] = useState(false);

  useEffect(() => {
    if (subscribe) {
      PriceSubscriptionInstance.startSubscription();
    } else {
      PriceSubscriptionInstance.stopSubscription();
    }
  }, [subscribe]);

  return (
    <span className="header">
      <button
        className="header_button"
        type="button"
        onClick={() => setSubscribe(true)}
      >
        Subscribe
      </button>
      <button
        className="header_button"
        type="button"
        onClick={() => setSubscribe(false)}
      >
        Unsubscribe
      </button>
    </span>
  );
};

export { SubscriptionPanel };
