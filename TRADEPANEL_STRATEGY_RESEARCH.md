# TradePanel Strategy Research

## Purpose and selection standard

This research translates established trading and investing concepts into a defensible public-demo catalog. “Top” means recognizable, documented, suitable for the stated horizon, and useful for demonstrating a scanner architecture—not guaranteed profitable. Exact thresholds in the demo are illustrative and deterministic. They require historical validation, transaction-cost modeling, and paper testing before any production use.

Research reviewed broker education, regulators, index/factor research, recognized technical-analysis references, and academic literature. Strategies were selected for diversity, scanner suitability, and compatibility with TradePanel's current OHLC, volume, VWAP, EMA/SMA, RSI, ATR, SQZMOM, structure, candle, risk/reward, and simulated-fundamental fields.

**Legend:** Compatibility is `Current` when the public demo already models the core inputs, `Derived` when it can calculate them from modeled history, and `Simulated` when credible production use needs a licensed external dataset. Complexity is relative implementation effort.

## Day Trading catalog

| Strategy | Category · holding period | Conditions and required data | Setup and entry | Exit and risk management | Scanner fit · compatibility · gap · complexity |
|---|---|---|---|---|---|
| TradePanel Strategy v1.0 | Momentum/pullback · minutes–hours | Directional session; OHLC, VWAP, EMA 9/21, SQZMOM, structure, candles, ATR | Bias-aligned pullback near VWAP/EMA; confirmed trigger and SQZMOM transition | Structure/ATR stop; ≥2R target; hard filters gate | High · Current · broader validation · Medium |
| Opening Range Breakout | Breakout · minutes–hours | Active open; opening range, volume, relative volume, ATR | Build opening range; enter confirmed range break with volume | Opposite range/ATR stop; measured move or trailing exit | High · Derived · session/catalyst calendar · Medium |
| VWAP Pullback Continuation | Trend continuation · minutes–hours | Orderly trend; intraday OHLC, VWAP, EMA, volume | First controlled pullback holds VWAP; enter on continuation candle | Below VWAP/swing stop; prior high or risk multiple | High · Current · none for demo · Low |
| Relative-Volume Momentum | Momentum · minutes–hours | Catalyst/participation; relative volume, price change, RSI, spreads | Rank unusual volume and momentum; enter continuation or break | ATR/structure stop; scale/trail as momentum fades | High · Current · live news/spread data · Medium |
| EMA 9/21 Trend Continuation | Trend · minutes–hours | Persistent trend; EMA 9/21, price, structure, volume | EMA alignment plus pullback/reclaim; enter resumed direction | Beyond slow EMA/swing; trail or fixed R target | High · Current · none for demo · Low |
| Volatility Squeeze Release | Volatility breakout · minutes–hours | Compression; Bollinger/Keltner or SQZMOM, ATR, volume | Detect squeeze then directional release; enter confirmed expansion | Compression boundary/ATR stop; trail expansion | High · Current proxy · canonical band inputs · Medium |
| Breakout and Retest | Price action · minutes–hours | Clean horizontal level; OHLC, volume, structure | Break level, hold retest, enter confirming candle | Beyond retest invalidation; next level/measured target | High · Current · robust level detection · Medium |
| VWAP Mean Reversion | Mean reversion · minutes | Range regime; VWAP distance, RSI, ATR, volume | Identify statistically extended price; enter confirmed reversion | Beyond excursion extreme; VWAP/partial target | Medium · Current · regime and distribution model · High |
| RSI Exhaustion Reversal | Reversal · minutes–hours | Extended move losing force; RSI, candles, momentum, ATR | Extreme RSI plus reversal candle/divergence proxy | Beyond extreme; VWAP/structure target; smaller sizing | Medium · Current · divergence logic · Medium |
| Volume-Confirmed High Break | Breakout · minutes–hours | Consolidation at session high; OHLC, range, relative volume | Break session/range high on expanding volume | Back inside range/ATR stop; measured move/trail | High · Current · microstructure confirmation · Medium |

## Swing Trading catalog

| Strategy | Category · holding period | Conditions and required data | Setup and entry | Exit and risk management | Scanner fit · compatibility · gap · complexity |
|---|---|---|---|---|---|
| Daily Breakout | Breakout · 2–15 days | Daily base; OHLC, volume, ATR | Close beyond resistance with volume; enter close/retest | Below breakout/swing; measured move or trail | High · Derived · adjusted daily history · Medium |
| 20/50 EMA Pullback | Trend continuation · 3–20 days | Established daily trend; EMA 20/50, RSI, ATR | Pullback holds trend average; enter reversal confirmation | Below swing/ATR; prior high or trailing EMA | High · Derived · none for demo · Low |
| Bull Flag Continuation | Chart pattern · 2–15 days | Strong impulse and tight pullback; OHLC, volume | Detect flag with contracting volume; enter upper break | Below flag; flagpole/measured target | Medium · Derived · robust pattern recognition · High |
| RSI Trend Regime | Momentum · 3–20 days | Persistent trend; RSI, moving averages, structure | RSI holds bullish regime and turns up; enter with trend | Regime loss/swing stop; trail trend | High · Derived · none for demo · Low |
| 50/200 SMA Trend Cross | Trend · weeks–months | Major transition; SMA 50/200, price, volume | Cross plus price/volume confirmation; enter after close | Trend invalidation/ATR; long trailing exit | High · Derived · long clean history · Low |
| ATR Expansion Breakout | Volatility · 2–15 days | Base resolving; ATR percentile, OHLC, volume | ATR expands as price exits range | Range/ATR stop; volatility trail | High · Derived · ATR percentile history · Medium |
| Market Relative Strength | Relative strength · 1–8 weeks | Leadership market; benchmark returns, daily OHLC | Rank outperformance and enter aligned breakout/pullback | Relative-strength loss/structure stop | High · Derived · benchmark/sector series · Medium |
| Weekly/Daily Alignment | Multi-timeframe · 1–8 weeks | Weekly and daily trends agree; OHLC, EMA/SMA, RSI | Weekly filter, daily trigger | Daily swing/weekly invalidation; trailing target | High · Derived · resampled history · Medium |
| Support Reclaim | Price action · 2–15 days | Pullback to established support; OHLC, volume, ATR | Close back above support with reversal evidence | Below reclaim low; prior resistance/≥2R | High · Derived · reliable level scoring · Medium |
| Trend Channel Break | Breakout · 3–30 days | Orderly channel; OHLC, regression/trendlines, volume | Close outside channel with confirmation | Back inside channel; measured width/trail | Medium · Derived · channel-fitting logic · High |

## Long-Term catalog

| Strategy | Category · holding period | Conditions and required data | Setup and entry | Exit and risk management | Scanner fit · compatibility · gap · complexity |
|---|---|---|---|---|---|
| Quality at a Reasonable Price | Quality/value · 1–5 years | Profitable durable firms; ROIC, FCF, leverage, valuation | Quality threshold plus valuation ceiling; staged entry | Thesis/quality deterioration or valuation review; diversify | High · Simulated · licensed statements/estimates · High |
| Fundamental Value | Value · 1–5 years | Discounted viable firms; P/E, FCF yield, earnings, debt | Rank valuation after solvency/profitability screen | Thesis failure, balance-sheet stress, fair-value review | High · Simulated · normalized fundamentals · High |
| Profitable Growth | Growth/quality · 1–5 years | Durable growth; revenue/EPS growth, margins, FCF, ROIC | Growth thresholds with positive economics; staged entry | Growth/quality breakdown; valuation-aware review | High · Simulated · estimates and history · High |
| Dividend Growth | Income/quality · 3–10 years | Stable cash generators; dividends, payout, FCF, debt | Sustainable yield plus multi-year growth screen | Cut risk, payout/FCF deterioration; diversify sectors | High · Simulated · dividend history · High |
| Durable Quality Compounders | Quality · 3–10 years | High returns and reinvestment; ROIC, ROE, margins, FCF | Consistent quality plus acceptable trend/valuation | Structural return/margin decline; thesis review | High · Simulated · multi-year fundamentals · High |
| Free-Cash-Flow Yield | Value/cash flow · 1–5 years | Cash-generative firms; FCF, enterprise value, debt | High normalized FCF yield after quality screen | FCF deterioration or leverage rise; fair-value review | High · Simulated · normalized/cyclical FCF · High |
| Balance-Sheet Strength | Quality/risk · 1–5 years | Resilient businesses; debt/equity, coverage, FCF, ROIC | Low leverage plus positive profitability | Credit deterioration/thesis failure; diversification | High · Simulated · full balance-sheet data · Medium |
| Earnings Growth & Revision | Growth/momentum · 6–24 months | Improving expectations; EPS/revenue growth, estimate revisions, trend | Rank positive growth and revision proxy; staged entry | Negative revisions/trend failure; position limits | High · Simulated · analyst-estimate feed · High |
| 200-Day Trend Filter | Long-term momentum · 6–24 months | Persistent uptrend; adjusted prices, SMA 200, relative strength, profitability | Price above rising SMA 200 with positive relative strength | Sustained trend break; volatility-aware review | High · Derived + Simulated quality gate · adjusted history · Medium |
| Quality–Value–Momentum Blend | Multi-factor · 1–5 years | Broad factor leadership; standardized quality, value, momentum ranks | Composite rank with sector-aware diversification | Rebalance on rank decay; turnover and exposure limits | High · Simulated · point-in-time factor dataset · Very high |

## Architecture implications

The catalog normalizes identity, mode, category, description, holding period, required data, hard and soft filters, entry/exit rules, stop and target methods, minimum risk/reward, confidence method, scanner compatibility, data status, and implementation status. UI panels and deterministic evaluators consume the same records. This prevents the strategy selector from being a cosmetic label switch.

Production implementation would additionally require point-in-time datasets, corporate-action adjustment, survivorship-bias controls, spreads/slippage/fees, realistic fill assumptions, walk-forward validation, benchmark selection, and monitoring for rule/data drift.

## Sources reviewed

1. [FINRA — Day Trading](https://www.finra.org/investors/investing/investment-products/stocks/day-trading)
2. [SEC Investor.gov — Day Trading](https://www.investor.gov/introduction-investing/investing-basics/glossary/day-trading)
3. [Charles Schwab — Volume-Weighted Indicators and VWAP](https://www.schwab.com/learn/story/how-to-use-volume-weighted-indicators-trading)
4. [Fidelity — Technical Indicator Guide](https://www.fidelity.com/learning-center/trading-investing/technical-analysis/technical-indicator-guide)
5. [Fidelity — Momentum Trading Using Premarket Indicators](https://www.fidelity.com/bin-public/060_www_fidelity_com/documents/MomentumTrading_08_2010_V2.pdf)
6. [Interactive Brokers Campus — Risk Management and the Trade Plan](https://www.interactivebrokers.com/campus/trading-lessons/step-3-risk-management-and-your-trade-plan/)
7. [Fidelity — Swing Trading Setups](https://www.fidelity.com/learning-center/trading-investing/trading/swing-trading-setups)
8. [Charles Schwab — Swing Trading Strategies](https://www.schwab.com/learn/story/swing-trading-strategies)
9. [Charles Schwab — The Ins and Outs of a Swing Trade](https://www.schwab.com/learn/story/ins-and-outs-swing-trade)
10. [Fidelity — Relative Strength Index](https://www.fidelity.com/learning-center/trading-investing/technical-analysis/technical-indicator-guide/RSI)
11. [Fidelity — Exponential Moving Average](https://www.fidelity.com/learning-center/trading-investing/technical-analysis/technical-indicator-guide/ema)
12. [CFA Institute — Equity Valuation: Concepts and Basic Tools](https://www.cfainstitute.org/insights/professional-learning/refresher-readings/2025/equity-valuation-concepts-basic-tools)
13. [MSCI — Factor Investing](https://www.msci.com/our-solutions/factor-investing)
14. [S&P Dow Jones Indices — Quality Indices](https://www.spglobal.com/spdji/en/index-family/factors/quality/)
15. [Fama and French — Common Risk Factors in Stock and Bond Returns](https://doi.org/10.1016/0304-405X(93)90023-5)
16. [Jegadeesh and Titman — Returns to Buying Winners and Selling Losers](https://doi.org/10.1111/j.1540-6261.1993.tb04702.x)
17. [Novy-Marx — The Other Side of Value: The Gross Profitability Premium](https://doi.org/10.1016/j.jfineco.2013.01.003)
18. [AQR — Value and Momentum Everywhere](https://www.aqr.com/Insights/Research/Journal-Article/Value-and-Momentum-Everywhere)

Last reviewed: 2026-09-13.

