$(document).ready(function () {
    const words = [
        { english: "always", ukrainian: "завжди" },
        { english: "never", ukrainian: "ніколи" },
        { english: "sometimes", ukrainian: "іноді" },
        { english: "often", ukrainian: "часто" },
        { english: "rarely", ukrainian: "рідко" },
        { english: "soon", ukrainian: "скоро" },
        { english: "later", ukrainian: "пізніше" },
        { english: "before", ukrainian: "до" },
        { english: "after", ukrainian: "після" },
        { english: "today", ukrainian: "сьогодні" },
    ];

    let currentStep = 1;
    let totalSteps = words.length;
    let correctCount = 0;
    let wrongCount = 0;

    // Initialize the first word
    shuffleWords();
    displayWord();

    $(".card").on("click", function () {
        const userTranslation = $("#translation").val().trim();
        const correctTranslation = words[currentStep - 1].ukrainian;

        if (userTranslation === correctTranslation) {
            correctCount++;
            $("#correct").text(correctCount);
        } else {
            wrongCount++;
            $("#wrong").text(wrongCount);
        }

        nextWord();
    });

    function shuffleWords() {
        words.sort(() => Math.random() - 0.5);
    }

    function displayWord() {
        $("#word").text(words[currentStep - 1].english);
        $("#step").text(`${currentStep}/${totalSteps}`);
        $("#translation").val("");
    }

    function nextWord() {
        if (currentStep < totalSteps) {
            currentStep++;
            displayWord();
        } else {
            showResult();
        }
    }

    function showResult() {
        let knowledgeLevel = correctCount > wrongCount ? "Відмінно!" : "Потрібна практика!";
        $("#result").text(`Ваш рівень: ${knowledgeLevel}. Вірно: ${correctCount}, Невірно: ${wrongCount}`);
        $("#modal").removeClass("hidden");
    }

    $("#restart").on("click", function () {
        currentStep = 1;
        correctCount = 0;
        wrongCount = 0;
        shuffleWords();
        displayWord();
        $("#modal").addClass("hidden");
        $("#correct").text(correctCount);
        $("#wrong").text(wrongCount);
    });
});