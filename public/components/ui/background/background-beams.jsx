"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }) => {
  return (
    <div
      className={cn(
        "absolute top-0 left-0 w-full h-full overflow-hidden flex flex-col items-center justify-center opacity-40",
        className
      )}
    >
      <div
        className="absolute w-[40rem] h-[40rem] bg-indigo-500 rounded-full blur-[10rem] opacity-20 -top-20 -left-20 animate-pulse"
      />
      <div
        className="absolute w-[30rem] h-[30rem] bg-pink-500 rounded-full blur-[8rem] opacity-20 bottom-0 right-0 animate-pulse delay-700"
      />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-transparent z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
    </div>
  );
};
