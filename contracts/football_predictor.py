# { "Depends": "py-genlayer:1jb45aa8ynh2a9c9xn3b7qqh8sm5q93hwfp7jqmwsfhh8jpz09h6" }

import json
from genlayer import *


class FootballPredictor(gl.Contract):
    predictions: TreeMap[str, str]
    prediction_count: u256

    def __init__(self):
        self.prediction_count = u256(0)

    @gl.public.write
    def predict_match(self, home_team: str, away_team: str, match_date: str) -> str:
        home_team = str(home_team).strip()
        away_team = str(away_team).strip()
        match_date = str(match_date).strip()

        if not home_team:
            raise Exception("home_team required")
        if not away_team:
            raise Exception("away_team required")
        if not match_date:
            raise Exception("match_date required")

        prediction = self._analyze_match(home_team, away_team, match_date)

        key = str(int(self.prediction_count))
        record = {
            "submitter": str(gl.message.sender_address),
            "home_team": home_team,
            "away_team": away_team,
            "match_date": match_date,
            "home_win_prob": prediction["home_win_prob"],
            "draw_prob": prediction["draw_prob"],
            "away_win_prob": prediction["away_win_prob"],
            "predicted_score": prediction["predicted_score"],
            "confidence": prediction["confidence"],
            "analysis": prediction["analysis"],
        }
        self.predictions[key] = json.dumps(record)
        self.prediction_count += u256(1)
        return key

    def _analyze_match(self, home_team: str, away_team: str, match_date: str) -> dict:
        def leader_fn() -> str:
            page_content = "(could not fetch)"
            try:
                bbc_url = "https://www.bbc.com/sport/football/scores-fixtures/" + match_date
                raw = gl.nondet.web.render(bbc_url, mode="text")
                page_content = raw[:4000]
            except Exception:
                pass

            prompt = f"""You are a football analyst AI. Analyze the upcoming match and provide prediction.

HOME TEAM: {home_team}
AWAY TEAM: {away_team}
MATCH DATE: {match_date}

WEB DATA:
{page_content}

RULES:
1. Analyze team form, head-to-head records, and any available statistics.
2. Probabilities must sum to 100.
3. Confidence: high (strong indicators), medium (some data), low (limited info).
4. Provide brief analysis explaining your prediction.

Reply ONLY valid JSON:
{{"home_win_prob": <0-100>, "draw_prob": <0-100>, "away_win_prob": <0-100>, "predicted_score": "<home>-<away>", "confidence": "high"/"medium"/"low", "analysis": "<brief explanation>"}}"""

            raw = gl.nondet.exec_prompt(prompt, response_format="json")
            data = raw if isinstance(raw, dict) else json.loads(str(raw).strip())

            home_win = int(data.get("home_win_prob", 33))
            draw = int(data.get("draw_prob", 34))
            away_win = int(data.get("away_win_prob", 33))

            # Normalize to 100
            total = home_win + draw + away_win
            if total > 0:
                home_win = int(home_win * 100 / total)
                draw = int(draw * 100 / total)
                away_win = 100 - home_win - draw

            predicted_score = str(data.get("predicted_score", "1-1")).strip()
            if not predicted_score:
                predicted_score = "1-1"

            confidence = str(data.get("confidence", "")).strip().lower()
            if confidence not in ("high", "medium", "low"):
                confidence = "medium"

            analysis = str(data.get("analysis", "")).strip()
            if not analysis:
                analysis = "Analysis based on available data"

            return json.dumps({
                "home_win_prob": home_win,
                "draw_prob": draw,
                "away_win_prob": away_win,
                "predicted_score": predicted_score,
                "confidence": confidence,
                "analysis": analysis,
            })

        def validator_fn(leader_result) -> bool:
            if not isinstance(leader_result, gl.vm.Return):
                return False
            try:
                data = json.loads(leader_result.calldata)

                home_win = data.get("home_win_prob")
                draw = data.get("draw_prob")
                away_win = data.get("away_win_prob")

                if not isinstance(home_win, int) or home_win < 0 or home_win > 100:
                    return False
                if not isinstance(draw, int) or draw < 0 or draw > 100:
                    return False
                if not isinstance(away_win, int) or away_win < 0 or away_win > 100:
                    return False

                if data.get("confidence") not in ("high", "medium", "low"):
                    return False

                predicted_score = data.get("predicted_score")
                if not isinstance(predicted_score, str) or not predicted_score.strip():
                    return False

                analysis = data.get("analysis")
                if not isinstance(analysis, str) or not analysis.strip():
                    return False

                return True
            except Exception:
                return False

        return json.loads(gl.vm.run_nondet_unsafe(leader_fn, validator_fn))

    @gl.public.view
    def get_prediction(self, prediction_id: str) -> dict:
        prediction_id = str(prediction_id)
        if prediction_id not in self.predictions:
            return {"exists": False}
        return json.loads(self.predictions[prediction_id])

    @gl.public.view
    def get_all_predictions(self) -> list:
        result = []
        for key in self.predictions:
            entry = json.loads(self.predictions[key])
            entry["id"] = key
            result.append(entry)
        return result

    @gl.public.view
    def get_count(self) -> dict:
        return {"total": int(self.prediction_count)}

    @gl.public.view
    def get_user_predictions(self, user_address: str) -> list:
        user_address = str(user_address).lower()
        result = []
        for key in self.predictions:
            entry = json.loads(self.predictions[key])
            if str(entry.get("submitter", "")).lower() == user_address:
                entry["id"] = key
                result.append(entry)
        return result
