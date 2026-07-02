# { "Depends": "py-genlayer:test" }
# 
# FootballPredictor Intelligent Contract
# Deployed at: 0x0112Bf6e83497965A5fdD6Dad1E447a6E004271D
# Network: GenLayer Testnet Bradbury
# Explorer: https://explorer-bradbury.genlayer.com/contract/0x0112Bf6e83497965A5fdD6Dad1E447a6E004271D

from genlayer import *
import json
import typing


class FootballPredictor(gl.Contract):
    """
    Intelligent Contract for AI-powered football match predictions.
    
    This contract:
    1. Fetches live data from BBC Sport via gl.get_webpage()
    2. Uses LLM analysis via gl.exec_prompt()
    3. Reaches validator consensus via gl.eq_principle_strict_eq()
    4. Stores predictions permanently on-chain
    """
    
    prediction_count: u32
    predictions: TreeMap[str, str]  # prediction_id -> JSON result
    user_predictions: TreeMap[str, str]  # address -> comma-separated prediction_ids

    def __init__(self):
        self.prediction_count = u32(0)
        self.predictions = TreeMap[str, str]()
        self.user_predictions = TreeMap[str, str]()

    @gl.public.write
    def predict_match(
        self,
        home_team: str,
        away_team: str,
        match_date: str
    ) -> str:
        """
        Analyze and predict a football match using on-chain AI.
        
        Args:
            home_team: Name of the home team
            away_team: Name of the away team
            match_date: Date of the match (YYYY-MM-DD)
            
        Returns:
            JSON string with prediction results
        """
        
        def analyze() -> str:
            # 1. Fetch live data from BBC Sport
            bbc_url = (
                "https://www.bbc.com/sport/football/scores-fixtures/"
                + match_date
            )
            web_data = gl.get_webpage(bbc_url, mode="text")

            # 2. Use AI to analyze all available data
            task = f"""You are a football analyst AI. Analyze the upcoming match:

Home Team: {home_team}
Away Team: {away_team}
Date: {match_date}

Use the following web data to inform your analysis:
{web_data[:3000]}

Based on historical performance, current form, head-to-head records,
and any available information, provide your prediction.

Respond ONLY with this exact JSON format, no other text:
{{
    "home_win_prob": <number 0-100>,
    "draw_prob": <number 0-100>,
    "away_win_prob": <number 0-100>,
    "predicted_score": "<home_goals> - <away_goals>",
    "confidence": <number 0-100>,
    "analysis": "<brief analysis text>"
}}
"""
            result = gl.exec_prompt(task)
            
            # Clean any markdown formatting
            cleaned = (
                result.replace("```json", "")
                .replace("```", "")
                .strip()
            )
            
            # Validate JSON and normalize
            parsed = json.loads(cleaned)
            return json.dumps(parsed, sort_keys=True)

        # Use Equivalence Principle — validators must agree on the result
        prediction_json = gl.eq_principle_strict_eq(analyze)

        # Generate unique prediction ID
        self.prediction_count = u32(self.prediction_count + 1)
        prediction_id = f"{home_team}_vs_{away_team}_{match_date}_{self.prediction_count}"

        # Store prediction on-chain
        self.predictions[prediction_id] = prediction_json

        # Track user's predictions
        sender = str(gl.message.sender_address)
        existing = self.user_predictions.get(sender, "")
        if existing:
            self.user_predictions[sender] = existing + "," + prediction_id
        else:
            self.user_predictions[sender] = prediction_id

        return prediction_json

    @gl.public.view
    def get_prediction(self, prediction_id: str) -> str:
        """Get a specific prediction by ID."""
        return self.predictions.get(prediction_id, "{}")

    @gl.public.view
    def get_prediction_count(self) -> u32:
        """Get total number of predictions made."""
        return self.prediction_count

    @gl.public.view
    def get_user_predictions(self, user_address: str) -> str:
        """Get all prediction IDs for a user."""
        return self.user_predictions.get(user_address, "")
