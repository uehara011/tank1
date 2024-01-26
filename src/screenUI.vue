<script setup lang="ts">
import { useAREngine } from './AREngine';
//import { shot } from './scene';
import { reactive, ref, watchEffect } from 'vue';
import { Tank } from "./tank/createTank"; 
import  { Move }  from './tank/Move';
import Heart from "./Heart.vue";
import { enemyTank_move } from "./tank/enemy_move";
//import { fireBaret, isFiring } from './tank/shoot';
import { remainingTime } from "./tank/shoot";
const moveInstance =  new Move();
const Attack_Position = reactive({top:170, left:500});
const Range_Position = reactive({top:100, left:600});

const moveUp = () => {
  // 上矢印がクリックされたときに Move クラスのメソッドを呼び出す
  moveInstance.moveUp();
};

const moveDown = () => {
  // 下矢印がクリックされたときに Move クラスのメソッドを呼び出す
  moveInstance.moveDown();
};

const moveLeft = () => {
  // 左矢印がクリックされたときに Move クラスのメソッドを呼び出す
  moveInstance.moveLeft();
};

const moveRight = () => {
  // 右矢印がクリックされたときに Move クラスのメソッドを呼び出す
  moveInstance.moveRight();
};

const ar_engine = useAREngine(); // シングルトンを取得
//export　const remainingTime = ref(180); // 初期値を設定（秒）

/*
const shot_botton = () => {
    ar_engine.replaceScene(new shot());
}
*/

// タイマーのカウントダウンロジック
const timerInterval = setInterval(() => {
  
  if (remainingTime.value <= 0) {
    clearInterval(timerInterval);
    alert('試合終了！');
    const nextPageURL = `defiet.html?`;
    window.location.href = nextPageURL;
    remainingTime.value = 3; // タイマーリセット(180秒)
  } else {
    remainingTime.value--;
    enemyTank_move();
  }
}, 1000);

// コンポーネントがアンマウントされたらタイマーをクリア
watchEffect(() => {
  return () => {
    clearInterval(timerInterval);
  };
});
</script>

<template>
  <div>
    <!--<button @click="shot_botton" class="round-button">発射</button> -->
    <p class="timer">残り時間: {{ remainingTime }}秒</p>
  </div>
      <!-- 十字キー -->
      <div class="arrow-keys">
      <div class="arrow-up" @click="moveUp"></div>
      <div class="arrow-down" @click="moveDown"></div>
      <div class="arrow-left" @click="moveLeft"></div>
      <div class="arrow-right" @click="moveRight"></div>
      
    </div>
    <Heart></Heart>
  
</template>
<style>
.round-button 
{
  width: 150px;
  height: 150px;
  border-radius: 50%;
  bottom: 20%; /*top, bottom, left, right で変更可能*/ 
  position: absolute;
  left: 70%;
  font-size: 24px; /* 文字の大きさを変更するスタイル */
  
}

.timer 
{
  position: absolute;
  top: 30px;
  left: 700px;
  transform: translateX(-50%);
  white-space: nowrap; /* 改行を無視して横に表示するスタイル */
  font-size: 24px; /* 文字の大きさを変更するスタイル */
}

.arrow-keys 
{
  position: absolute;
  top: 40px;
  left: 90px;
}

.arrow-up, .arrow-down, .arrow-left, .arrow-right 
{
  width: 0;
  height: 0;
  border-style: solid;
  display: inline-block;
}

.arrow-up 
{
  border-width: 0 50px 85px 50px;
  border-color: transparent transparent #007bff transparent;
  cursor: pointer;
  position: absolute;
  top: 415px; /* 位置を変更 */
  left: 80px; /* 位置を変更 */
  
}

.arrow-down 
{
  border-width: 85px 50px 0 50px;
  border-color: #007bff transparent transparent transparent;
  cursor: pointer;
  position: absolute;
  top: 600px; /* 位置を変更 */
  left: 80px; /* 位置を変更 */ 
}

.arrow-left 
{
  border-width: 50px 85px 50px 0;
  border-color: transparent #007bff transparent transparent;
  cursor: pointer;
  position: absolute;
  top: 500px; /* 位置を変更 */
  left: -5px; /* 位置を変更 */
}

.arrow-right {
  border-width: 50px 0 50px 85px;
  border-color: transparent transparent transparent #007bff;
  cursor: pointer;
  position: absolute;
  top: 500px; /* 位置を変更 */
  left: 180px; /* 位置を変更 */
  
}
</style>

<!--
<style scoped>
.round-button {
  width: 20%; /* 画面幅に対する割合 */
  height: 20%; /* 画面高さに対する割合 */
  border-radius: 50%;
  position: absolute;
  bottom: 5%; /* 画面下端からの距離をパーセンテージで指定 */ 
  left: 5%; /* 画面左端からの距離をパーセンテージで指定 */ 
  font-size: 2vw; /* 画面幅に対する文字サイズの割合 */
}

.timer {
  position: absolute;
  top: 2%; /* 画面上端からの距離をパーセンテージで指定 */
  left: 50%; /* 画面幅に対する割合で中央に配置 */
  transform: translateX(-50%);
  white-space: nowrap;
  font-size: 2vw;
}

.arrow-keys {
  position: absolute;
  top: 80%; /* 画面上端からの距離をパーセンテージで指定 */
  left: 50%; /* 画面左端からの距離をパーセンテージで指定 */
  transform: translateX(-50%);
}

.arrow-up, .arrow-down, .arrow-left, .arrow-right {
  width: 0;
  height: 0;
  border-style: solid;
  display: inline-block;
  position: absolute;
}

.arrow-up {
  border-width: 0 5vw 8.5vw 5vw; /* 画面幅に対する割合 */
  border-color: transparent transparent #007bff transparent;
  cursor: pointer;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.arrow-down {
  border-width: 8.5vw 5vw 0 5vw; /* 画面幅に対する割合 */
  border-color: #007bff transparent transparent transparent;
  cursor: pointer;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
}

.arrow-left {
  border-width: 5vw 8.5vw 5vw 0; /* 画面幅に対する割合 */
  border-color: transparent #007bff transparent transparent;
  cursor: pointer;
  top: 10%;
  left: 40%;
  transform: translateX(-50%);
}

.arrow-right {
  border-width: 5vw 0 5vw 8.5vw; /* 画面幅に対する割合 */
  border-color: transparent transparent transparent #007bff;
  cursor: pointer;
  top: 10%;
  left: 60%;
  transform: translateX(-50%);
}
</style>
-->