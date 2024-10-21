// Tính toán kích thước font dựa trên cả chiều rộng và chiều cao màn hình
let fontSize = Math.max(
  Math.min(window.innerWidth / 25, window.innerHeight / 25),
  16
);

// Cập nhật vị trí của văn bản scoreText
scoreText = this.add.text(
  window.innerWidth * 0.75,
  window.innerHeight * 0.05,
  "Score: " + score,
  {
    fontSize: fontSize + "px",
    fill: "#ffffff",
  }
);

// Điều chỉnh vị trí và kích thước các nút trả lời
for (let i = 0; i < 4; i++) {
  let btn = this.add
    .text(window.innerWidth * 0.2, window.innerHeight * (0.3 + i * 0.1), "", {
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

if (window.innerWidth < 500) {
  fontSize = Math.max(
    Math.min(window.innerWidth / 30, window.innerHeight / 30),
    14
  ); // Giảm fontSize cho màn hình nhỏ
}

// Kiểm tra nếu thiết bị đang ở chế độ dọc và cảnh báo người dùng
if (window.innerWidth < window.innerHeight) {
  alert("Hãy xoay ngang thiết bị của bạn để có trải nghiệm tốt hơn.");
}
