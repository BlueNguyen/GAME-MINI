var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var game = new Phaser.Game(config);

var questions = [];
var currentQuestion = 0;
var currentLevel = 1;
var score = 0;
var questionText;
var answerButtons = [];
var scoreText;
var playAgainButton;

function preload() {
  // Load the background image
  this.load.image(
    "background",
    "https://labs.phaser.io/assets/skies/space3.png"
  );

  // Load the questions from a JSON file
  this.load.json("questionData", "questions.json");
}

function create() {
  // Add the background
  this.bg = this.add.tileSprite(400, 300, 800, 600, "background");

  // Get the questions from the loaded JSON file
  var questionData = this.cache.json.get("questionData");
  loadLevelQuestions(questionData); // Load level 1 questions initially

  // Display the score
  scoreText = this.add.text(600, 20, "Score: " + score, {
    fontSize: "24px",
    fill: "#ffffff",
  });

  // Display the question text
  questionText = this.add
    .text(100, 50, "", { fontSize: "32px", fill: "#ffffff" })
    .setAlpha(0);

  // Create answer buttons with animations
  for (let i = 0; i < 4; i++) {
    let btn = this.add
      .text(100, 150 + i * 60, "", {
        fontSize: "24px",
        fill: "#ffffff",
        backgroundColor: "#0066cc",
      })
      .setPadding(10)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => checkAnswer(i))
      .on("pointerover", () => btn.setStyle({ fill: "#ff0" }))
      .on("pointerout", () => btn.setStyle({ fill: "#fff" }));
    answerButtons.push(btn);
  }

  // Create a "Play Again" button (initially hidden)
  playAgainButton = this.add
    .text(300, 500, "Play Again", {
      fontSize: "32px",
      fill: "#ffffff",
      backgroundColor: "#0066cc",
    })
    .setPadding(10)
    .setInteractive({ useHandCursor: true })
    .on("pointerdown", resetGame)
    .setVisible(false); // Initially hidden

  // Animate the question fade-in
  this.tweens.add({
    targets: questionText,
    alpha: 1,
    duration: 1000,
    ease: "Power2",
  });

  showQuestion();
}

function loadLevelQuestions(data) {
  if (currentLevel === 1) {
    questions = data.levels.level1; // Load level 1 questions
  } else if (currentLevel === 2) {
    questions = data.levels.level2; // Load level 2 questions
  }
}

function showQuestion() {
  if (currentQuestion >= questions.length) {
    if (currentLevel === 1) {
      currentLevel++;
      currentQuestion = 0; // Reset the question index
      loadLevelQuestions(this.cache.json.get("questionData")); // Load level 2 questions
    } else {
      // End of the game
      questionText.setText("You finished the game!");
      answerButtons.forEach((btn) => btn.setText(""));
      playAgainButton.setVisible(true); // Show the "Play Again" button
      return;
    }
  }

  var q = questions[currentQuestion];
  questionText.setText("Level " + currentLevel + ": " + q.question);

  for (let i = 0; i < q.answers.length; i++) {
    answerButtons[i].setText(q.answers[i]);
  }
}

function checkAnswer(index) {
  var correctAnswer = questions[currentQuestion].correct;

  if (index === correctAnswer) {
    score++;
    scoreText.setText("Score: " + score);
  } else {
    // Game over if the answer is wrong
    questionText.setText("Game Over!");
    answerButtons.forEach((btn) => btn.setText(""));
    playAgainButton.setVisible(true); // Show the "Play Again" button
    return;
  }

  currentQuestion++;

  // Check if level 1 is complete
  if (currentQuestion === questions.length && currentLevel === 1) {
    questionText.setText("Congratulations! You passed level 1.");
    answerButtons.forEach((btn) => btn.setText(""));
    setTimeout(() => {
      showQuestion(); // Move to level 2 after a pause
    }, 2000);
  } else {
    showQuestion(); // Continue to the next question
  }
}

function resetGame() {
  // Reset all game variables
  score = 0;
  currentQuestion = 0;
  currentLevel = 1;

  // Reset the score display and hide the Play Again button
  scoreText.setText("Score: " + score);
  playAgainButton.setVisible(false);

  // Restart the game
  showQuestion();
}

function update() {
  // Move the background for a parallax effect
  this.bg.tilePositionY -= 0.5;
}
