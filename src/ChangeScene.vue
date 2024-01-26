<script setup lang="ts">
import { useAREngine } from './AREngine';
import { TestScene2, moveObject } from './scene';
import { ref } from 'vue';
import { reactive } from 'vue';
import { createBaret } from "./tank/shoot"

function Fire(){
  createBaret()
  console.log("ボタンが押されました")
}

const ar_engine = useAREngine();
const logoPosition = reactive({ top: 100, left: 200 });
const Attack_Position = reactive({ top: 50, left: 1500 });
const Range_Position = reactive({ top: 80, left: 20 });


const scene_b = () => {
  const newScene = new TestScene2();
  ar_engine.replaceScene(newScene);
};

const scene_c = () => {
  // 何かの処理が実行された場合、HPを減少させる
  // decreaseHP();
};



</script>

<template>
  <img
    src="./assets/launch.svg"
    width="200"
    height="200"
    :style="{ position: 'absolute', top: '50%', left: '500%' }"
    @click="Fire()"
  />
</template>

<style scoped>
  /* スタイルがあれば必要に応じて */
</style>