import React, { Suspense, ReactElement } from "react";
import ICCDLoader from "../src/component/loader";

export const withSuspense = (element) => (
  <Suspense fallback={<ICCDLoader />}>
    {element}
  </Suspense>
);
