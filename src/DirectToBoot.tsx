import { useState, useEffect } from "react";
import axios from "axios";

interface DirectToBootProps {
  orderId: string;
}

function DirectToBoot({ orderId }: DirectToBootProps) {
  const [status, setStatus] = useState<string>("initialised");

  useEffect(() => {
    axios.get(`/api/orders/${orderId}`).then((response) => {
      if (response.data.status === "ready") {
        setStatus("ready");
      }
    });
  }, [orderId]);

  return (
    <div>
      <h1>Direct To Boot</h1>
      <p>We are preparing your order...</p>
      <button disabled={status !== "ready"}>I'm here</button>
    </div>
  );
}

export { DirectToBoot };
