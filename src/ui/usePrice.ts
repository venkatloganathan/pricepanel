import { useEffect, useRef, useState } from "react";
import PriceSubscriptionInstance from "./service/PriceSubscription";

const usePrice = (id: string) => {
  const [sellPrice, setSellPrice] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [priceUp, setPriceUp] = useState(false);
  const [priceDown, setPriceDown] = useState(false);
  const [lastUpdate, setLastUpdate] = useState('');

  const lastUp = useRef(false);
  const lastDown = useRef(false);

  useEffect(() => {
    const callback = (data: unknown) => {
      // @ts-ignore
      setLastUpdate(new Date(data.d).toUTCString());
      setSellPrice((price) => {
        const lastPrice = Number(price);
        // @ts-ignore
        const currentPrice = data.p;
        if (currentPrice >= lastPrice) {
          lastUp.current = true;
          lastDown.current = false;
          setPriceUp(true);
          setPriceDown(false);
        } else {
          lastUp.current = false;
          lastDown.current = true;
          setPriceDown(true);
          setPriceUp(false);
        }

        return String(currentPrice.toFixed(2));
      });
      // @ts-ignore
      const buyPrice = data.p + data.s;
      setBuyPrice(String(buyPrice.toFixed(2)));
    };
    PriceSubscriptionInstance.subscribe(id, callback);

    return () => {
      PriceSubscriptionInstance.unsubscribe(id);
    };
  }, [id]);

  return { sellPrice, buyPrice, priceUp, priceDown, lastUpdate };
};

export { usePrice };
