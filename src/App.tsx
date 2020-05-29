import React, { useState } from "react";
import "./App.css";
import { run } from "./notes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

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
        <div className="menomote-extras">
          <a
            href="//github.com/ThePadawan/menomote"
            className="menomote-extras__link"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </div>
      </div>
    </>
  );
};

export default App;
