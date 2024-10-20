// Ví dụ thay đổi kích thước văn bản dựa trên chiều rộng màn hình
let fontSize = Math.max(window.innerWidth / 25, 16); // Kích thước tối thiểu là 16px

scoreText = this.add.text(600, 20, "Score: " + score, {
  fontSize: fontSize + "px",
  fill: "#ffffff",
});

// Tương tự với các nút trả lời
for (let i = 0; i < 4; i++) {
  let btn = this.add
    .text(100, 150 + i * 60, "", {
      fontSize: fontSize + "px",
      fill: "#ffffff",
      backgroundColor: "#0066cc",
    })
    .setPadding(Math.max(fontSize / 2, 10)) // Padding dựa trên kích thước văn bản
    .setInteractive({ useHandCursor: true })
    .on("pointerdown", () => checkAnswer(i))
    .on("pointerover", () => btn.setStyle({ fill: "#ff0" }))
    .on("pointerout", () => btn.setStyle({ fill: "#fff" }));
  answerButtons.push(btn);
}

for (let i = 0; i < 4; i++) {
  let btn = this.add
    .text(window.innerWidth / 8, (window.innerHeight / 5) * (i + 1), "", {
      fontSize: fontSize + "px",
      fill: "#ffffff",
      backgroundColor: "#0066cc",
    })
    .setPadding(Math.max(fontSize / 2, 10))
    .setInteractive({ useHandCursor: true })
    .on("pointerdown", () => checkAnswer(i))
    .on("pointerover", () => btn.setStyle({ fill: "#ff0" }))
    .on("pointerout", () => btn.setStyle({ fill: "#fff" }));
  answerButtons.push(btn);
}

this.bg.setSize(window.innerWidth, window.innerHeight);

// nút toàn màn hình
let fullScreenButton = this.add
  .text(20, 20, "Full Screen", {
    fontSize: "24px",
    fill: "#ffffff",
  })
  .setInteractive({ useHandCursor: true })
  .on("pointerdown", () => {
    if (this.scale.isFullscreen) {
      this.scale.stopFullscreen();
    } else {
      this.scale.startFullscreen();
    }
  });

//thay đổi hướng màn hình
window.addEventListener("resize", () => {
  game.scale.resize(window.innerWidth, window.innerHeight);
});
