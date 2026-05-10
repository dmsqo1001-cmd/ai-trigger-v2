# AI TRIGGER Planning

## Final Service Flow

1. Five minutes before US regular market open, update price and float shares using FMP.

2. Build base watchlist using price and float criteria:
- $0.1 ~ $1: float <= 8,000,000
- $1 ~ $5: float <= 15,000,000
- $5 ~ $10: float <= 25,000,000
- $10 ~ $20: float <= 35,000,000

3. Add exception watchlist regardless of price and float:
- IPO / recent IPO stocks
- High short-interest / short squeeze watch stocks

4. During the market session, poll Massive Benzinga News REST every 3 seconds.

5. If news ticker matches today’s watchlist, check SEC filings.

6. Send news information and SEC risk information to Gemini.

7. Gemini analyzes:
- news strength
- momentum persistence
- SEC risk
- short squeeze possibility
- final trigger grade

8. Save the final result and show it on the website as a read-only live trigger feed.

## MVP 1 Scope

MVP 1 does not connect:
- FMP
- Massive
- SEC
- Gemini
- Supabase
- Toss
- Google login

MVP 1 only uses mock data.

## MVP 1 Pages

- /
- /pricing
- /login
- /feed
- /alert/[id]
- /admin

## MVP 1 Goal

The website should clearly show how tickers appear in the live feed using mock data.