"use client"
import React from "react";
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import unicapdove from './assets/Animation - 1713061668871.json'
import Lottie from "lottie-react";

const style = {
  height: 300,
  width: 300,
};

const App = () => <Lottie animationData={unicapdove} autoplay={true} loop={1} style={style} />;


function NotFoundPage() {
  return (
    <div className="bg-zinc-900/ flex flex-col h-screen w-screen  justify-center items-center">
      <h1 className="text-black text-9xl">
        404
      </h1>
          <App />
      <h1 className="text-black text-5xl">
        Página não encontrada
      </h1>
    </div>
  );
};

export default NotFoundPage;
