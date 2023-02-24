"use client";
import { collection, orderBy, query } from "firebase/firestore";
import { useSession, signOut } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import ChatRow from "./ChatRow";
import ModelSeclection from "./ModelSeclection";
import NewChat from "./NewChat";

function Sidebar() {
  const { data: session } = useSession();
  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );
  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div>
          <NewChat />
          <div className="hidden sm:inline">
            <ModelSeclection />
          </div>
          {loading && (
            <div className="animate-pulse text-center text-slate-500 mt-5">
              <p>Loading chats...</p>
            </div>
          )}
          {chats?.docs.map((chat) => (
            <ChatRow key={chat.id} id={chat.id} />
          ))}
        </div>
      </div>
      {session && (
        <img
          onClick={() => signOut()}
          src={session.user?.image!}
          alt="User Profile Picture"
          className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-70 transition-all duration-300 ease-in-out"
        />
      )}
    </div>
  );
}

export default Sidebar;
