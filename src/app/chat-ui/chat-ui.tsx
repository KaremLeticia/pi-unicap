"use client";
import { useState } from "react";
import { IChatGPTPayload } from "../api/openai/route";
import { Header } from "./header";
import { PromptInput } from "./prompt-input";
import Image from "next/image";
import pavao from '../../app/assets/pavao.png'

export const ChatUI = () => {
  const [style, setStyle] = useState<ConverSationStyle>("FUNNY");
  const [chatHistory, setChatHistory] = useState<Array<{ user: string; ai: string }>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const promptChatGPT = async (payload: IChatGPTPayload) => {
    setIsLoading(true);
    console.log(style);
    const response: Response = await fetch("/api/openai", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const aiResponse = await response.text();

    // Update chat history with user's message and AI's response
    setChatHistory((prevChat) => [
      ...prevChat,
      { user: payload.prompt, ai: aiResponse },
    ]);

    setIsLoading(false);
  };

  return (
    <div className="w-[1024px] my-12 mx-auto h-[700px] pb-2 bg-white rounded-lg overflow-hidden text-slate-400  gap-5 flex flex-col shadow-white/70">
      <div
      className="bg-default -mb-4 p-4 flex gap-2 items-center"
      >
        <Image src={pavao} alt="Pavao Sinuca" className="m-2 rounded-full"/>
        <div className="p-2 flex flex-col text-white">
            <h1>Sivuca I.A</h1>
        <p>Based on ChatGPT 3.5 Turbo</p>
        </div>
      

      </div>
      <div className="flex-grow text-slate-50 max-h-[50vh] overflow-y-auto p-2">
        {chatHistory.map((message, index) => (
          <>
          <div key={index} className="flex justify-end">
            <div className="bg-default text-white font-regular text-sm p-2 rounded-s-lg m-1">
              {message.user}
            </div>
          </div>
          <div key={index} className="flex justify-start">
            <div className="bg-white border-2 border-default font-regular text-sm text-slate-950 p-2 rounded-r-lg m-1">
             {message.ai}
            </div>
          </div>
          </>
        ))}
      </div>

      <PromptInput
        isLoading={isLoading}
        onSubmit={(prompt) => promptChatGPT({ prompt })}
      />
    </div>
  );
};
