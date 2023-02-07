import React, { useMemo, Fragment } from "react";
import { PricePanelRender } from "../PricePanelRender";
import "./PricePanelContainer.css";

const PricePanelContainer = () => {
  const priceCollection = useMemo(
    () => [
      {
        id: '0',
        name: "EURUSD",
      },
      {
        id: '1',
        name: "USDJPY",
      },
      {
        id: '2',
        name: "GBPUSD",
      },
      {
        id: '3',
        name: "USDCAD",
      },
      {
        id: '4',
        name: "USDCHF",
      },
    ],
    []
  );
  return (
    <div className="price-panel-container">
      {priceCollection.map((price) => (
        <Fragment key={price.id}>
          <PricePanelRender {...price} />
        </Fragment>
      ))}
    </div>
  );
};

export default PricePanelContainer;
