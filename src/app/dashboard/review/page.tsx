"use client"
import { Vertical } from "@/app/components/Charts/Vertical";
import HeaderSvg from "@/app/components/HeaderSvg";

export default function Chat() {
  return (
    <>
      <div className="flex flex-col">
        <div className="hidden lg:block">
          <HeaderSvg />
        </div>
        <div className="flex m-2">
          <div>
            <Vertical />
          </div>
          <h1>oi2</h1>
          <h1>oi3</h1>
        </div>
      </div>
    </>
  );
}
