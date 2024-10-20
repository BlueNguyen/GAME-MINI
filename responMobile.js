// Tính toán kích thước văn bản dựa trên chiều rộng màn hình
let fontSize = Math.max(window.innerWidth / 25, 16); // Kích thước tối thiểu là 16px

// Cập nhật vị trí và kích thước của scoreText dựa trên chiều rộng và chiều cao màn hình
scoreText = this.add.text(window.innerWidth - 200, 20, "Score: " + score, {
  fontSize: fontSize + "px",
  fill: "#ffffff",
});

// Điều chỉnh vị trí các nút trả lời dựa trên tỷ lệ màn hình
for (let i = 0; i < 4; i++) {
  let btn = this.add
    .text(window.innerWidth / 8, (window.innerHeight / 5) * (i + 1), "", {
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

// Điều chỉnh kích thước nền dựa trên kích thước của cửa sổ
this.bg.setSize(window.innerWidth, window.innerHeight);

// Thêm nút toàn màn hình với vị trí tương đối
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

// Thêm sự kiện lắng nghe khi thay đổi kích thước cửa sổ
window.addEventListener("resize", () => {
  game.scale.resize(window.innerWidth, window.innerHeight);
  // Điều chỉnh lại kích thước của các thành phần khi màn hình thay đổi
  fontSize = Math.max(window.innerWidth / 25, 16);
  scoreText.setStyle({ fontSize: fontSize + "px" });

  answerButtons.forEach((btn, i) => {
    btn
      .setFontSize(fontSize + "px")
      .setPadding(Math.max(fontSize / 2, 10))
      .setPosition(window.innerWidth / 8, (window.innerHeight / 5) * (i + 1));
  });

  this.bg.setSize(window.innerWidth, window.innerHeight);
});

// Tự động kích hoạt chế độ toàn màn hình trên thiết bị di động
if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  this.scale.startFullscreen();
}
