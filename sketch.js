// ==========================================
// 台灣鳥類叫聲小偵探 - sketch.js (全新重製版)
// ==========================================

const QUESTIONS = [
  {
    q: "聽到這種短促、像「嘎-嘎-嘎」或笛音般嘹亮的叫聲，最可能是哪一種鳥？",
    options: ["台灣藍鵲", "普通麻雀", "白頭翁", "五色鳥"],
    answer: "台灣藍鵲",
    explain: "台灣藍鵲是台灣特有種，叫聲嘹亮且常成群結隊出現。"
  },
  {
    q: "動畫中這隻俗稱「花和尚」的鳥，牠規律且單調的叫聲像什麼聲音？",
    options: ["敲木魚（咚、咚、咚）", "消防車警報", "腳踏車鈴", "手機鈴聲"],
    answer: "敲木魚（咚、咚、咚）",
    explain: "五色鳥的叫聲低沉而有節奏，聽起來非常像和尚敲木魚。"
  },
  {
    q: "都市公園常見、頭頂有一塊白斑的白頭翁，牠們最經典的叫聲聽起來像什麼？",
    options: ["「巧固球、巧固球」", "「啾-啾-啾」急促叫", "「咕-咕-咕」", "「嘎嘎」大叫"],
    answer: "「巧固球、巧固球」",
    explain: "白頭翁的叫聲聽起來很像在喊「巧固球」。"
  },
  {
    q: "如果在水邊聽到低沉粗糙的「呱──」一聲，通常是哪種鳥飛過？",
    options: ["夜鷺（暗光鳥）", "小白鷺", "夜鷹", "翠鳥"],
    answer: "夜鷺（暗光鳥）",
    explain: "夜鷺俗稱暗光鳥，黃昏或夜間常在水邊活動。"
  },
  {
    q: "聲音聽起來細緻、婉轉且連綿不斷，像在枝頭輕聲呢喃的是誰？",
    options: ["綠繡眼（青笛仔）", "大卷尾", "斑鳩", "夜鷹"],
    answer: "綠繡眼（青笛仔）",
    explain: "綠繡眼體型嬌小，叫聲細而輕柔。"
  },
  {
    q: "全身黑色、尾羽分岔像剪刀、飛行技術高超的是哪隻「護巢大將軍」？",
    options: ["大卷尾（烏秋）", "台灣藍鵲", "黑冠麻鷺", "八哥"],
    answer: "大卷尾（烏秋）",
    explain: "大卷尾又稱烏秋，個性勇敢，繁殖期常會驅趕大型鳥類。"
  }
];

let screen = "start"; // start, quiz, result
let pos = 0;          // 目前題號
let selected = -1;    // 使用者點選的選項索引 (-1代表未選)
let score = 0;        // 得分

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  rectMode(CORNER);
}

function draw() {
  background(244, 247, 242);

  if (screen === "start") {
    drawStart();
  } else if (screen === "quiz") {
    drawQuiz();
  } else if (screen === "result") {
    drawResult();
  }
}

// 1. 開始畫面
function drawStart() {
  fill(44, 94, 59);
  textSize(32);
  textStyle(BOLD);
  text("台灣鳥類叫聲小偵探", width / 2, height * 0.3);

  textSize(16);
  textStyle(NORMAL);
  fill(100);
  text("點擊下方按鈕開始挑戰測驗！", width / 2, height * 0.4);

  // 開始按鈕
  let bx = width / 2 - 100;
  let by = height * 0.55;
  let bw = 200;
  let bh = 50;

  if (mouseX >= bx && mouseX <= bx + bw && mouseY >= by && mouseY <= by + bh) {
    fill(34, 112, 60);
  } else {
    fill(44, 94, 59);
  }
  rect(bx, by, bw, bh, 25);

  fill(255);
  textSize(18);
  textStyle(BOLD);
  text("開始測驗", width / 2, by + bh / 2);
}

// 2. 作答畫面
function drawQuiz() {
  let q = QUESTIONS[pos];

  // 頂部進度
  fill(44, 94, 59);
  textSize(18);
  textStyle(BOLD);
  text(`第 ${pos + 1} / ${QUESTIONS.length} 題`, width / 2, 40);

  // 題目
  textSize(16);
  textStyle(BOLD);
  fill(34);
  text(q.q, width / 2, 90);

  // 選項按鈕
  let startY = 140;
  let optW = min(width * 0.8, 500);
  let optH = 45;
  let optGap = 12;

  for (let i = 0; i < q.options.length; i++) {
    let ox = (width - optW) / 2;
    let oy = startY + i * (optH + optGap);

    // 顏色判斷
    if (selected === -1) {
      // 尚未作答
      if (mouseX >= ox && mouseX <= ox + optW && mouseY >= oy && mouseY <= oy + optH) {
        fill(220, 235, 225);
      } else {
        fill(255);
      }
      stroke(44, 94, 59);
      strokeWeight(1);
    } else {
      // 已經作答：顯示對錯
      if (q.options[i] === q.answer) {
        fill(31, 122, 77); // 正解：綠色
      } else if (i === selected) {
        fill(200, 55, 45); // 選錯：紅色
      } else {
        fill(240);
      }
      noStroke();
    }

    rect(ox, oy, optW, optH, 8);

    // 選項文字
    if (selected !== -1 && (q.options[i] === q.answer || i === selected)) {
      fill(255);
    } else {
      fill(34);
    }
    textSize(15);
    textStyle(NORMAL);
    text(q.options[i], width / 2, oy + optH / 2);
  }

  // 如果已經作答，顯示解析與「下一題」按鈕
  if (selected !== -1) {
    let descY = startY + q.options.length * (optH + optGap) + 10;
    
    // 解析框
    fill(255, 240, 220);
    noStroke();
    rect((width - optW) / 2, descY, optW, 60, 8);
    fill(34);
    textSize(13);
    textAlign(LEFT, TOP);
    text("💡 解析：" + q.explain, (width - optW) / 2 + 15, descY + 10, optW - 30, 45);
    textAlign(CENTER, CENTER);

    // 下一題按鈕（固定在畫面下方）
    let nx = width / 2 - 90;
    let ny = height - 70;
    let nw = 180;
    let nh = 42;

    fill(44, 94, 59);
    rect(nx, ny, nw, nh, 21);
    fill(255);
    textSize(16);
    textStyle(BOLD);
    text(pos < QUESTIONS.length - 1 ? "下一題 ➔" : "查看成績 ➔", width / 2, ny + nh / 2);
  }
}

// 3. 成績畫面
function drawResult() {
  fill(44, 94, 59);
  textSize(28);
  textStyle(BOLD);
  text("🎉 測驗完成！", width / 2, height * 0.3);

  textSize(20);
  fill(217, 119, 6);
  text(`你的總得分：${score} / ${QUESTIONS.length * 10} 分`, width / 2, height * 0.4);

  // 重新開始按鈕
  let bx = width / 2 - 110;
  let by = height * 0.55;
  let bw = 220;
  let bh = 50;

  fill(44, 94, 59);
  rect(bx, by, bw, bh, 25);

  fill(255);
  textSize(18);
  textStyle(BOLD);
  text("再玩一次", width / 2, by + bh / 2);
}

// 滑鼠點擊控制
function mousePressed() {
  if (screen === "start") {
    let bx = width / 2 - 100;
    let by = height * 0.55;
    let bw = 200;
    let bh = 50;
    if (mouseX >= bx && mouseX <= bx + bw && mouseY >= by && mouseY <= by + bh) {
      screen = "quiz";
      pos = 0;
      score = 0;
      selected = -1;
    }
  } 
  else if (screen === "quiz") {
    let q = QUESTIONS[pos];
    let startY = 140;
    let optW = min(width * 0.8, 500);
    let optH = 45;
    let optGap = 12;

    // 狀態 1：還沒選答案，檢查點到哪個選項
    if (selected === -1) {
      for (let i = 0; i < q.options.length; i++) {
        let ox = (width - optW) / 2;
        let oy = startY + i * (optH + optGap);
        if (mouseX >= ox && mouseX <= ox + optW && mouseY >= oy && mouseY <= oy + optH) {
          selected = i;
          if (q.options[i] === q.answer) {
            score += 10;
          }
          break;
        }
      }
    } 
    // 狀態 2：已經選了答案，點擊「下一題」按鈕
    else {
      let nx = width / 2 - 90;
      let ny = height - 70;
      let nw = 180;
      let nh = 42;

      if (mouseX >= nx && mouseX <= nx + nw && mouseY >= ny && mouseY <= ny + nh) {
        if (pos < QUESTIONS.length - 1) {
          pos++;          // 進入下一題
          selected = -1;  // 重置選項狀態
        } else {
          screen = "result"; // 進入結算畫面
        }
      }
    }
  } 
  else if (screen === "result") {
    let bx = width / 2 - 110;
    let by = height * 0.55;
    let bw = 220;
    let bh = 50;
    if (mouseX >= bx && mouseX <= bx + bw && mouseY >= by && mouseY <= by + bh) {
      screen = "start";
      pos = 0;
      score = 0;
      selected = -1;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}