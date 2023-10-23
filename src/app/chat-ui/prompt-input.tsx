"use client";

import { FC, FormEvent } from "react";
import { HourglassMedium, PaperPlaneRight } from "@phosphor-icons/react";

interface Props {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
}

export const PromptInput: FC<Props> = (props) => {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const prompt = formData.get("message") as string;
    if (prompt.length === 0 || props.isLoading) return;
    props.onSubmit(prompt);
  };

  return (
    <form
      className="bg-white -mx-5 -mb-5 p-5 flex gap-2 items-center"
      onSubmit={onSubmit}
    >
      <input
        type="text"
        autoComplete="off"
        name="message"
        required
        className=" bg-transparent border-default border-2 rounded-md p-4  m-2 flex-1 max-h-56 text-slate-950 focus:ring-0 focus:outline-none"
        placeholder="Envie sua mensagem"
      ></input>
      <button
        type="submit"
        className="hover:bg-default/60  cursor-pointer rounded-full text-white items-center m-2  bg-default justify-center flex  p-4"
      >
        {props.isLoading ? <HourglassMedium color="white" size={25} />
          : <PaperPlaneRight color="white" size={25} />}
      </button>
    </form>
  );
};
