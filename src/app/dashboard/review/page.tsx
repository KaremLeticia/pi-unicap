"use client"
import { Vertical } from "@/app/components/Charts/Vertical";
import HeaderSvg from "@/app/components/HeaderSvg";

export default function Chat(){
  return(
   <>
   <div>
    <HeaderSvg />
    <div className="grid grid-cols-3 gap-2 m-2">
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