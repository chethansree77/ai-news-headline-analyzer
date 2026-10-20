import os
import json

from dotenv import load_dotenv
from google import genai


# ========================================
# LOAD API KEY
# ========================================

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=api_key)


# ========================================
# GEMINI AI ANALYSIS
# ========================================

def analyze_headline_with_gemini(headline):

    prompt = f"""
You are an AI News Headline Language Analyzer.

Analyze this news headline:

"{headline}"

Your job is ONLY to analyze the language and structure
of the headline.

Do NOT determine whether the news is true or false.

Do NOT fact-check the claim.

Do NOT say that the news is definitely fake or true.

Analyze:

1. Emotional language
2. Specific emotional phrases
3. Clickbait possibility
4. Specific clickbait patterns
5. Warning signs
6. Things to verify
7. Careful analysis

Return ONLY valid JSON.

Use exactly this structure:

{{
    "emotional_language": "Low, Medium, or High",

    "emotional_phrases": [
        "exact phrase from headline"
    ],

    "clickbait_possibility": "Low, Medium, or High",

    "clickbait_patterns": [
        "specific pattern found"
    ],

    "warning_signs": [
        "specific warning sign"
    ],

    "things_to_verify": [
        "specific thing to verify"
    ],

    "careful_analysis": "short neutral analysis"
}}

The phrases in emotional_phrases should come
directly from the headline whenever possible.

Do not invent phrases that are not present.

Remain neutral.

A sensational headline does NOT automatically
mean the underlying news is false.
"""


    # ========================================
    # SEND TO GEMINI
    # ========================================

    response = client.interactions.create(
        model="gemini-3.6-flash",
        input=prompt
    )


    # ========================================
    # READ GEMINI RESPONSE
    # ========================================

    ai_text = response.output_text


    # ========================================
    # CONVERT JSON TO PYTHON DICTIONARY
    # ========================================

    result = json.loads(ai_text)


    # ========================================
    # ADD SOURCE INFORMATION
    # ========================================

    result["analysis_source"] = "Gemini AI"


    return result


# ========================================
# LOCAL FALLBACK ANALYSIS
# ========================================

def analyze_headline_locally(headline):

    text = headline.lower()


    # ========================================
    # SENSATIONAL WORDS
    # ========================================

    sensational_words = [

        "shocking",
        "unbelievable",
        "incredible",
        "amazing",
        "secret",
        "exposed",
        "bombshell",
        "urgent",
        "breaking",
        "outrage",
        "terrifying",
        "scandal",
        "warning",
        "danger",
        "never",
        "everyone",
        "must see"
    ]


    # ========================================
    # CLICKBAIT PHRASES
    # ========================================

    clickbait_words = [

        "you won't believe",
        "you will not believe",
        "what happened next",
        "this one trick",
        "this simple trick",
        "the reason why",
        "what they found",
        "secret",
        "will change your life",
        "must see",
        "click here"
    ]


    # ========================================
    # COUNT SENSATIONAL WORDS
    # ========================================

    sensational_count = 0

    emotional_phrases = []


    for word in sensational_words:

        if word in text:

            sensational_count += 1

            start = text.find(word)

            original_phrase = headline[
                start:start + len(word)
            ]

            emotional_phrases.append(
                original_phrase
            )


    # ========================================
    # COUNT CLICKBAIT
    # ========================================

    clickbait_count = 0

    clickbait_patterns = []


    for word in clickbait_words:

        if word in text:

            clickbait_count += 1


    # ========================================
    # EXCLAMATION MARKS
    # ========================================

    exclamation_count = (
        headline.count("!")
    )


    if exclamation_count > 0:

        sensational_count += 1

        clickbait_count += 1

        clickbait_patterns.append(
            "Uses exclamation marks to attract attention"
        )


    # ========================================
    # ALL CAPS WORDS
    # ========================================

    words = headline.split()

    capital_words = 0


    for word in words:

        clean_word = ""

        for character in word:

            if character.isalpha():

                clean_word += character


        if (
            len(clean_word) >= 4
            and clean_word.isupper()
        ):

            capital_words += 1


    if capital_words >= 2:

        sensational_count += 1

        clickbait_count += 1

        clickbait_patterns.append(
            "Uses multiple capitalized words for emphasis"
        )


    # ========================================
    # EMOTIONAL LEVEL
    # ========================================

    if sensational_count >= 3:

        emotional_language = "High"

    elif sensational_count >= 1:

        emotional_language = "Medium"

    else:

        emotional_language = "Low"


    # ========================================
    # CLICKBAIT LEVEL
    # ========================================

    if clickbait_count >= 3:

        clickbait_possibility = "High"

    elif clickbait_count >= 1:

        clickbait_possibility = "Medium"

    else:

        clickbait_possibility = "Low"


    # ========================================
    # CLICKBAIT PATTERNS
    # ========================================

    if "secret" in text:

        clickbait_patterns.append(
            "Creates a curiosity gap"
        )


    if (
        "will change your life"
        in text
    ):

        clickbait_patterns.append(
            "Makes a broad or exaggerated promise"
        )


    if clickbait_count > 0:

        clickbait_patterns.append(
            "Uses curiosity-driven wording"
        )


    if not clickbait_patterns:

        clickbait_patterns.append(
            "No obvious clickbait pattern detected"
        )


    # ========================================
    # WARNING SIGNS
    # ========================================

    warning_signs = []


    if sensational_count > 0:

        warning_signs.append(
            "Uses emotionally charged or sensational wording"
        )


    if clickbait_count > 0:

        warning_signs.append(
            "Creates curiosity without providing complete details"
        )


    if exclamation_count > 0:

        warning_signs.append(
            "Uses exclamation marks to attract attention"
        )


    if capital_words >= 2:

        warning_signs.append(
            "Uses multiple capitalized words for emphasis"
        )


    if not warning_signs:

        warning_signs.append(
            "No obvious sensational language detected"
        )


    # ========================================
    # THINGS TO VERIFY
    # ========================================

    things_to_verify = [

        "Check the original news source",

        "Look for specific evidence supporting the claim",

        "Check whether other reliable sources report the same information"
    ]


    # ========================================
    # CAREFUL ANALYSIS
    # ========================================

    if (
        emotional_language == "High"
        or clickbait_possibility == "High"
    ):

        careful_analysis = (
            "The headline uses noticeable "
            "sensational or curiosity-driven "
            "language. This may indicate a "
            "clickbait-style presentation. "
            "The headline alone cannot determine "
            "whether the underlying news claim "
            "is true or false."
        )

    elif (
        emotional_language == "Medium"
        or clickbait_possibility == "Medium"
    ):

        careful_analysis = (
            "The headline contains some "
            "attention-grabbing language, but "
            "the wording is not strongly "
            "sensational. The underlying claim "
            "should still be checked against "
            "reliable sources."
        )

    else:

        careful_analysis = (
            "The headline uses relatively "
            "straightforward language and does "
            "not show strong signs of "
            "sensational or clickbait-style "
            "wording. The headline alone still "
            "cannot establish whether the "
            "underlying news claim is true or false."
        )


    # ========================================
    # REMOVE DUPLICATES
    # ========================================

    emotional_phrases = list(
        dict.fromkeys(
            emotional_phrases
        )
    )

    clickbait_patterns = list(
        dict.fromkeys(
            clickbait_patterns
        )
    )


    # ========================================
    # RETURN LOCAL RESULT
    # ========================================

    return {

        "emotional_language":
            emotional_language,

        "emotional_phrases":
            emotional_phrases,

        "clickbait_possibility":
            clickbait_possibility,

        "clickbait_patterns":
            clickbait_patterns,

        "warning_signs":
            warning_signs,

        "things_to_verify":
            things_to_verify,

        "careful_analysis":
            careful_analysis,

        "analysis_source":
            "Local Fallback"
    }