import { initClient } from "rwsdk/client";
import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import Breadcrumbs from "./app/components/Breadcrumbs";


const root = createRoot(document.getElementById("root")!);
root.render(<Breadcrumbs />);

initClient();
