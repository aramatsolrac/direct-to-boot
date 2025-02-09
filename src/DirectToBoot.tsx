import { getMessage } from "./utils";
import { useFetchOrder } from "./useFetchOrder";

interface DirectToBootProps {
  orderId: string;
}

const createButton = (status: string) => {
  switch (status) {
    case "initialized":
      return <button disabled={true}>I'm here</button>;
    case "ready":
      return <button>I'm here</button>;
    case "error":
      return <a href="tel: 13343434">04 23 33</a>;
  }
};

function DirectToBoot({ orderId }: DirectToBootProps) {
  const status = useFetchOrder(orderId);
  return (
    <div>
      <h1>Direct To Boot</h1>
      <p>{getMessage(status)}</p>
      {createButton(status)}
    </div>
  );
}

export { DirectToBoot };
