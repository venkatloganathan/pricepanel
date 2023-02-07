import React, { useEffect, useRef, useState } from "react";
import "./PricePanel.css";

const ARROW_INTERVAL = 250;

type IPricePanelProps = {
  buttonDirection: string;
  header: string;
  price: string;
  priceUp: boolean;
  priceDown: boolean;
};

enum ArrowDisplay {
  NONE,
  UP,
  DOWN,
}

const PricePanel = ({
  buttonDirection,
  header,
  price,
  priceUp,
  priceDown,
}: IPricePanelProps) => {
  const [arrowDisplay, setArrowDisplay] = useState(ArrowDisplay.NONE);

  const arrowTimer = useRef<number | undefined | NodeJS.Timeout>();

  useEffect(() => {
    const clearArrowTimeout = () => {
      setArrowDisplay(ArrowDisplay.NONE);
      clearTimeout(arrowTimer.current);
    };
      clearArrowTimeout();
    if (priceUp) {
      setArrowDisplay(ArrowDisplay.UP);
      arrowTimer.current = setTimeout(() => {
        clearArrowTimeout();
      }, ARROW_INTERVAL);
    } else if (priceDown) {
      setArrowDisplay(ArrowDisplay.DOWN);
      arrowTimer.current = setTimeout(() => {
        clearArrowTimeout();
      }, ARROW_INTERVAL);
    }
    return () => clearArrowTimeout();
  }, [priceUp, priceDown]);

  return (
    <div className={`price-panel ${buttonDirection}`}>
      <div className={`price-panel___header ${buttonDirection}`}>{header}</div>
      <div className="price-panel___price-display-container">
        <div className="price-panel___price-display">{price}</div>
        {arrowDisplay === ArrowDisplay.UP && (
          <div className="price-panel___price-display-spread up">&#9650;</div>
        )}
        {arrowDisplay === ArrowDisplay.DOWN && (
          <div className="price-panel___price-display-spread down">&#9660;</div>
        )}
      </div>
    </div>
  );
};

export { PricePanel };
