let radio;
let submitButton;
let result = "";
let questionData;
let currentQuestionIndex = 0;
let correctCount = 0;
let incorrectCount = 0;
let inputBox;

function preload() {
  questionData = loadTable('questions.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255, 228, 225); // 柔和的粉色背景
  textFont('Comic Sans MS'); // 可愛字體
  textSize(24);
  fill(0);
  noStroke();

  // 設定 radio 按鈕
  radio = createRadio();
  radio.style('width', 'auto');
  radio.style('color', '#283618'); // 深綠色文字
  radio.style('font-size', '20px'); // 增大字體
  radio.style('background-color', '#FFFAF0'); // 柔和的背景色
  radio.style('border', '2px solid #F4A261'); // 可愛的橘色邊框
  radio.style('border-radius', '10px'); // 圓角
  radio.style('padding', '10px'); // 增加內距
  radio.style('margin', '10px'); // 增加間距
  radio.style('box-shadow', '2px 2px 5px rgba(0, 0, 0, 0.2)'); // 添加陰影
  radio.position((windowWidth - 240) / 2, (windowHeight + 20) / 2);

  // 設定文字框
  inputBox = createInput();
  inputBox.position((windowWidth - 100) / 2, (windowHeight + 20) / 2);
  inputBox.hide();

  // 設定送出按鈕
  submitButton = createButton('下一題');
  submitButton.position((windowWidth - 60) / 2, (windowHeight + 80) / 2);
  submitButton.style('background-color', '#FFB6C1'); // 粉紅色按鈕
  submitButton.style('color', '#FFFFFF'); // 白色文字
  submitButton.style('font-size', '18px'); // 增大字體
  submitButton.style('border', 'none'); // 移除邊框
  submitButton.style('border-radius', '10px'); // 圓角
  submitButton.style('padding', '10px 20px'); // 增加內距
  submitButton.style('box-shadow', '2px 2px 5px rgba(0, 0, 0, 0.2)'); // 添加陰影
  submitButton.mousePressed(nextQuestion);

  loadQuestion();
}

function draw() {
  drawBackground();

  // 顯示題目
  fill(0);
  textSize(35);
  textAlign(CENTER, CENTER);
  if (currentQuestionIndex < questionData.getRowCount()) {
    text(questionData.getString(currentQuestionIndex, 'question'), windowWidth / 2, windowHeight / 2 - 50);
  } else {
    text(`答對了 ${correctCount} 題，答錯了 ${incorrectCount} 題`, windowWidth / 2, windowHeight / 2 - 50);
  }

  // 顯示結果
  textSize(20);
  text(result, windowWidth / 2, windowHeight / 2 + 150);
}

function drawBackground() {
  background(255, 228, 225); // 粉色背景
  for (let i = 0; i < width; i += 50) {
    for (let j = 0; j < height; j += 50) {
      fill(255, 182, 193); // 心形顏色
      ellipse(i + 10, j + 10, 10, 10); // 小圓點
    }
  }
}

function loadQuestion() {
  if (currentQuestionIndex < questionData.getRowCount()) {
    let question = questionData.getString(currentQuestionIndex, 'question');
    let option1 = questionData.getString(currentQuestionIndex, 'option1');
    let option2 = questionData.getString(currentQuestionIndex, 'option2');
    let option3 = questionData.getString(currentQuestionIndex, 'option3');
    let option4 = questionData.getString(currentQuestionIndex, 'option4');
    
    // 清空之前的選項
    radio.elt.innerHTML = '';
    
    if (option1 && option2 && option3 && option4) {
      radio.option(option1);
      radio.option(option2);
      radio.option(option3);
      radio.option(option4);
      radio.selected(null);
      radio.show();
      inputBox.hide();
    } else {
      radio.hide();
      inputBox.show();
      inputBox.value('');
    }
    
    // 調整 radio 和按鈕的位置
    radio.position((windowWidth - 300) / 2, (windowHeight / 2)); // 選項放在畫面中間
    radio.style('display', 'flex'); // 使用 flex 排版
    radio.style('flex-direction', 'row'); // 橫向排列選項
    radio.style('justify-content', 'center'); // 選項置中對齊
    radio.style('align-items', 'center'); // 垂直置中
    radio.style('gap', '20px'); // 增加選項之間的間距

    submitButton.position((windowWidth - 60) / 2, (windowHeight / 2) + 100); // 按鈕放在選項下方
    
    result = "";
  } else {
    submitButton.html('再試一次');
    submitButton.mousePressed(resetQuiz);
  }
}

function nextQuestion() {
  if (currentQuestionIndex < questionData.getRowCount()) {
    let correctAnswer = questionData.getString(currentQuestionIndex, 'answer');
    let answer;
    if (radio.elt.style.display !== 'none') {
      answer = radio.value();
    } else {
      answer = inputBox.value();
    }
    if (answer === correctAnswer) {
      correctCount++;
      result = "答對了";
      showCorrectEffect(); // 顯示正確特效
    } else {
      incorrectCount++;
      result = "答錯了";
      showIncorrectEffect(); // 顯示錯誤特效
    }
    currentQuestionIndex++;
    loadQuestion();
  }
}

function showCorrectEffect() {
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      fill(random(100, 255), random(200, 255), random(100, 255));
      ellipse(random(width), random(height), 50, 50); // 隨機閃爍的星星
    }, i * 100);
  }
}

function showIncorrectEffect() {
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      fill(255, random(50, 100), random(50, 100));
      rect(random(width), random(height), 50, 50); // 隨機紅色方塊
    }, i * 100);
  }
}

function resetQuiz() {
  currentQuestionIndex = 0;
  correctCount = 0;
  incorrectCount = 0;
  submitButton.html('下一題');
  submitButton.mousePressed(nextQuestion);
  drawBackground(); // 重置背景
  loadQuestion();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  radio.position((windowWidth - 300) / 2, (windowHeight / 2));
  inputBox.position((windowWidth - 100) / 2, (windowHeight + 20) / 2);
  submitButton.position((windowWidth - 60) / 2, (windowHeight / 2) + 100);
}
