import { useState, useEffect } from "react";
import axios from "axios";

interface DirectToBootProps {
  orderId: string;
}

function getMessage(status: string) {
  switch (status) {
    case "initialised":
      return "We are preparing your order..";
    case "ready":
      return "Please click the button when you have arrived. One of our friendly staff will bring your order to you";
    case "error":
      return "Seems something went wrong, you can the following number to notify us instead.";
  }
}

function DirectToBoot({ orderId }: DirectToBootProps) {
  const [status, setStatus] = useState<string>("initialised");

  useEffect(() => {
    axios
      .get(`/api/orders/${orderId}`)
      .then((response) => {
        if (response.data.status === "ready") {
          setStatus("ready");
        }
      })
      .catch((e) => {
        setStatus("error");
      });
  }, [orderId]);

  return (
    <div>
      <h1>Direct To Boot</h1>
      <p>We are preparing your order...</p>
      {status === "error" && <a href="tel: 13343434">04 23 33</a>}
      {status !== "error" && (
        <button disabled={status !== "ready"}>I'm here</button>
      )}
    </div>
  );
}

export { DirectToBoot };
