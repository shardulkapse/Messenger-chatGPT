"use client";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { collection, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import Message from "./Message";

type Props = {
  chatId: string;
};

function Chat({ chatId }: Props) {
  const divRef = useRef<any>(null);
  const { data: session } = useSession();
  const [messages] = useCollection(
    query(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId,
        "messages"
      ),
      orderBy("createdAt", "asc")
    )
  );
  useEffect(() => {
    divRef.current?.scrollIntoView({ behavior: "smooth" });
  });
  return (
    <div className="flex-1 overflow-y-scroll overflow-x-hidden">
      {messages?.empty && (
        <>
          <p className="mt-10 text-center text-white">
            Type a prompt below to get started!
          </p>
          <ArrowDownCircleIcon className="h-5 w-5 mx-auto mt-5 text-white animate-bounce" />
        </>
      )}
      {messages?.docs.map((message) => {
        return <Message key={message.id} message={message.data()} />;
      })}
      <div ref={divRef}></div>
    </div>
  );
}

export default Chat;
