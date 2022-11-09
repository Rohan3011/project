import React, { useEffect } from "react";
import axios from "../api/axios";

export default function Temp() {
  useEffect(() => {
    fetch("http://localhost:8081/api/users")
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch();
  }, []);

  return <div>Temp</div>;
}
