import React, { useEffect } from "react";
import axios from "../api/axios";

export default function Temp() {
  useEffect(async () => {
    try {
      const res = axios.get("/api/users");
      console.log(JSON.stringify(res?.data));
    } catch (err) {
      console.log(err);
    }
  }, []);

  return <div>Temp</div>;
}
