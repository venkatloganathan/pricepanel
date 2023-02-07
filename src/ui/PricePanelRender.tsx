import React, { useMemo } from "react";
import "./PricePanelRender.css";
import { PricePanel } from "./PricePanel";
import { usePrice } from "./usePrice";

type IPricePanelRenderProps = {
  id: string;
  name: string;
};
const PricePanelRender = ({ id, name }: IPricePanelRenderProps) => {
  const pricePair = useMemo(
    () => [name.substring(0, 3), name.substring(3)],
    [name]
  );

  const { sellPrice, buyPrice, priceUp, priceDown, lastUpdate } = usePrice(id);

  return (
    <div className="price-panel-render">
      <div className="price-panel-render_header">{name}</div>
      <div className="price-panel-render_quote-panel">
        <div className="quote-panel___sell-container">
          <PricePanel
            header={`SELL ${pricePair[0]}`}
            buttonDirection="left"
            price={sellPrice}
            priceUp={priceUp}
            priceDown={priceDown}
          />
        </div>
        <div className="quote-panel___buy-container">
          <PricePanel
            header={`BUY ${pricePair[1]}`}
            buttonDirection="right"
            price={buyPrice}
            priceUp={priceUp}
            priceDown={priceDown}
          />
        </div>
      </div>
      <div className="price-panel-render_last-updated">{lastUpdate}</div>
    </div>
  );
};

export { PricePanelRender };
