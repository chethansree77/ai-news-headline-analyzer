/* ========================================
   REAL AI ANALYSIS
======================================== */

async function analyzeHeadline() {

    const input =
        document.querySelector(".headline-input");

    const button =
        document.querySelector(".analyze-button");

    const errorMessage =
        document.querySelector("#error-message");

    const errorText =
        document.querySelector("#error-text");

    const headline =
        input.value.trim();


    // ========================================
    // CHECK EMPTY INPUT
    // ========================================

    if (headline === "") {

        errorText.textContent =
            "Please enter a news headline first.";

        errorMessage.style.display = "flex";

        return;
    }


    errorMessage.style.display = "none";

    button.disabled = true;

    button.textContent =
        "⏳ AI Analyzing...";


    try {

        const response = await fetch("/analyze", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                headline: headline
            })
        });


        const result =
            await response.json();


        // ====================================
        // HANDLE ERROR
        // ====================================

        if (!response.ok) {

            errorText.textContent =
                result.error ||
                "AI analysis is temporarily unavailable.";

            errorMessage.style.display =
                "flex";

            return;
        }


        // ====================================
        // SUCCESS
        // ====================================

        errorMessage.style.display =
            "none";

        displayResults(result);


    } catch (error) {

        console.error(
            "Error:",
            error
        );

        errorText.textContent =
            "Could not connect to the Flask server.";

        errorMessage.style.display =
            "flex";


    } finally {

        button.disabled = false;

        button.textContent =
            "🔍 Analyze with AI";
    }
}



/* ========================================
   DEMO ANALYSIS
======================================== */

async function demoAnalysis() {

    const input =
        document.querySelector(".headline-input");

    const button =
        document.querySelector(".demo-button");

    const errorMessage =
        document.querySelector("#error-message");


    let headline =
        input.value.trim();


    // ========================================
    // DEFAULT DEMO HEADLINE
    // ========================================

    if (headline === "") {

        headline =
            "SHOCKING! Scientists reveal a secret discovery that will change your life!";

        input.value = headline;
    }


    errorMessage.style.display =
        "none";


    button.disabled = true;

    button.textContent =
        "⏳ Loading Demo...";


    await new Promise(function(resolve) {

        setTimeout(
            resolve,
            700
        );

    });


    const text =
        headline.toLowerCase();


    // ========================================
    // SENSATIONAL WORDS
    // ========================================

    const sensationalWords = [

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
        "must see",
        "you won't believe",
        "you will not believe"
    ];


    // ========================================
    // CLICKBAIT PHRASES
    // ========================================

    const clickbaitWords = [

        "you won't believe",
        "you will not believe",
        "what happened next",
        "this one trick",
        "this simple trick",
        "the reason why",
        "what they found",
        "secret",
        "will change your life",
        "number one",
        "must see",
        "click here"
    ];


    // ========================================
    // COUNT MATCHES
    // ========================================

    let sensationalCount = 0;

    let clickbaitCount = 0;


    sensationalWords.forEach(
        function(word) {

            if (text.includes(word)) {

                sensationalCount++;
            }
        }
    );


    clickbaitWords.forEach(
        function(word) {

            if (text.includes(word)) {

                clickbaitCount++;
            }
        }
    );


    // ========================================
    // EXCLAMATION MARKS
    // ========================================

    const exclamationCount =
        (headline.match(/!/g) || []).length;


    if (exclamationCount >= 2) {

        sensationalCount++;

        clickbaitCount++;

    } else if (exclamationCount === 1) {

        sensationalCount++;

        clickbaitCount++;
    }


    // ========================================
    // ALL CAPS WORDS
    // ========================================

    const words =
        headline.split(/\s+/);

    let capitalWords = 0;


    words.forEach(
        function(word) {

            const cleanWord =
                word.replace(
                    /[^A-Za-z]/g,
                    ""
                );


            if (
                cleanWord.length >= 4 &&
                cleanWord === cleanWord.toUpperCase()
            ) {

                capitalWords++;
            }
        }
    );


    if (capitalWords >= 2) {

        sensationalCount++;

        clickbaitCount++;
    }


    // ========================================
    // EMOTIONAL LEVEL
    // ========================================

    let emotionalLanguage;


    if (sensationalCount >= 3) {

        emotionalLanguage = "High";

    } else if (sensationalCount >= 1) {

        emotionalLanguage = "Medium";

    } else {

        emotionalLanguage = "Low";
    }


    // ========================================
    // CLICKBAIT LEVEL
    // ========================================

    let clickbaitPossibility;


    if (clickbaitCount >= 3) {

        clickbaitPossibility = "High";

    } else if (clickbaitCount >= 1) {

        clickbaitPossibility = "Medium";

    } else {

        clickbaitPossibility = "Low";
    }


    // ========================================
    // DEMO EMOTIONAL PHRASES
    // ========================================

    const emotionalPhrases = [];


    sensationalWords.forEach(
        function(word) {

            if (text.includes(word)) {

                const originalPhrase =
                    findOriginalPhrase(
                        headline,
                        word
                    );

                if (
                    originalPhrase &&
                    !emotionalPhrases.includes(
                        originalPhrase
                    )
                ) {

                    emotionalPhrases.push(
                        originalPhrase
                    );
                }
            }
        }
    );


    // ========================================
    // DEMO CLICKBAIT PATTERNS
    // ========================================

    const clickbaitPatterns = [];


    if (clickbaitCount > 0) {

        clickbaitPatterns.push(
            "Uses curiosity-driven wording"
        );
    }


    if (
        text.includes("secret") ||
        text.includes("what happened next") ||
        text.includes("what they found")
    ) {

        clickbaitPatterns.push(
            "Creates a curiosity gap"
        );
    }


    if (
        text.includes("will change your life")
    ) {

        clickbaitPatterns.push(
            "Makes a broad or exaggerated promise"
        );
    }


    if (exclamationCount > 0) {

        clickbaitPatterns.push(
            "Uses punctuation to attract attention"
        );
    }


    if (capitalWords >= 2) {

        clickbaitPatterns.push(
            "Uses capitalized words for emphasis"
        );
    }


    if (clickbaitPatterns.length === 0) {

        clickbaitPatterns.push(
            "No obvious clickbait pattern detected"
        );
    }


    // ========================================
    // WARNING SIGNS
    // ========================================

    const warningSigns = [];


    if (sensationalCount > 0) {

        warningSigns.push(
            "Uses emotionally charged or sensational wording"
        );
    }


    if (clickbaitCount > 0) {

        warningSigns.push(
            "Creates curiosity without providing complete details"
        );
    }


    if (exclamationCount > 0) {

        warningSigns.push(
            "Uses exclamation marks to attract attention"
        );
    }


    if (capitalWords >= 2) {

        warningSigns.push(
            "Uses multiple capitalized words for emphasis"
        );
    }


    if (warningSigns.length === 0) {

        warningSigns.push(
            "No obvious sensational language detected"
        );
    }


    // ========================================
    // THINGS TO VERIFY
    // ========================================

    const thingsToVerify = [

        "Check the original news source",

        "Look for specific evidence supporting the claim",

        "Check whether other reliable sources report the same information"
    ];


    // ========================================
    // CAREFUL ANALYSIS
    // ========================================

    let carefulAnalysis;


    if (
        emotionalLanguage === "High" ||
        clickbaitPossibility === "High"
    ) {

        carefulAnalysis =
            "The headline uses noticeable sensational or "
            + "curiosity-driven language. This may indicate a "
            + "clickbait-style presentation. The headline alone "
            + "cannot determine whether the underlying news claim "
            + "is true or false.";

    } else if (
        emotionalLanguage === "Medium" ||
        clickbaitPossibility === "Medium"
    ) {

        carefulAnalysis =
            "The headline contains some attention-grabbing "
            + "language, but the wording is not strongly "
            + "sensational. The underlying claim should still "
            + "be checked against reliable sources.";

    } else {

        carefulAnalysis =
            "The headline uses relatively straightforward "
            + "language and does not show strong signs of "
            + "sensational or clickbait-style wording. The "
            + "headline alone still cannot establish whether "
            + "the underlying news claim is true or false.";
    }


    // ========================================
    // CREATE DEMO RESULT
    // ========================================

    const demoResult = {

        emotional_language:
            emotionalLanguage,

        emotional_phrases:
            emotionalPhrases,

        clickbait_possibility:
            clickbaitPossibility,

        clickbait_patterns:
            clickbaitPatterns,

        warning_signs:
            warningSigns,

        things_to_verify:
            thingsToVerify,

        careful_analysis:
            carefulAnalysis
    };


    // ========================================
    // DISPLAY RESULT
    // ========================================

    displayResults(
        demoResult
    );


    button.disabled = false;

    button.textContent =
        "🎭 Demo Analysis";
}



/* ========================================
   FIND ORIGINAL PHRASE
======================================== */

function findOriginalPhrase(
    headline,
    searchWord
) {

    const index =
        headline.toLowerCase().indexOf(
            searchWord.toLowerCase()
        );


    if (index === -1) {

        return null;
    }


    return headline.substring(
        index,
        index + searchWord.length
    );
}



/* ========================================
   DISPLAY RESULTS
======================================== */

function displayResults(result) {

    // ========================================
    // RESTART CARD ANIMATION
    // ========================================

    const cards =
        document.querySelectorAll(
            ".result-card"
        );


    cards.forEach(
        function(card) {

            card.style.animation =
                "none";

        }
    );


    // Force browser to recognize animation reset

    void document.body.offsetWidth;


    cards.forEach(
        function(card, index) {

            card.style.animation =
                `resultCardAppear 0.7s ease ${index * 0.1}s forwards`;

        }
    );


    // ========================================
    // EMOTIONAL LANGUAGE
    // ========================================

    const emotionalElement =
        document.querySelector(
            "#emotional-language"
        );


    emotionalElement.textContent =
        result.emotional_language;


    setLevelColor(
        emotionalElement,
        result.emotional_language
    );


    updateLevelBar(
        "emotional-level-bar",
        "emotional-level-label",
        result.emotional_language
    );


    // ========================================
    // EMOTIONAL PHRASES
    // ========================================

    displayDetailItems(
        "emotional-phrases",
        result.emotional_phrases,
        "No emotional phrases detected."
    );


    // ========================================
    // CLICKBAIT POSSIBILITY
    // ========================================

    const clickbaitElement =
        document.querySelector(
            "#clickbait"
        );


    clickbaitElement.textContent =
        result.clickbait_possibility;


    setLevelColor(
        clickbaitElement,
        result.clickbait_possibility
    );


    updateLevelBar(
        "clickbait-level-bar",
        "clickbait-level-label",
        result.clickbait_possibility
    );


    // ========================================
    // CLICKBAIT PATTERNS
    // ========================================

    displayDetailItems(
        "clickbait-patterns",
        result.clickbait_patterns,
        "No clickbait patterns detected."
    );


    // ========================================
    // WARNING SIGNS
    // ========================================

    const warningList =
        document.querySelector(
            "#warning-signs"
        );


    warningList.innerHTML =
        "";


    result.warning_signs.forEach(
        function(sign) {

            const li =
                document.createElement(
                    "li"
                );

            li.textContent =
                sign;

            warningList.appendChild(
                li
            );
        }
    );


    // ========================================
    // THINGS TO VERIFY
    // ========================================

    const verifyList =
        document.querySelector(
            "#things-to-verify"
        );


    verifyList.innerHTML =
        "";


    result.things_to_verify.forEach(
        function(item) {

            const li =
                document.createElement(
                    "li"
                );

            li.textContent =
                item;

            verifyList.appendChild(
                li
            );
        }
    );


    // ========================================
    // CAREFUL ANALYSIS
    // ========================================

    document.querySelector(
        "#careful-analysis"
    ).textContent =
        result.careful_analysis;
}



/* ========================================
   DISPLAY AI DETAIL ITEMS
======================================== */

function displayDetailItems(
    elementId,
    items,
    emptyMessage
) {

    const container =
        document.getElementById(
            elementId
        );


    container.innerHTML =
        "";


    if (
        !items ||
        items.length === 0
    ) {

        const empty =
            document.createElement(
                "span"
            );


        empty.className =
            "empty-detail";


        empty.textContent =
            emptyMessage;


        container.appendChild(
            empty
        );


        return;
    }


    items.forEach(
        function(item) {

            const tag =
                document.createElement(
                    "span"
                );


            tag.className =
                "detail-tag";


            tag.textContent =
                item;


            container.appendChild(
                tag
            );
        }
    );
}



/* ========================================
   LEVEL COLOR
======================================== */

function setLevelColor(
    element,
    level
) {

    element.classList.remove(
        "level-low",
        "level-medium",
        "level-high"
    );


    const value =
        level.toLowerCase();


    if (value === "low") {

        element.classList.add(
            "level-low"
        );

    } else if (value === "medium") {

        element.classList.add(
            "level-medium"
        );

    } else if (value === "high") {

        element.classList.add(
            "level-high"
        );
    }
}



/* ========================================
   UPDATE LEVEL BAR
======================================== */

function updateLevelBar(
    barId,
    labelId,
    level
) {

    const bar =
        document.getElementById(
            barId
        );

    const label =
        document.getElementById(
            labelId
        );


    bar.classList.remove(
        "level-low",
        "level-medium",
        "level-high"
    );


    label.classList.remove(
        "level-low",
        "level-medium",
        "level-high"
    );


    const value =
        level.toLowerCase();


    if (value === "low") {

        bar.classList.add(
            "level-low"
        );

        label.classList.add(
            "level-low"
        );

        label.textContent =
            "LOW";

    } else if (value === "medium") {

        bar.classList.add(
            "level-medium"
        );

        label.classList.add(
            "level-medium"
        );

        label.textContent =
            "MEDIUM";

    } else if (value === "high") {

        bar.classList.add(
            "level-high"
        );

        label.classList.add(
            "level-high"
        );

        label.textContent =
            "HIGH";

    } else {

        label.textContent =
            "—";
    }
}



/* ========================================
   CLEAR ANALYSIS
======================================== */

function clearAnalysis() {

    const input =
        document.querySelector(
            ".headline-input"
        );


    const errorMessage =
        document.querySelector(
            "#error-message"
        );


    // ========================================
    // CLEAR INPUT
    // ========================================

    input.value =
        "";


    // ========================================
    // HIDE ERROR
    // ========================================

    errorMessage.style.display =
        "none";


    // ========================================
    // RESET EMOTIONAL LANGUAGE
    // ========================================

    const emotionalElement =
        document.querySelector(
            "#emotional-language"
        );


    emotionalElement.textContent =
        "—";


    emotionalElement.classList.remove(
        "level-low",
        "level-medium",
        "level-high"
    );


    const emotionalBar =
        document.querySelector(
            "#emotional-level-bar"
        );


    emotionalBar.classList.remove(
        "level-low",
        "level-medium",
        "level-high"
    );


    const emotionalLabel =
        document.querySelector(
            "#emotional-level-label"
        );


    emotionalLabel.classList.remove(
        "level-low",
        "level-medium",
        "level-high"
    );


    emotionalLabel.textContent =
        "—";


    // ========================================
    // RESET EMOTIONAL PHRASES
    // ========================================

    document.querySelector(
        "#emotional-phrases"
    ).innerHTML =
        `<span class="empty-detail">
            No phrases detected yet.
        </span>`;


    // ========================================
    // RESET CLICKBAIT
    // ========================================

    const clickbaitElement =
        document.querySelector(
            "#clickbait"
        );


    clickbaitElement.textContent =
        "—";


    clickbaitElement.classList.remove(
        "level-low",
        "level-medium",
        "level-high"
    );


    const clickbaitBar =
        document.querySelector(
            "#clickbait-level-bar"
        );


    clickbaitBar.classList.remove(
        "level-low",
        "level-medium",
        "level-high"
    );


    const clickbaitLabel =
        document.querySelector(
            "#clickbait-level-label"
        );


    clickbaitLabel.classList.remove(
        "level-low",
        "level-medium",
        "level-high"
    );


    clickbaitLabel.textContent =
        "—";


    // ========================================
    // RESET CLICKBAIT PATTERNS
    // ========================================

    document.querySelector(
        "#clickbait-patterns"
    ).innerHTML =
        `<span class="empty-detail">
            No patterns detected yet.
        </span>`;


    // ========================================
    // RESET WARNING SIGNS
    // ========================================

    document.querySelector(
        "#warning-signs"
    ).innerHTML =
        "<li>—</li>";


    // ========================================
    // RESET THINGS TO VERIFY
    // ========================================

    document.querySelector(
        "#things-to-verify"
    ).innerHTML =
        "<li>—</li>";


    // ========================================
    // RESET CAREFUL ANALYSIS
    // ========================================

    document.querySelector(
        "#careful-analysis"
    ).textContent =
        "—";


    // ========================================
    // RESET CARD ANIMATIONS
    // ========================================

    document.querySelectorAll(
        ".result-card"
    ).forEach(
        function(card) {

            card.style.animation =
                "none";

        }
    );
}