import React from "react";
import { useLocation } from "react-router-dom";
import BatchList from "../components/Trainer/BatchList";
import Feedback from "../components/Trainer/Feedback";
import Header from "../components/Trainer/Header";

export default function Trainer() {
  const { hash } = useLocation();

  return (
    <div>
      <Header />
      {hash == "#feedback" ? <Feedback /> : <BatchList />}
    </div>
  );
}
