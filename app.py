from flask import Flask, render_template, request, jsonify

from headline_analyzer import (
    analyze_headline_with_gemini,
    analyze_headline_locally
)


app = Flask(__name__)


# ========================================
# HOME PAGE
# ========================================

@app.route("/")
def home():

    return render_template("index.html")


# ========================================
# ANALYZE HEADLINE
# ========================================

@app.route("/analyze", methods=["POST"])
def analyze():

    try:

        # ------------------------------------
        # GET DATA FROM BROWSER
        # ------------------------------------

        data = request.get_json()

        headline = data.get(
            "headline",
            ""
        ).strip()


        # ------------------------------------
        # CHECK EMPTY HEADLINE
        # ------------------------------------

        if not headline:

            return jsonify({
                "error": "Please enter a news headline."
            }), 400


        # ------------------------------------
        # TRY GEMINI AI FIRST
        # ------------------------------------

        try:

            result = analyze_headline_with_gemini(
                headline
            )

            print(
                "Analysis completed using Gemini AI."
            )

            return jsonify(result)


        except Exception as gemini_error:

            print(
                "Gemini Error:",
                gemini_error
            )


            # ================================
            # CHECK FOR RATE LIMIT
            # ================================

            error_text = str(
                gemini_error
            ).lower()


            is_rate_limit = (

                "429" in error_text

                or

                "rate limit" in error_text

                or

                "too_many_requests" in error_text

                or

                "quota" in error_text
            )


            # ================================
            # USE LOCAL FALLBACK
            # ================================

            if is_rate_limit:

                print(
                    "Gemini quota reached."
                )

                print(
                    "Using local fallback analysis."
                )


                result = analyze_headline_locally(
                    headline
                )


                return jsonify(result)


            # ================================
            # OTHER GEMINI ERROR
            # ================================

            return jsonify({

                "error":
                    "The AI analysis could not be completed right now. Please try again later."

            }), 500


    # ========================================
    # GENERAL FLASK ERROR
    # ========================================

    except Exception as e:

        print(
            "Server Error:",
            e
        )


        return jsonify({

            "error":
                "Something went wrong while analyzing the headline."

        }), 500


# ========================================
# START FLASK SERVER
# ========================================

if __name__ == "__main__":

    app.run(
        debug=True
    )