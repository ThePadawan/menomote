import React, { useState } from "react";
import "./App.css";
import { run } from "./notes";

const click = (setFallbackUrl: (s: string | null) => void) => {
  setTimeout(() => {
    run().then((blobUrl) => {
      setFallbackUrl(blobUrl);
    });
  }, 0);
};

const App = () => {
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null);
  return (
    <>
      <div className="App">
        <div>
          <button onClick={(_) => click(setFallbackUrl)}>
            Generate sheet &amp; answer key
          </button>
        </div>
        <div>
          {fallbackUrl && (
            <a href={fallbackUrl} download="svg.pdf">
              File not downloading? Try this link instead.
            </a>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
