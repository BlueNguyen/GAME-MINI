var config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

var game = new Phaser.Game(config);

var questions = [];
var currentQuestion = 0;
var currentLevel = 1;
var score = 0;
var correctAnswersCount = 0; // Biến đếm số câu hỏi đúng
var questionText;
var answerButtons = [];
var scoreText;
var playAgainButton;
var nextLevelButton; // Nút chuyển sang level tiếp theo


function preload() {
  this.load.image(
    "background",
    "https://labs.phaser.io/assets/skies/space3.png"
  );
  this.load.json("questionData", "questions.json");
}

function create() {
  this.bg = this.add.tileSprite(400, 300, 800, 600, "background");

  var questionData = this.cache.json.get("questionData");
  loadLevelQuestions(questionData);

  scoreText = this.add.text(600, 20, "Score: " + score, {
    fontSize: "24px",
    fill: "#ffffff",
  });

  questionText = this.add
    .text(100, 50, "", { fontSize: "32px", fill: "#ffffff" })
    .setAlpha(0);

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

  // Create "Play Again" button (initially hidden)
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

  // Create "Next Level" button (initially hidden)
  nextLevelButton = this.add
    .text(300, 500, "Next Level", {
      fontSize: "32px",
      fill: "#ffffff",
      backgroundColor: "#0066cc",
    })
    .setPadding(10)
    .setInteractive({ useHandCursor: true })
    .on("pointerdown", goToNextLevel)
    .setVisible(false); // Initially hidden

  this.tweens.add({
    targets: questionText,
    alpha: 1,
    duration: 1000,
    ease: "Power2",
  });

  showQuestion();
}

function loadLevelQuestions(data) {
  // Load questions based on current level
  questions = currentLevel === 1 ? data.levels.level1 : data.levels.level2;
  currentQuestion = 0; // Reset current question index when loading new questions
}

function showQuestion() {
  if (currentQuestion >= questions.length) {
    if (currentLevel === 1) {
      questionText.setText("Congratulations! Proceed to the next level.");
      nextLevelButton.setVisible(true); // Hiện nút chuyển sang level tiếp theo
    } else {
      questionText.setText("You finished the game!");
      playAgainButton.setVisible(true); // Show the "Play Again" button
    }
    answerButtons.forEach((btn) => btn.setText("")); // Ẩn các câu trả lời
    return;
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
    correctAnswersCount++; // Tăng số câu hỏi đúng
    scoreText.setText("Score: " + score);
  } else {
    questionText.setText("Game Over!");
    answerButtons.forEach((btn) => btn.setText(""));
    playAgainButton.setVisible(true); // Show the "Play Again" button
    return;
  }

  currentQuestion++;

  // Kiểm tra số câu hỏi đúng
  if (correctAnswersCount === 10 && currentLevel === 1) {
    nextLevelButton.setVisible(true); // Hiện nút chuyển sang level tiếp theo
    questionText.setText(
      "Congratulations!"
    );
    answerButtons.forEach((btn) => btn.setText("")); // Hide answer buttons
  } else {
    showQuestion(); // Continue to the next question
  }
}

var scene; // Biến toàn cục để lưu trữ đối tượng scene

function create() {
  scene = this; // Lưu trữ đối tượng scene trong biến toàn cục

  this.bg = this.add.tileSprite(400, 300, 800, 600, "background");

  var questionData = this.cache.json.get("questionData");
  loadLevelQuestions(questionData);

  scoreText = this.add.text(600, 20, "Score: " + score, {
    fontSize: "24px",
    fill: "#ffffff",
  });

  questionText = this.add
    .text(100, 50, "", { fontSize: "32px", fill: "#ffffff" })
    .setAlpha(0);

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

  // Create "Play Again" button (initially hidden)
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

  // Create "Next Level" button (initially hidden)
  nextLevelButton = this.add
    .text(300, 500, "Next Level", {
      fontSize: "32px",
      fill: "#ffffff",
      backgroundColor: "#0066cc",
    })
    .setPadding(10)
    .setInteractive({ useHandCursor: true })
    .on("pointerdown", goToNextLevel)
    .setVisible(false); // Initially hidden

  this.tweens.add({
    targets: questionText,
    alpha: 1,
    duration: 1000,
    ease: "Power2",
  });

  showQuestion();
}

function goToNextLevel() {
  var questionData = scene.cache.json.get("questionData"); // Sử dụng biến scene
  currentLevel++; // Tăng level lên 1
  currentQuestion = 0; // Reset câu hỏi
  correctAnswersCount = 0; // Reset số câu hỏi đúng
  nextLevelButton.setVisible(false); // Ẩn nút chuyển level
  loadLevelQuestions(questionData); // Nạp câu hỏi cho level mới
  showQuestion(); // Hiện câu hỏi mới cho level tiếp theo
}


function loadLevelQuestions(data) {
  console.log("Loading questions for level: " + currentLevel);
  questions = currentLevel === 1 ? data.levels.level1 : data.levels.level2;
  console.log("Loaded questions: ", questions);
  currentQuestion = 0; // Reset current question index when loading new questions
}

function create() {
  scene = this; // Lưu trữ đối tượng scene trong biến toàn cục

  this.bg = this.add.tileSprite(400, 300, 800, 600, "background");

  var questionData = this.cache.json.get("questionData");
  loadLevelQuestions(questionData);

  scoreText = this.add.text(600, 20, "Score: " + score, {
    fontSize: "24px",
    fill: "#ffffff",
  });

  questionText = this.add
    .text(100, 50, "", { fontSize: "32px", fill: "#ffffff" })
    .setAlpha(0);

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

  // Create "Play Again" button (initially hidden)
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

  // Create "Next Level" button (initially hidden)
  nextLevelButton = this.add
    .text(300, 500, "Next Level", {
      fontSize: "32px",
      fill: "#ffffff",
      backgroundColor: "#0066cc",
    })
    .setPadding(10)
    .setInteractive({ useHandCursor: true })
    .on("pointerdown", goToNextLevel)
    .setVisible(false); // Initially hidden

  this.tweens.add({
    targets: questionText,
    alpha: 1,
    duration: 1000,
    ease: "Power2",
  });

  showQuestion();
}

function resetGame() {
  var questionData = scene.cache.json.get("questionData"); // Sử dụng scene thay vì this
  score = 0;
  currentQuestion = 0;
  currentLevel = 1;
  correctAnswersCount = 0; // Reset số câu hỏi đúng

  scoreText.setText("Score: " + score);
  playAgainButton.setVisible(false);
  nextLevelButton.setVisible(false); // Ẩn nút chuyển level

  loadLevelQuestions(questionData); // Load lại câu hỏi cho level 1
  showQuestion();
}

function update() {
  this.bg.tilePositionY -= 0.5;
}
