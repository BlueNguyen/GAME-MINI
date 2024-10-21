// Tính toán kích thước font dựa trên tỷ lệ cả chiều rộng và chiều cao màn hình
let fontSize = Math.max(
  Math.min(window.innerWidth / 20, window.innerHeight / 20),
  14
); // Giới hạn nhỏ nhất là 14px

// Cập nhật vị trí của scoreText với tọa độ dựa theo phần trăm màn hình
scoreText = this.add.text(
  window.innerWidth * 0.05,
  window.innerHeight * 0.05,
  "Score: " + score,
  {
    fontSize: fontSize + "px",
    fill: "#ffffff",
  }
);

// Điều chỉnh vị trí và kích thước các nút trả lời dựa theo phần trăm chiều cao và chiều rộng màn hình
for (let i = 0; i < 4; i++) {
  let btn = this.add
    .text(window.innerWidth * 0.1, window.innerHeight * (0.25 + i * 0.15), "", {
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

// Điều chỉnh kích thước nền sao cho phủ toàn bộ màn hình
this.bg.setSize(window.innerWidth, window.innerHeight);

// Thêm nút toàn màn hình với vị trí và kích thước phù hợp
let fullScreenButton = this.add
  .text(window.innerWidth * 0.05, window.innerHeight * 0.9, "Full Screen", {
    fontSize: "18px", // Giảm kích thước font cho phù hợp
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

  // Tính toán lại kích thước và vị trí khi thay đổi kích thước màn hình
  fontSize = Math.max(
    Math.min(window.innerWidth / 20, window.innerHeight / 20),
    14
  );
  scoreText.setStyle({ fontSize: fontSize + "px" });
  scoreText.setPosition(window.innerWidth * 0.05, window.innerHeight * 0.05);

  answerButtons.forEach((btn, i) => {
    btn
      .setFontSize(fontSize + "px")
      .setPadding(Math.max(fontSize / 2, 10))
      .setPosition(
        window.innerWidth * 0.1,
        window.innerHeight * (0.25 + i * 0.15)
      );
  });

  this.bg.setSize(window.innerWidth, window.innerHeight);
});

// Kiểm tra nếu thiết bị đang ở chế độ dọc và đưa ra cảnh báo hoặc tự động thay đổi bố cục
if (window.innerWidth < window.innerHeight) {
  // Chế độ dọc
  scoreText.setPosition(window.innerWidth * 0.05, window.innerHeight * 0.05);
  answerButtons.forEach((btn, i) => {
    btn.setPosition(
      window.innerWidth * 0.05,
      window.innerHeight * (0.25 + i * 0.2)
    ); // Giảm khoảng cách giữa các nút
  });
} else {
  // Chế độ ngang
  scoreText.setPosition(window.innerWidth * 0.05, window.innerHeight * 0.05);
  answerButtons.forEach((btn, i) => {
    btn.setPosition(
      window.innerWidth * 0.1,
      window.innerHeight * (0.25 + i * 0.15)
    );
  });
}
