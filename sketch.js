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

function setup() { //這是一個初始設定函數，只會在程式開始時執行一次
  createCanvas(windowWidth, windowHeight); //產生一個全視窗的畫布
  
  // 設定radio按鈕
  radio = createRadio();
  radio.style('width', 'auto');
  radio.style('color', '#283618');
  radio.position((windowWidth - 240) / 2, (windowHeight + 20) / 2);
  
  // 設定文字框
  inputBox = createInput();
  inputBox.position((windowWidth - 100) / 2, (windowHeight + 20) / 2);
  inputBox.hide();
  
  // 設定送出按鈕
  submitButton = createButton('下一題');
  submitButton.position((windowWidth - 60) / 2, (windowHeight + 80) / 2);
  submitButton.mousePressed(nextQuestion);
  
  loadQuestion();
}

function draw() { //這是一個繪圖函數，會一直執行直到程式結束
  background("#ffe4e1"); // 使用柔和的粉色背景
  
  // 設定填充顏色
  fill("#fff5f5");
  stroke("#ffb6c1"); // 使用粉色邊框
  strokeWeight(4); // 邊框加粗
  
  // 計算圓角矩形的位置和大小
  let rectWidth = windowWidth / 2;
  let rectHeight = windowHeight / 2;
  let rectX = (windowWidth - rectWidth) / 2;
  let rectY = (windowHeight - rectHeight) / 2;
  
  // 繪製圓角矩形
  rect(rectX, rectY, rectWidth, rectHeight, 20); // 圓角半徑設為20
  
  // 加入可愛的圖案 (例如小星星)
  noStroke();
  fill("#ffd700"); // 金黃色
  for (let i = 0; i < 5; i++) {
    let starX = random(width);
    let starY = random(height);
    ellipse(starX, starY, 10, 10); // 畫小星星
  }
  
  // 加入可愛的文字
  fill("#ff69b4"); // 使用亮粉色
  textSize(32);
  textAlign(CENTER, CENTER);
  text("歡迎來到可愛的問答遊戲！", width / 2, height / 4);

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
    } else {
      incorrectCount++;
      result = "答錯了";
    }
    currentQuestionIndex++;
    loadQuestion();
  }
}

function resetQuiz() {
  currentQuestionIndex = 0;
  correctCount = 0;
  incorrectCount = 0;
  submitButton.html('下一題');
  submitButton.mousePressed(nextQuestion);
  loadQuestion();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  radio.position((windowWidth - 240) / 2, (windowHeight + 20) / 2);
  inputBox.position((windowWidth - 100) / 2, (windowHeight + 20) / 2);
  submitButton.position((windowWidth - 60) / 2, (windowHeight + 80) / 2);
}
