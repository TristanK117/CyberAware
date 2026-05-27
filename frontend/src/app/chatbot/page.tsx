"use client";

import "./chatbot.css";
import Image from "next/image";
import React, { useState } from "react";
import { authenticatedFetch } from "../services/authService";


type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
};

export default function Chatbot() {
  const [input, setInput] = useState("");
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const cards = [
    {
      title: "What is a deepfake?",
      description: "How AI-generated media is used in attacks",
    },
    {
      title: "Voice phishing risks",
      description: "How cloned voices are used in scams",
    },
    {
      title: "Suspicious emails",
      description: "Ways to spot common phishing attempts",
    },
    {
      title: "Password safety",
      description: "Best practices for protecting work accounts",
    },
  ];

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    }).toLowerCase();
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userText = input.trim();

    const userMessage: Message = {
      role: "user",
      content: userText,
      timestamp: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setStarted(true);
    setLoading(true);
    setInput("");

    try {
      const res = await authenticatedFetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
        method: "POST",
        body: JSON.stringify({ message: userText }),
      });

      if (!res.ok) {
        throw new Error("Failed to get chat response");
      }

      const data = await res.json();

      const botMessage: Message = {
        role: "assistant",
        content: data.reason || "No response returned.",
        timestamp: getCurrentTime(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong while connecting to the chatbot.",
          timestamp: getCurrentTime(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    setStarted(false);
    setMessages([]);
    setInput("");
  };

  return (
<div className="flex min-h-screen">
  {/* Sidebar ONLY when chat has started */}
  {started && (
    <div className="sidebar flex flex-col justify-between p-4">
      <div>
        <button className="sidebar-btn" onClick={handleNewChat}>+</button>
        <button className="sidebar-btn">🔍</button>
      </div>
    </div>
  )}

  {/* Main content */}
  <div className="flex-1">
    <div className="chat-page min-h-screen text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[658px] flex-col px-6 pt-7">
        <div className="mb-12 flex items-start justify-between">
          <div className="text-[31px] font-bold leading-none tracking-[-0.02em]">
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center">
          {!started ? (
            <>
              <div className="mb-10 flex h-[78px] w-[78px] items-center justify-center">
                <Image
                  src="/shield.png"
                  alt="CyberAware Shield"
                  width={78}
                  height={78}
                  priority
                />
              </div>

              <h1 className="mb-4 text-center text-[26px] font-semibold leading-tight tracking-[-0.01em]">
                How can I help you today?
              </h1>

              <p className="chat-secondary-text mb-12 max-w-[310px] text-center text-[14px] leading-[1.35]">
                Ask me anything about cybersecurity, AI threats, or best practices
                for staying safe at work.
              </p>

              <div className="grid w-full max-w-[360px] grid-cols-2 gap-[10px]">
                {cards.map((card, index) => (
                  <button
                    key={index}
                    className="chat-card min-h-[168px] rounded-[14px] px-5 pb-5 pt-4 text-left shadow-sm"
                    onClick={() => setInput(card.title)}
                  >
                    <div className="mb-5">
                      <Image
                        src="/face.png"
                        alt="face icon"
                        width={26}
                        height={26}
                      />
                    </div>

                    <div className="mb-4 text-[15px] font-semibold leading-[1.2] text-white">
                      {card.title}
                    </div>

                    <div className="chat-secondary-text max-w-[120px] text-[12px] leading-[1.35]">
                      {card.description}
                    </div>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="chat-conversation w-full">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`message-row ${
                    message.role === "user" ? "user-row" : "assistant-row"
                  }`}
                >
                  <div className="message-group">
                    <div
                      className={`message-bubble ${
                        message.role === "user"
                          ? "user-bubble"
                          : "assistant-bubble"
                      }`}
                    >
                      {message.content}
                    </div>
                    <div
                      className={`message-time ${
                        message.role === "user" ? "user-time" : "assistant-time"
                      }`}
                    >
                      {message.timestamp}
                    </div>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="message-row assistant-row">
                  <div className="message-group">
                    <div className="message-bubble assistant-bubble">
                      Thinking...
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="mt-16 w-full">
            {!started && (
              <h2 className="mb-6 text-center text-[23px] font-semibold tracking-[-0.01em]">
                Got a question to ask?
              </h2>
            )}

            <div className="chat-input-box flex min-h-[88px] items-end rounded-[18px] px-6 pb-5 pt-4 shadow-sm">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSend();
                  }
                }}
                placeholder={started ? "Reply..." : "Hi, how can I help?"}
                className="chat-secondary-text w-full bg-transparent text-[14px] outline-none"
              />
              <button
                onClick={handleSend}
                className="ml-4 flex h-[36px] w-[36px] items-center justify-center rounded-[8px] overflow-hidden transition hover:scale-105"
              >
                <Image
                  src="/send.png"
                  alt="Send"
                  width={36}
                  height={36}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-20 flex items-center justify-between pb-8 pt-10 text-white">
          <div className="text-[16px] font-bold leading-none tracking-[-0.02em]">
           
          </div>

        
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}