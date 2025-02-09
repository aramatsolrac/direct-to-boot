import { useEffect, useState } from "react";
import axios from "axios";

export const useFetchOrder = (orderId: string) => {
  const [status, setStatus] = useState<string>("initialized");

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

  return status;
};
