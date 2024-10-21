let fontSize = Math.max(
  Math.min(window.innerWidth / 25, window.innerHeight / 25),
  16
);

scoreText = this.add.text(window.innerWidth - 200, 20, "Score: " + score, {
  fontSize: fontSize + "px",
  fill: "#ffffff",
});

for (let i = 0; i < 4; i++) {
  let btn = this.add
    .text(window.innerWidth / 8, (window.innerHeight / 6) * (i + 1), "", {
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

window.addEventListener("resize", () => {
  game.scale.resize(window.innerWidth, window.innerHeight);

  fontSize = Math.max(
    Math.min(window.innerWidth / 25, window.innerHeight / 25),
    16
  );
  scoreText.setStyle({ fontSize: fontSize + "px" });

  answerButtons.forEach((btn, i) => {
    btn
      .setFontSize(fontSize + "px")
      .setPadding(Math.max(fontSize / 2, 10))
      .setPosition(window.innerWidth / 8, (window.innerHeight / 6) * (i + 1));
  });

  this.bg.setSize(window.innerWidth, window.innerHeight);
});

if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  this.scale.startFullscreen();
}
