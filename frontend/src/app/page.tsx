"use client";
import { useState } from "react";
import './landing.css'
import { authenticatedFetch } from "./services/authService";

function ShieldIcon() {
  return(
    <svg xmlns="http://www.w3.org/2000/svg" width="38" height="auto" viewBox="0 0 52 52" fill="none">
      <path d="M26 52C35.5286 49.3103 42.4583 42.138 44.1908 38.5517C47.2488 32.2215 48.9409 15.6134 49.3103 11.6297C45.9075 9.38062 43.2261 6.06998 41.7002 2.14642C37.3657 0.803359 31.9216 0 26 0C20.0784 0 14.6342 0.803359 10.2999 2.14632C8.774 6.06998 6.09255 9.38052 2.6897 11.6296C3.05918 15.6133 4.75121 32.2215 7.80926 38.5517C9.54171 42.138 16.4714 49.3103 26 52Z" fill="#E4EAF8"/>
      <path d="M13.7347 4.9263L12.936 5.11592L12.5576 5.84453C11.1905 8.47703 9.37488 10.7912 7.16143 12.7228L6.45801 13.3369L6.55764 14.2653C6.99304 18.3221 8.60291 31.9504 11.0385 36.9918C12.257 39.5142 17.7222 45.3479 25.4049 48.0512L26.0001 48.2606V3.58618C21.6691 3.58618 17.4279 4.04961 13.7347 4.9263Z" fill="#AFB9D2"/>
      <path d="M25.9999 5.37933C30.2006 5.37933 34.3198 5.83261 37.8509 6.6709C39.3193 9.4983 41.2826 11.9996 43.6595 14.0738C42.7077 22.9419 41.1006 32.5816 39.3471 36.2117C38.3541 38.2671 33.2218 43.8186 25.9999 46.3596C18.778 43.8185 13.6458 38.2671 12.6529 36.2118C10.8992 32.5817 9.29218 22.942 8.34033 14.0739C10.7172 11.9996 12.6804 9.49851 14.1489 6.67101C17.68 5.83261 21.7992 5.37933 25.9999 5.37933Z" fill="#2A3D6D"/>
      <path d="M14.1489 6.6709C12.6805 9.4983 10.7172 11.9996 8.34033 14.0738C9.29218 22.942 10.8992 32.5816 12.6529 36.2117C13.6459 38.267 18.778 43.8185 25.9999 46.3595L26.0001 5.37933C21.7994 5.37933 17.6802 5.83261 14.1489 6.6709Z" fill="#0A1940"/>
    </svg>
  )
}

function BookIcon() {
  return(
    <svg xmlns="http://www.w3.org/2000/svg" width="38" height="auto" viewBox="0 0 52 52" fill="none">
      <path d="M25.9644 9.73987H4.77339C3.94058 9.73987 3.26011 10.4153 3.26011 11.2481L3.21948 43.9664C3.21948 44.8043 3.89487 45.4797 4.73276 45.4797H20.2769L20.6984 46.3074C20.9574 46.8153 21.4753 47.1352 22.0492 47.1352H29.971C30.5246 47.1352 31.0324 46.8305 31.3015 46.3481L31.7738 45.4848H47.2113C48.0441 45.4848 48.7246 44.8094 48.7246 43.9715V11.2531C48.7246 10.4203 48.0492 9.73987 47.2113 9.73987H25.9644Z" fill="#787B9B" fill-opacity="0.9"/>
      <path d="M26.2945 9.61798C26.0254 9.8008 25.6801 9.83634 25.3805 9.70431C23.7199 8.97306 18.0781 6.68791 12.7461 6.68791H7.33789C6.81992 6.68791 6.39844 7.10939 6.39844 7.62736V41.4781C6.39844 41.9961 6.81992 42.4176 7.33789 42.4176H24.0094C24.2836 42.4176 24.5426 42.5344 24.7203 42.7426L25.1672 43.2555C25.5379 43.682 26.198 43.6871 26.5738 43.2707L27.0715 42.7274C27.2492 42.5293 27.5031 42.4176 27.7672 42.4176H44.4641C44.982 42.4176 45.4035 41.9961 45.4035 41.4781L45.4492 7.62736C45.4492 7.10431 45.0277 6.68283 44.5098 6.68283H38.807C38.807 6.68791 30.9055 6.47462 26.2945 9.61798Z" fill="white"/>
      <path d="M25.9493 45.4035L24.3598 43.5754C24.1821 43.3672 23.9231 43.2504 23.6489 43.2504H6.42896C5.91099 43.2504 5.4895 42.8289 5.4895 42.311V6.42892C5.4895 5.91095 5.91099 5.48947 6.42896 5.48947H12.8477C17.9563 5.48947 23.2375 7.46993 25.4008 8.37892C25.6852 8.49572 26.0051 8.47032 26.2641 8.3129C31.0629 5.34728 38.4364 5.47931 38.929 5.48947H45.6372C46.1602 5.48947 46.5817 5.91095 46.5766 6.434L46.5258 42.316C46.5258 42.834 46.1043 43.2555 45.5864 43.2555H28.3208C28.0567 43.2555 27.8028 43.3672 27.625 43.5652L25.9493 45.4035ZM7.51567 41.2192H24.5782C24.8524 41.2192 25.1114 41.3359 25.2891 41.5442C25.6598 41.9707 26.32 41.9758 26.6958 41.5594L26.7262 41.5289C26.904 41.3309 27.1579 41.2192 27.4219 41.2192H44.4946L44.5403 7.51564H38.8833C38.802 7.51564 30.7735 7.3379 26.584 10.5473L26.5485 10.5727C26.2692 10.7859 25.8883 10.8266 25.5684 10.6742L25.5278 10.6539C25.4415 10.6133 18.8653 7.51564 12.8426 7.51564H7.51567V41.2192Z" fill="#8A8A8A"/>
      <path d="M24.9487 10.1613H26.98V44.0578H24.9487V10.1613Z" fill="#8A8A8A"/>
      <path d="M29.25 14.8078H42.25V16.8391H29.25V14.8078ZM29.25 22.5012H42.25V24.5324H29.25V22.5012ZM29.25 31.0527H42.25V33.084H29.25V31.0527ZM9.69922 14.8027H22.6992V16.834H9.69922V14.8027ZM9.69922 22.5012H22.6992V24.5324H9.69922V22.5012ZM9.69922 31.0527H22.6992V33.084H9.69922V31.0527Z" fill="#CDCDCD"/>
    </svg>
  )
}

function ProgressIcon() {
  return(
    <svg xmlns="http://www.w3.org/2000/svg" width="42" height="auto" viewBox="0 0 63 63" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 26.25C0 19.0013 5.87627 13.125 13.125 13.125H49.875C57.1237 13.125 63 19.0013 63 26.25V36.75C63 43.9987 57.1237 49.875 49.875 49.875H13.125C5.87627 49.875 0 43.9987 0 36.75V26.25ZM13.125 18.375C8.77577 18.375 5.25 21.9008 5.25 26.25V36.75C5.25 41.0994 8.77577 44.625 13.125 44.625H49.875C54.2244 44.625 57.75 41.0994 57.75 36.75V26.25C57.75 21.9008 54.2244 18.375 49.875 18.375H13.125ZM26.25 28.875C26.25 25.9755 28.6004 23.625 31.5 23.625C34.3996 23.625 36.75 25.9755 36.75 28.875V34.125C36.75 37.0246 34.3996 39.375 31.5 39.375C28.6004 39.375 26.25 37.0246 26.25 34.125V28.875ZM15.75 23.625C12.8505 23.625 10.5 25.9755 10.5 28.875V34.125C10.5 37.0246 12.8505 39.375 15.75 39.375C18.6495 39.375 21 37.0246 21 34.125V28.875C21 25.9755 18.6495 23.625 15.75 23.625Z" fill="white"/>
    </svg>
  )
}

export default function Home() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    setLoading(true);
    setResponse("");

    try {
      const res = await authenticatedFetch("http://localhost:8000/chat", {
        method: "POST",
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      setResponse("Error connecting to backend");
    }

    setLoading(false);
  };

  return (
    <div className="landing_body">
      <div className="landing_header">
        <h2>ENTERPRISE CYBER TRAINING PLATFORM</h2>
        <h1 className="top_header">Stay Ahead of <b>Every Threat</b></h1>
      </div>

      <div className="landing_chat">
        <h1>Have any questions? I can help!</h1>
        <div className="landing_text_entry">
        <textarea
          className="landing_textbox"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Is this email a scam?"
        />

          <button onClick={sendMessage} disabled={loading}>
            {loading ? "Sending..." : ""}
          </button>
        </div>

        <div style={{ marginTop: "2rem" }}>
          <strong>Response:</strong>
          <p>{response}</p>
        </div>
      </div>

      <div className="impact_numbers">
        <div className="impact_item">
          <h2>100+</h2>
          <p>Enterprise Clients</p>
        </div>

        <div className="impact_item">
          <h2>97%</h2>
          <p>Completion Rate</p>
        </div>

        <div className="impact_item">
          <h2>5k+</h2>
          <p>Employees Trained</p>
        </div>

        <div className="impact_item">
          <h2>50+</h2>
          <p>Training Modules</p>
        </div>
      </div>

      <div className="feature_intro">
        <h2>PLATFORM FEATURES</h2>
        <h1>Everything your team needs to stay protected</h1>
        <div className="feature_cards">
          <div className="card_item">
            <ShieldIcon />
            <h3>AI Security Chatbot</h3>
            <p>Get instant answers to any security question. Our chatbot is trained on the latest threats, attack vectors, and best practices.</p>
          </div>
          <div className="card_item">
            <BookIcon />
            <h3>Interactive Modules</h3>
            <p>Engage with real world simulations. Learn by doing.  identify phishing emails, deepfake calls, and social engineering attempts.</p>
          </div>
          <div className="card_item">
            <ProgressIcon/>
            <h3>Progress Tracking</h3>
            <p>Personalized dashboards show exactly where each employee stands and what training is still required for their role.</p>
          </div>
        </div>
      </div>

      <div className="landing_header">
        <h1 className="bottom_header">Ready to protect <b>your workforce?</b></h1>
        <p>Join  over a hundred enterprises training smarter, not harder.</p>
        <div className="landing_buttons">
          <button className="b1">Start Free Trial</button>
          <button className="b2">Request a Demo</button>
        </div>

      </div>
    </div>
  );
}

/* Original Input instead of textarea: <input className="landing_textbox" type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Is this email a scam?" /> */