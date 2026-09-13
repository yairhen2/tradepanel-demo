# TradePanel

**TradePanel is a decision-support and stock-scanning project built to turn market observations into structured, reviewable trade plans.** It began as an effort to combine technical setup detection, Interactive Brokers experimentation, entry/stop/target planning, risk/reward controls, and decision tracking in one focused workflow.

## Live demo

**[Open the TradePanel public demo](https://yairhen2.github.io/tradepanel-demo/)**

The demo is a safe, frontend-only portfolio representation of the broader product direction. It shows how a user can select a trading horizon, choose a strategy, scan a deterministic universe, inspect candidates, review charts and risk levels, and record a simulated decision.

## What the demo demonstrates

- Day Trading, Swing Trading, and Long-Term scanner modes
- A normalized catalog of 30 established strategy concepts
- Mode-specific strategy selection and deterministic evaluation logic
- A three-condition Custom Strategy builder for every mode
- Simulated fundamental fields for long-term research candidates
- Entry, stop, target, and minimum risk/reward workflows
- Candidate confidence, hard-filter rejection reasons, and CSV export
- Interactive chart review, Data Vault, Analytics, Versions, Health, and Security views
- Responsive single-page architecture with no build step or backend dependency

TradePanel Strategy v1.0 remains the default day-trading profile and is represented alongside the expanded catalog rather than replaced.

## Architecture

The public build is intentionally simple: semantic HTML, CSS, and vanilla JavaScript. `scanner-upgrade.js` contains a normalized strategy catalog with shared metadata and mode-aware evaluation profiles. A seeded pseudo-random generator makes every scan reproducible while allowing strategy selection to materially change filter outcomes.

This architecture is a portfolio demonstration, not a production market-data system. It is designed to communicate product thinking, strategy normalization, risk controls, UI behavior, and the boundary between real development experimentation and safe public simulation.

## Project status

The broader TradePanel work includes implemented and experimental scanner, indicator, persistence, broker-integration, planning, and analytics concepts. Production market data, complete brokerage integration, validated strategy performance, and production deployment remain in development.

See **[Project Progress](MASTER_CHECKLIST.md)** for the concise, honest status dashboard and **[Strategy Research](TRADEPANEL_STRATEGY_RESEARCH.md)** for the research basis behind the catalog.

## Run locally

Open `index.html` in a modern browser. For the most consistent behavior, serve the folder with any static HTTP server, for example:

```bash
python -m http.server 8080
```

Then visit `http://localhost:8080`.

## Disclaimer

This repository is a **public portfolio demo using deterministic simulated market, account, infrastructure, and fundamental data**. It has no live brokerage connection, transmits no orders, and does not provide live market or fundamental data. Strategies are educational product concepts, not investment advice or claims of profitability. Trading and investing involve risk, including loss of principal.

