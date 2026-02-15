
// 画像のインポート
import imgNormal from './image/normal.png';
import imgOdoroki from './image/odoroki.png';
import imgNaki from './image/naki.png';

// ゲームのCSSスタイル定義
const styles = `
@import url('https://fonts.googleapis.com/css2?family=DotGothic16&display=swap');

body {
  background-color: #000;
  color: #fff;
  font-family: 'DotGothic16', sans-serif;
  margin: 0;
  height: 100dvh; /* Use dynamic viewport height */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  user-select: none;
}

.game-container {
  width: 800px;
  max-width: 100%;
  height: 100%;
  max-height: 100dvh;
  overflow-y: auto; /* Allow scrolling if content is too tall */
  display: flex;
  flex-direction: column;
  padding: 10px;
  padding-bottom: 20px; /* Standard padding */
  box-sizing: border-box;
  position: relative;
}

@media (max-width: 600px) {
  .game-container {
    padding: 5px;
    padding-bottom: 20px;
  }
  .window {
    padding: 8px;
    margin-bottom: 5px;
  }
  .enemy-name {
    font-size: 1.1rem;
    margin-bottom: 5px;
  }
  .message-box {
    font-size: 0.9rem;
    line-height: 1.4;
  }
  .status-window {
    font-size: 1rem;
    margin-bottom: 5px;
  }
  .money-value {
    font-size: 1.0rem; /* Shrink money font size */
  }
  .cmd-btn {
    padding: 4px 1px; /* Shrink button padding */
    font-size: 0.75rem;
    white-space: nowrap;
  }
  .bottom-section {
    height: 160px; /* Reduce height as buttons are now 1 row */
    gap: 5px;
  }
  .player-area {
    width: 130px;
    flex-shrink: 0; /* Prevent shrinking */
  }
  .command-window {
    grid-template-columns: repeat(3, 1fr); /* 3 columns */
    gap: 4px;
  }
  .game-over-text {
    font-size: 2rem;
  }
}

/* ウィンドウ枠の共通デザイン */
.window {
  border: 4px solid #fff;
  padding: 16px;
  margin-bottom: 16px;
  background: #000;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

.top-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0; /* Flexbox overflow fix */
}

.enemy-name {
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.message-box {
  flex-grow: 1;
  overflow-y: auto;
  font-size: 1.25rem;
  line-height: 1.6;
}

/* メッセージの行 */
.message-line {
  margin-bottom: 8px;
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}

.bottom-section {
  height: 220px;
  display: flex;
  gap: 20px;
  flex-shrink: 0;
}

.player-area {
  width: 200px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  position: relative;
}

.player-img {
  width: 100%;
  height: auto;
  max-height: 100%;
  border: 4px solid #fff;
  background: #222;
  image-rendering: pixelated; /* ドット絵を鮮明に */
  transition: transform 0.1s;
}

.stats-area {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.status-window {
  text-align: right;
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.money-value {
  font-size: 2rem;
  margin-left: 10px;
  color: #ffeb3b;
}

.command-window {
  flex-grow: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 0;
}

.cmd-btn {
  background: #000;
  color: #fff;
  border: 2px solid #fff;
  font-family: inherit;
  font-size: 1.2rem;
  padding: 10px;
  cursor: pointer;
  text-align: left;
  transition: all 0.1s;
  display: flex;
  align-items: center;
}

.cmd-btn::before {
  content: "▶";
  margin-right: 8px;
  opacity: 0;
  transition: opacity 0.1s;
}

.cmd-btn:hover:not(:disabled)::before {
  opacity: 1;
}

.cmd-btn:hover:not(:disabled) {
  background: #222;
  transform: translateY(-2px);
}

.cmd-btn:active:not(:disabled) {
  transform: translateY(2px);
}

.cmd-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  border-color: #555;
  color: #888;
}

/* ゲームオーバー画面 */
.game-over-screen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;
  animation: flash 1s;
}

@keyframes flash {
  0% { background-color: #fff; }
  100% { background-color: #000; }
}

.game-over-img {
  width: 300px;
  height: 300px;
  border: 6px solid red;
  margin-bottom: 30px;
  object-fit: cover;
  image-rendering: pixelated;
  background-color: #222;
}

.game-over-text {
  font-size: 4rem;
  color: red;
  font-weight: bold;
  text-shadow: 4px 4px 0px #fff;
  animation: shake 0.5s infinite;
}

@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}

.shake-anim {
  animation: damageShake 0.4s;
}

@keyframes damageShake {
  0% { transform: translate(0, 0); }
  20% { transform: translate(-10px, 0); filter: invert(1); }
  40% { transform: translate(10px, 0); }
  60% { transform: translate(-10px, 0); filter: invert(1); }
  80% { transform: translate(10px, 0); }
  100% { transform: translate(0, 0); }
}

/* ゲームクリア画面 */
.game-clear-screen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9); /* Slight transparency or solid white/light color */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;
  animation: fadeIn 1s;
  color: #333;
}

.game-clear-text {
  font-size: 3rem;
  color: #4caf50;
  font-weight: bold;
  margin-bottom: 20px;
}
`;

// 画像リソース
const IMG_NORMAL = imgNormal;
const IMG_SHOCKED = imgOdoroki;
const IMG_GAMEOVER = imgNaki;

// ゲームのHTML構造
const htmlContent = `
<div class="game-container" id="game-container">
  <div class="top-section">
    <div class="window enemy-name" id="enemy-name-window">
      <span id="enemy-name">パブの女の子</span> が あらわれた！
    </div>
    <div class="window message-box" id="message-box">
      <div class="message-line">ぼったくり・イン・ザ・パブ へようこそ。</div>
      <div class="message-line">所持金5万円。今夜は楽しむぞ！</div>
    </div>
  </div>

  <div class="bottom-section">
    <div class="player-area">
      <!-- プレイヤー画像：初期値はIMG_NORMAL -->
      <img src="${IMG_NORMAL}" alt="Player" class="player-img" id="player-img">
    </div>
    
    <div class="stats-area">
      <div class="window status-window">
        所持金 <span id="money" class="money-value">50,000</span> 円
      </div>
      
      <div class="window command-window">
        <button class="cmd-btn" id="btn-drink">のむ</button>
        <button class="cmd-btn" id="btn-flatter">おだてる</button>
        <button class="cmd-btn" id="btn-leave">かえる</button>
      </div>
    </div>
  </div>

  <!-- ゲームオーバー画面（非表示で初期化） -->
  <div id="game-over-screen" class="game-over-screen" style="display: none;">
    <img src="${IMG_GAMEOVER}" alt="Game Over" class="game-over-img">
    <div class="game-over-text">ぼったくられた…</div>
    <button id="btn-retry" class="cmd-btn" style="margin-top: 20px;">もう一度挑戦する</button>
  </div>

  <!-- ゲームクリア画面（非表示で初期化） -->
  <div id="game-clear-screen" class="game-clear-screen" style="display: none;">
    <img src="${IMG_NORMAL}" alt="Game Clear" class="game-over-img" style="border-color: #4caf50; background: #eee;">
    <div class="game-clear-text">無事帰宅成功！</div>
    <button id="btn-reset" class="cmd-btn" style="margin-top: 20px; color: #fff; background: #333; border-color: #333;">明日も仕事だ…</button>
  </div>
</div>
`;

// 初期化処理
function initGame() {
  // スタイルの注入
  const styleEl = document.createElement('style');
  styleEl.textContent = styles;
  document.head.appendChild(styleEl);

  // HTMLの注入
  document.body.innerHTML = htmlContent;

  // ゲームロジックの開始
  startGame();
}

// ゲームロジック
function startGame() {
  // 状態変数
  let money = 50000;
  let turn = 1;
  let isBlackSuit = false; // 黒服モードかどうか
  let isGameOver = false;
  let isProcessing = false; // 処理中フラグ

  // DOM要素の取得
  const elMoney = document.getElementById('money');
  const elMessageBox = document.getElementById('message-box');
  const elEnemyName = document.getElementById('enemy-name');
  const elEnemyNameWindow = document.getElementById('enemy-name-window');
  const elGameOverScreen = document.getElementById('game-over-screen');
  const elGameClearScreen = document.getElementById('game-clear-screen');
  const elGameContainer = document.getElementById('game-container');
  const elPlayerImg = document.getElementById('player-img') as HTMLImageElement;

  const btnDrink = document.getElementById('btn-drink') as HTMLButtonElement;
  const btnFlatter = document.getElementById('btn-flatter') as HTMLButtonElement;
  const btnLeave = document.getElementById('btn-leave') as HTMLButtonElement;

  // メッセージ追加関数
  function log(text) {
    const p = document.createElement('div');
    p.className = 'message-line';
    p.innerHTML = text;
    elMessageBox.appendChild(p);
    elMessageBox.scrollTop = elMessageBox.scrollHeight;
  }

  // お金更新関数
  function updateMoney(amount) {
    money += amount;
    elMoney.innerText = money.toLocaleString();

    // ダメージ演出
    if (amount < 0) {
      elMoney.style.color = 'red';
      elGameContainer.classList.add('shake-anim');

      // 画像を「驚いた顔」に変更
      elPlayerImg.src = IMG_SHOCKED;

      setTimeout(() => {
        elMoney.style.color = '#ffeb3b';
        elGameContainer.classList.remove('shake-anim');
        // ゲームオーバーでなければ顔を戻す
        if (!isGameOver) {
          elPlayerImg.src = IMG_NORMAL;
        }
      }, 800);
    }
  }

  // ボタン制御
  function setButtons(enabled) {
    btnDrink.disabled = !enabled;
    btnFlatter.disabled = !enabled;
    btnLeave.disabled = !enabled;
  }

  // 敵の出現チェック（黒服乱入）
  function checkEnemyChange() {
    if (isBlackSuit) return; // 既に黒服なら何もしない

    // ターン5以上 または 所持金2万未満 で高確率で黒服出現
    if (turn > 5 || money < 20000) {
      if (Math.random() < 0.8) { // 80%の確率
        isBlackSuit = true;
        elEnemyName.innerText = "黒服（ボーイ）";
        elEnemyNameWindow.style.borderColor = "red";
        elEnemyNameWindow.style.color = "red";
        log("<span style='color:red'>警告：黒服（ボーイ）が乱入してきた！</span>");
        log("「お客様、そろそろお時間ですが…」");
      }
    }
  }

  // 敵のターン
  function enemyTurn() {
    log("敵のターン！");

    setTimeout(() => {
      // 敵の行動決定
      checkEnemyChange(); // 行動前に変身チェック

      setTimeout(() => {
        let damage = 0;

        if (isBlackSuit) {
          // 黒服の攻撃
          log("黒服「VIPルームチャージ料になります」");
          log("<span style='color:red; font-size:1.5em'>痛恨の一撃！！ -99,999円！</span>");
          damage = -99999;
        } else {
          // 女の子の攻撃（ランダム）
          const r = Math.random();
          if (r < 0.33) {
            log("女の子「フルーツ盛り食べた～い♡」");
            log("フルーツ盛りを頼まれた！ -5,000円");
            damage = -5000;
          } else if (r < 0.66) {
            log("女の子「いいシャンパンあるんだよ～！」");
            log("シャンパンを開けられた！ -20,000円");
            damage = -20000;
          } else {
            log("女の子が謎のドリンクを一気飲みした！");
            log("お会計が加算された！ -10,000円");
            damage = -10000;
          }
        }

        updateMoney(damage);

        // ゲームオーバー判定
        if (money <= 0) {
          setTimeout(() => {
            isGameOver = true;
            elGameOverScreen.style.display = 'flex';
            const gameOverImg = elGameOverScreen.querySelector('img');
            if (gameOverImg) gameOverImg.src = IMG_GAMEOVER;
          }, 1000);
        } else {
          // 次のターンへ
          turn++;
          isProcessing = false;
          setButtons(true);
          log(`<hr>ターン ${turn}：どうしますか？`);
        }
      }, 1000);
    }, 1000);
  }

  // プレイヤーアクションハンドラ
  function handleAction(type) {
    if (isProcessing || isGameOver) return;
    isProcessing = true;
    setButtons(false);

    if (type === 'drink') {
      log("〇〇は お酒を飲んだ！");
      setTimeout(() => log("しかし 何も起こらない！"), 500);
      setTimeout(enemyTurn, 1500);
    }
    else if (type === 'flatter') {
      log("〇〇は 女の子を褒めた！");
      setTimeout(() => log("女の子は 上機嫌だ！"), 500);
      setTimeout(enemyTurn, 1500);
    }
    else if (type === 'leave') {
      log("〇〇は お会計をして帰ろうとした！");
      setTimeout(() => {
        // 20%の確率で成功
        if (Math.random() < 0.2) {
          log("<span style='color:#4caf50; font-size:1.5em'>成功！ 無事に帰宅した！</span>");
          setButtons(false);
          elEnemyName.innerText = "帰宅成功";
          elEnemyNameWindow.style.color = "#4caf50";
          elEnemyNameWindow.style.borderColor = "#4caf50";
          // ゲームクリア演出
          setTimeout(() => {
            elGameClearScreen.style.display = 'flex';
          }, 1000);
        } else {
          log("ボーイに止められた！<br>「お客様、まだお楽しみいただけますよ？」");
          log("帰れない！");
          setTimeout(enemyTurn, 1500);
        }
      }, 1000);
    }
  }

  // イベントリスナー設定
  btnDrink.addEventListener('click', () => handleAction('drink'));
  btnFlatter.addEventListener('click', () => handleAction('flatter'));
  btnLeave.addEventListener('click', () => handleAction('leave'));

  // リトライボタン
  const btnRetry = document.getElementById('btn-retry');
  if (btnRetry) {
    btnRetry.addEventListener('click', () => {
      location.reload();
    });
  }

  // リセットボタン（クリア時）
  const btnReset = document.getElementById('btn-reset');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      location.reload();
    });
  }

  // 開始ログ
  log("あなたのターンです。コマンドを選択してください。");
}

// 実行
initGame();
