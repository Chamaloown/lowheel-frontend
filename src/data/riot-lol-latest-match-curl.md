# Get Latest League of Legends Match using Riot API (curl)

This guide explains how to fetch the **most recent League of Legends match** for a player using the Riot Developer API, with simple `curl` commands.

## Prerequisites

- A valid **Riot API Key**
- The player's **Riot ID** (`gameName#tagLine`)
- Correct **routing region** (Match-V5 uses routing regions)

---

## 1. Get the Player PUUID

The Match API works with `puuid`, not summoner name.

```bash
curl -X GET \
  "https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/PlayerName/EUW" \
  -H "X-Riot-Token: YOUR_API_KEY"
```

Example response:

```json
{
  "puuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "gameName": "PlayerName",
  "tagLine": "EUW"
}
```

Save the `puuid` for the next steps.

---

## 2. Get the Latest Match ID

Request the most recent match ID for the player.

```bash
curl -X GET \
  "https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/PUUID_HERE/ids?start=0&count=1" \
  -H "X-Riot-Token: YOUR_API_KEY"
```

Response:

```json
[
  "EUW1_6789123456"
]
```

This is the **latest match ID**.

---

## 3. Get Full Match Details

Fetch detailed information about the match.

```bash
curl -X GET \
  "https://europe.api.riotgames.com/lol/match/v5/matches/EUW1_6789123456" \
  -H "X-Riot-Token: YOUR_API_KEY"
```

The response includes:
- Game mode & queue type
- Participants
- Champions played
- KDA & stats
- Win / loss
- Game duration & timestamps

---

## Routing Regions

Match-V5 uses **routing regions**, not platform regions.

| Player Region | Routing Value |
|--------------|---------------|
| EUW / EUNE | europe |
| NA / BR / LATAM | americas |
| KR / JP | asia |

---

## Optional: One-liner to Get Latest Match ID

```bash
curl -s \
  "https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/PUUID_HERE/ids?start=0&count=1" \
  -H "X-Riot-Token: YOUR_API_KEY"
```

---

## Notes

- Riot APIs only allow match history **per player**
- Recent matches may take a short time to become available
- API keys are rate-limited and dev keys expire every 24h

---

Happy hacking 🎮
