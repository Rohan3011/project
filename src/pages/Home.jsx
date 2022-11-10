import React, { useEffect } from "react";
import { redirect } from "react-router-dom";

export default function Home() {
  useEffect(() => {
    function goToLogin() {
      redirect("/login");
    }
    goToLogin();
  }, []);

  return <div>Home Page</div>;
}
