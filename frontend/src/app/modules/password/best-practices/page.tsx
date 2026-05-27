"use client";
import { useState } from "react";
import { ModuleHeader } from "../context/page";
import passwordModule from "../../../../../module_details/passwords.json";
import "../../modules.css";
import Link from "next/link"

type Card = {
  id: string;
  number: string;
  title: string;
  description: string;
};

export default function BestPractices(){
    const bestPracticesScreen = passwordModule.screens.find(
        (screen) => screen.id === "best-practices-screen"
      );

      if (!bestPracticesScreen || !bestPracticesScreen.cards) {
        return <div>Best practices screen not found.</div>;
      }
    
    const cards: Card[] = bestPracticesScreen.cards.map((card: any) => ({
        id: card.id,
        number: card.number,
        title: card.title ?? card.label,
        description: card.description ?? card.explanation,
    }));

    return(
        <div>
            <ModuleHeader/>
            <div className="best_practices_body">
                <h1 className="best_practices_title">{bestPracticesScreen.title}</h1>
                {cards.map((card) => (
                <div className="best_practices_cards" key={card.id}>
                    <h2 className="number">{card.number}</h2>
                    <div className="best_practices_card_context">
                    <h2 className="card_header">{card.title}</h2>
                    <p className="card_body">{card.description}</p>
                    </div>
                </div>
                ))}
                <Link href="/modules">
                    <button className="debrief_next_button">
                    Complete!
                    </button>
                </Link>
            </div>
        </div>
    )
}