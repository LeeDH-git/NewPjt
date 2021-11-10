import React, { useEffect } from "react";
import axios from "axios";

function LandingPage() {
  useEffect(() => {
    axios.get("/api/hello");
  }, []);

  return <div></div>;
}

export default LandingPage;
