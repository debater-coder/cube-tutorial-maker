import { useEffect, useRef } from "react";
import Twisty from "../twisty";

function App() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const twisty = new Twisty();
      ref.current.appendChild(twisty.player);
      return () => {
        ref.current?.removeChild(twisty.player);
      };
    }
    return () => {
      return;
    };
  }, []);

  return <div ref={ref} />;
}

export default App;
