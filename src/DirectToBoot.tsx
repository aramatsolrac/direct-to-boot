
interface DirectToBootProps {
    orderId: string;
    }

function DirectToBoot({ orderId }: DirectToBootProps) {
  return (
    <div >
        <h1>Direct To Boot</h1>
        <p>We are preparing your order...</p>
        <button
            onClick={() => {
                console.log('I am here');
            }}
            disabled={true}
        >I'm here</button>  
    </div>
  );
}

export { DirectToBoot};
