"use client";

import "./gamified.css";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

// ─── Types ────────────────────────────────────────────────────────────────────

type Screen = "inbox" | "fakesite" | "breach" | "damage" | "success";

interface TerminalLine {
  delay: number;
  cls: string;
  text: string;
}

interface ChainStep {
  delay: number;
  icon: string;
  colorCls: string;
  title: string;
  detail: string;
}

// ─── Static data ──────────────────────────────────────────────────────────────

const TERMINAL_LINES: TerminalLine[] = [
  { delay: 700,  cls: "t_danger", text: "> Credential pair received: aaron@yourcompany.com : ••••••••••" },
  { delay: 1200, cls: "t_muted",  text: "> Running credential against 47 known services..." },
  { delay: 2100, cls: "t_warn",   text: "> MATCH: Slack, GitHub, Outlook, Finance Portal" },
  { delay: 3000, cls: "t_danger", text: "> Initiating session hijack..." },
  { delay: 4200, cls: "t_muted",  text: "> Exfil module loaded. Scanning shared drives..." },
  { delay: 5400, cls: "t_warn",   text: "> 2,400 records staged for upload" },
  { delay: 6300, cls: "t_danger", text: "> RANSOMWARE PAYLOAD DEPLOYED" },
  { delay: 7100, cls: "t_muted",  text: "> Coverage: 3 drives, 847 files encrypted" },
];

const CHAIN_STEPS: ChainStep[] = [
  { delay: 600,  icon: "🔑", colorCls: "cs_red",    title: "Credentials captured",      detail: "Username + password transmitted to attacker server in plaintext" },
  { delay: 1400, icon: "🌐", colorCls: "cs_purple",  title: "Identity sold on dark web",  detail: 'Credential listing posted: "corpmail+pass bundle $12" — 4 buyers in 8 min' },
  { delay: 2400, icon: "📬", colorCls: "cs_amber",   title: "Email account accessed",     detail: "Attacker logs in from Minsk, Belarus. Password reset emails forwarded." },
  { delay: 3600, icon: "📱", colorCls: "cs_red",     title: "Connected apps compromised", detail: "Slack, GitHub, Jira, Finance portal — all accessed via breached email SSO" },
  { delay: 5000, icon: "💾", colorCls: "cs_amber",   title: "Data exfiltrated",           detail: "2,400 customer records, Q4 projections, source code repos cloned" },
  { delay: 6600, icon: "🦠", colorCls: "cs_red",     title: "Ransomware deployed",        detail: "Malware spread to 3 shared network drives. Files encrypted. Ransom: $85,000 BTC" },
];

const STEP_MAP: Record<Screen, { n: number; p: number }> = {
  inbox:    { n: 1, p: 25 },
  fakesite: { n: 2, p: 50 },
  breach:   { n: 3, p: 75 },
  damage:   { n: 4, p: 100 },
  success:  { n: 4, p: 100 },
};

const DAMAGE_ROWS = [
  { label: "Credentials stolen",     value: "Email + password",                     cls: "dr_red" },
  { label: "Accounts accessed",      value: "Email, Slack, GitHub, Finance portal",  cls: "dr_red" },
  { label: "Data exfiltrated",       value: "2,400 customer records",               cls: "dr_amber" },
  { label: "Ransomware deployed",    value: "3 shared drives encrypted",             cls: "dr_red" },
  { label: "Estimated company cost", value: "$340,000+",                             cls: "dr_red" },
  { label: "Regulatory exposure",    value: "GDPR & CCPA notification required",     cls: "dr_amber" },
];

const LESSON_POINTS = [
  { bullet: "bullet_red",   text: "Sender domain corp-helpdesk.net doesn't match your company's real domain" },
  { bullet: "bullet_red",   text: "Link URL points to an external host, not yourcompany.com" },
  { bullet: "bullet_amber", text: 'Urgent language ("2 hours", "suspended") is designed to bypass careful thinking' },
  { bullet: "bullet_amber", text: "Legitimate IT departments never threaten account suspension via email" },
  { bullet: "bullet_teal",  text: "Always: hover links before clicking, verify with IT via a separate channel if unsure" },
];

// ─── Step header ──────────────────────────────────────────────────────────────

function StepHeader({ screen }: { screen: Screen }) {
  const { n, p } = STEP_MAP[screen];
  return (
    <div className="step_header">
      <div className="step_indicator_row">
        <span className="step_label">Step {n} of 4</span>
        <span className="step_title_label">What Happens When You Click</span>
      </div>
      <div className="progress_track">
        <div className="progress_track_fill" style={{ width: `${p}%` }} />
      </div>
      <div className="mini_dots">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`mini_dot ${i < n - 1 ? "done" : ""} ${i === n - 1 ? "active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Scene 1: Inbox ───────────────────────────────────────────────────────────

function SceneInbox({ onAction }: { onAction: (s: Screen) => void }) {
  return (
    <div className="scene">
      <div className="section_label">📥 Your inbox</div>

      <div className="email_chrome">
        <div className="browser_bar">
          <span className="dot dot_red" />
          <span className="dot dot_yellow" />
          <span className="dot dot_green" />
          <div className="url_bar">
            <span className="lock_icon">🔒</span>
            mail.yourcompany.com
          </div>
        </div>

        <div className="email_layout">
          <div className="email_list_pane">
            <div className="email_row dimmed">
              <div className="email_from">IT Helpdesk</div>
              <div className="email_subj">Weekly digest</div>
            </div>
            <div className="email_row dimmed">
              <div className="email_from">HR Team</div>
              <div className="email_subj">Benefits reminder</div>
            </div>
            <div className="email_row unread">
              <div className="email_from suspicious">! IT-Security@corp-helpdesk.net</div>
              <div className="email_subj unread_subj">Action required: verify now</div>
            </div>
          </div>

          <div className="reading_pane">
            <div className="email_subject">⚠ Urgent: Your account expires in 2 hours</div>
            <div className="email_meta">
              <span>From: <strong className="flag_text">IT-Security@corp-helpdesk.net</strong></span>
              <span className="external_warning">⚠ External domain — not your company</span>
              <span>To: aaron@yourcompany.com</span>
            </div>
            <div className="email_body">
              Hi Aaron,
              <br /><br />
              We detected <strong>suspicious login attempts</strong> on your account.
              Verify your identity within <strong className="danger_text">2 hours</strong> or
              your account will be suspended.
              <br /><br />
              <span className="email_link">
                https://corp-portal-verify.secure-login-helpdesk.com/verify?user=aaron
              </span>
              <br /><br />
              Failure to act will result in IT notification and access revocation.
              <br /><br />
              — IT Security Team
            </div>
            <div className="warn_stripe">
              💡 Hover links to inspect the real URL before clicking
            </div>
          </div>
        </div>
      </div>

      <div className="prompt_box">
        <strong>🤔 What do you do?</strong>
        <p>Read carefully. Notice anything suspicious? Choose your action.</p>
      </div>

      <div className="action_row">
        <button className="btn btn_danger" onClick={() => onAction("fakesite")}>🔗 Click the link</button>
        <button className="btn btn_primary" onClick={() => onAction("success")}>🚩 Report as phishing</button>
        <button className="btn btn_ghost" onClick={() => onAction("success")}>🗑 Delete</button>
      </div>
    </div>
  );
}

// ─── Scene 2: Fake site ───────────────────────────────────────────────────────

function SceneFakeSite({ onAction }: { onAction: (s: Screen) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const filled = email.length > 3 && password.length > 2;

  return (
    <div className="scene">
      <div className="section_label">🌐 Browser opened</div>

      <div className="browser_chrome">
        <div className="browser_bar">
          <span className="dot dot_red" />
          <span className="dot dot_yellow" />
          <span className="dot dot_green" />
          <div className="url_bar url_danger">
            <span>🔓</span>
            corp-portal-verify.secure-login-helpdesk.com
          </div>
        </div>

        <div className="fake_site">
          <div className="fake_logo">Your<span className="fake_logo_accent">Company</span> Portal</div>
          <p className="fake_site_subtitle">Verify your identity to continue</p>

          <div className="login_card">
            <h3>Sign in to continue</h3>
            <div className="field_group">
              <label>Work email</label>
              <input
                type="email"
                placeholder="aaron@yourcompany.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="field_group">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {filled && (
              <div className="cred_warning">
                ⚠ You are about to send your credentials to an attacker.
              </div>
            )}
            <button
              className="btn btn_danger btn_full"
              disabled={!filled}
              onClick={() => onAction("breach")}
            >
              Sign in
            </button>
            <p className="fake_footer">Secured by Corp-Portal-Auth™</p>
          </div>
        </div>
      </div>

      <div className="tip_box">
        💡 The URL is <strong>not</strong> your company&apos;s domain — it&apos;s a convincing
        fake. Legitimate portals use <code>yourcompany.com</code>, never external hostnames.
      </div>

      <div className="action_row">
        <button className="btn btn_warn" onClick={() => onAction("inbox")}>
          ← Close tab — go back
        </button>
      </div>
    </div>
  );
}

// ─── Scene 3: Breach ──────────────────────────────────────────────────────────

function SceneBreach({ onAction }: { onAction: (s: Screen) => void }) {
  const [lines, setLines] = useState<{ cls: string; text: string }[]>([
    { cls: "t_ok", text: "> Connection established from 185.220.101.47 (Tor exit node)" },
  ]);
  const [steps, setSteps] = useState<ChainStep[]>([]);
  const [showDamage, setShowDamage] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Animated counters
  const [accounts, setAccounts] = useState("0");
  const [data, setData] = useState("0 MB");
  const [cost, setCost] = useState("$0");

  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    TERMINAL_LINES.forEach((l) =>
      timeouts.push(setTimeout(() => setLines((prev) => [...prev, { cls: l.cls, text: l.text }]), l.delay))
    );
    CHAIN_STEPS.forEach((step) =>
      timeouts.push(setTimeout(() => setSteps((prev) => [...prev, step]), step.delay))
    );
    timeouts.push(
      setTimeout(() => {
        clearInterval(timer);
        setShowDamage(true);
        setShowCta(true);
        // Animate counts
        let i = 0;
        const countTimer = setInterval(() => {
          i++;
          const t = i / 30;
          setAccounts(String(Math.round(7 * t)));
          setData(`${Math.round(847 * t)} MB`);
          setCost(`$${Math.round(340000 * t).toLocaleString()}`);
          if (i >= 30) clearInterval(countTimer);
        }, 40);
      }, 8200)
    );

    return () => { clearInterval(timer); timeouts.forEach(clearTimeout); };
  }, []);

  useEffect(() => {
    if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [lines]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="scene">
      <div className="section_label danger_label">💀 Breach sequence initiated</div>

      <div className="breach_panel">
        <div className="breach_header">
          <div>
            <div className="breach_title">CREDENTIAL BREACH DETECTED</div>
            <div className="breach_sub">Attack chain in progress</div>
          </div>
          <div className="breach_timer">{mm}:{ss}</div>
        </div>

        <div className="terminal" ref={terminalRef}>
          {lines.map((l, i) => (
            <div key={i} className="t_line">
              <span className="t_prompt">[SYS]</span>
              <span className={l.cls}>{l.text}</span>
            </div>
          ))}
        </div>

        <div className="chain_steps">
          {steps.map((step, i) => (
            <div key={i} className="chain_step">
              <div className={`cs_icon ${step.colorCls}`}>{step.icon}</div>
              <div>
                <div className="cs_title">{step.title}</div>
                <div className="cs_detail">{step.detail}</div>
              </div>
            </div>
          ))}
        </div>

        {showDamage && (
          <div className="damage_grid">
            <div className="dmg_cell"><div className="dmg_val dmg_red">{accounts}</div><div className="dmg_lbl">accounts at risk</div></div>
            <div className="dmg_cell"><div className="dmg_val dmg_amber">{data}</div><div className="dmg_lbl">data exposed</div></div>
            <div className="dmg_cell"><div className="dmg_val dmg_teal">{cost}</div><div className="dmg_lbl">estimated cost</div></div>
          </div>
        )}
      </div>

      {showCta && (
        <div className="cta_center">
          <button className="btn btn_primary" onClick={() => onAction("damage")}>
            See full damage report →
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Scene 4a: Damage ─────────────────────────────────────────────────────────

function SceneDamage({ onReset, onSkip }: { onReset: () => void; onSkip: () => void }) {
  return (
    <div className="scene">
      <div className="damage_screen">
        <div className="damage_icon">💀</div>
        <h2 className="damage_title">Account Compromised</h2>
        <p className="damage_sub">What happened in the 72 hours after you clicked.</p>
      </div>

      <div className="damage_report">
        {DAMAGE_ROWS.map(({ label, value, cls }) => (
          <div key={label} className="dr_row">
            <span className="dr_label">{label}</span>
            <span className={cls}>{value}</span>
          </div>
        ))}
      </div>

      <div className="insight_box">
        <strong>One click. Real consequences.</strong>
        <br />
        The average time between a phishing click and attacker access is{" "}
        <strong className="flag_text">under 2 minutes</strong>. Automated tools do
        the rest — no human attacker needed.
      </div>

      <div className="action_row centered">
        <button className="btn btn_primary" onClick={onReset}>🔄 Try again — make the right call</button>
        <button className="btn btn_ghost" onClick={onSkip}>Skip to lesson</button>
      </div>
    </div>
  );
}

// ─── Scene 4b: Success ────────────────────────────────────────────────────────

function SceneSuccess({ onBack, onReset }: { onBack: () => void; onReset: () => void }) {
  return (
    <div className="scene">
      <div className="success_screen">
        <div className="success_icon">🛡️</div>
        <h2>Threat Neutralised</h2>
        <p className="success_sub">
          You correctly identified and reported the phishing email. Your IT team has blocked the domain.
        </p>
      </div>
      <div className="lesson_box">
        <strong>What gave this phishing email away?</strong>
        {LESSON_POINTS.map((pt, i) => (
          <div key={i} className="lesson_point">
            <span className={pt.bullet}>●</span>
            <span>{pt.text}</span>
          </div>
        ))}
      </div>

      <div className="action_row centered">
        <button className="btn btn_primary" onClick={onBack}>Back to Modules</button>
        <button className="btn btn_ghost" onClick={onReset}>🔄 Play again</button>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function GamifiedPage() {
  const router = useRouter();
  const [screen, setScreen] = useState<Screen>("inbox");
  const [resetKey, setResetKey] = useState(0);

  const goScreen = useCallback((s: Screen) => setScreen(s), []);

  const reset = useCallback(() => {
    setScreen("inbox");
    setResetKey((k) => k + 1);
  }, []);

  return (
    <div className="gamified_wrapper">
      <StepHeader screen={screen} />

      {screen === "inbox"    && <SceneInbox    key={`inbox-${resetKey}`}    onAction={goScreen} />}
      {screen === "fakesite" && <SceneFakeSite key={`fakesite-${resetKey}`} onAction={goScreen} />}
      {screen === "breach"   && <SceneBreach   key={`breach-${resetKey}`}   onAction={goScreen} />}
      {screen === "damage"   && <SceneDamage   onReset={reset} onSkip={() => goScreen("success")} />}
      {screen === "success"  && <SceneSuccess  onBack={() => router.push("/modules")} onReset={reset} />}
    </div>
  );
}