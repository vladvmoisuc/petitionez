import { startTransition, StrictMode } from "react";
import { RemixBrowser } from "@remix-run/react";
import { hydrate as hydrateRoot } from "react-dom";

function hydrate() {
  startTransition(() => {
    hydrateRoot(
      <StrictMode>
        <RemixBrowser />
      </StrictMode>,
      document
    );
  });
}

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  window.setTimeout(hydrate, 1);
}
