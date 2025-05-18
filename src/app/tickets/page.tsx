import React from "react";
import { Tickets } from "./tickets";

export default function TicketsPage(){

  return <div>
      <h1 className="text-2xl font-bold">Tickets</h1>
      <p className="text-gray-500">List of tickets</p>
      <Tickets />
  </div>;
};

