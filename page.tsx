"use client";

import { useMemo, useState } from "react";

type NodeId =
  | "start"
  | "funded"
  | "governance"
  | "data"
  | "provider"
  | "route"
  | "actions_buyin"
  | "actions_buyout"
  | "actions_prep";

type Choice = {
  label: string;
  next: NodeId;
  tag?: string;
};

type Node = {
  title: string;
  question?: string;
  why: string;
  choices?: Choice[];
  actions?: string[];
};

const NODES: Record<NodeId, Node> = {
  start: {
    title: "Irish DB Endgame Strategy Navigator",
    why: "Interactive framework for assessing pension risk transfer readiness.",
    question: "Is scheme funding close to insurer pricing levels?",
    choices: [
      { label: "Yes / close", next: "funded", tag: "Endgame funding" },
      { label: "Not yet", next: "actions_prep", tag: "Needs funding journey" }
    ]
  },
  funded: {
    title: "Governance alignment",
    why: "Execution depends heavily on trustee and sponsor alignment.",
    question: "Are trustees and sponsor aligned on endgame?",
    choices: [
      { label: "Aligned", next: "governance", tag: "Governance aligned" },
      { label: "Not aligned", next: "actions_prep", tag: "Alignment gap" }
    ]
  },
  governance: {
    title: "Data readiness",
    why: "Data quality drives insurer appetite and pricing.",
    question: "Is scheme data market-ready?",
    choices: [
      { label: "Yes", next: "provider", tag: "Data ready" },
      { label: "No", next: "actions_prep", tag: "Data remediation needed" }
    ]
  },
  provider: {
    title: "Strategic route",
    why: "Choose the path that solves the real constraint.",
    question: "Preferred route?",
    choices: [
      { label: "Buy-in", next: "actions_buyin", tag: "Route Buy-in" },
      { label: "Buy-out", next: "actions_buyout", tag: "Route Buy-out" }
    ]
  },
  actions_buyin: {
    title: "Recommendation: Buy-in",
    why: "Stage risk transfer while maintaining scheme structure.",
    actions: [
      "Define liability tranche.",
      "Run readiness sprint.",
      "Design insurer process."
    ]
  },
  actions_buyout: {
    title: "Recommendation: Buy-out",
    why: "Full risk transfer and settlement.",
    actions: [
      "Confirm endgame intent.",
      "Prepare settlement mechanics.",
      "Engage insurer market."
    ]
  },
  actions_prep: {
    title: "Recommendation: Build readiness",
    why: "Scheme not ready for market engagement.",
    actions: [
      "Improve governance.",
      "Clean data.",
      "Define funding triggers."
    ]
  }
};

export default function Home() {
  const [current, setCurrent] = useState<NodeId>("start");
  const [path, setPath] = useState<string[]>([]);

  const node = NODES[current];

  const summary = useMemo(
    () => (path.length ? path.join(" → ") : "No path selected yet."),
    [path]
  );

  function choose(c: Choice) {
    setPath((p) => (c.tag ? [...p, c.tag] : p));
    setCurrent(c.next);
  }

  function reset() {
    setCurrent("start");
    setPath([]);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        fontFamily: "system-ui, sans-serif",
        padding: 40
      }}
    >
      <div style={{ maxWidth: 1000, margin: "auto" }}>
        <h1 style={{ fontSize: 34 }}>Irish DB Endgame Strategy Navigator</h1>
        <p style={{ color: "#555" }}>{node.why}</p>

        <div style={{ display: "flex", gap: 20 }}>
          {/* Main Card */}
          <div
            style={{
              flex: 2,
              background: "white",
              padding: 24,
              borderRadius: 12,
              boxShadow: "0 6px 20px rgba(0,0,0,0.08)"
            }}
          >
            <h2>{node.title}</h2>

            {node.question && (
              <p style={{ fontSize: 18 }}>{node.question}</p>
            )}

            {node.choices?.map((c, i) => (
              <button
                key={i}
                onClick={() => choose(c)}
                style={{
                  display: "block",
                  marginTop: 12,
                  padding: 12,
                  borderRadius: 8,
                  border: "1px solid #ddd",
                  background: "white",
                  cursor: "pointer"
                }}
              >
                {c.label}
              </button>
            ))}

            {node.actions && (
              <>
                <h3 style={{ marginTop: 20 }}>Recommended actions</h3>
                <ul>
                  {node.actions.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </>
            )}

            <button onClick={reset} style={{ marginTop: 20 }}>
              Restart
            </button>
          </div>

          {/* Sidebar */}
          <div
            style={{
              flex: 1,
              background: "white",
              padding: 20,
              borderRadius: 12,
              boxShadow: "0 6px 20px rgba(0,0,0,0.08)"
            }}
          >
            <h3>Path summary</h3>
            <p>{summary}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
