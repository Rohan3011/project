import React, { useEffect } from "react";
import axios from "../api/axios";

export default function Temp() {
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get("users");
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);

  return <div>Temp</div>;
}
