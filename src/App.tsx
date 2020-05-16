import React, { useState } from "react";
import "./App.css";
import { run } from "./notes";

const click = (setFallbackUrl: (s: string | null) => void) => {
  run().then((blobUrl) => {
    setFallbackUrl(blobUrl);
  });
};

const App = () => {
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null);
  return (
    <div>
      <button onClick={(_) => click(setFallbackUrl)}>
        Generate sheet &amp; answer key
      </button>
      {fallbackUrl && (
        <a href={fallbackUrl} download="svg.pdf">
          File not downloading? Try this link instead.
        </a>
      )}
    </div>
  );
};

export default App;
