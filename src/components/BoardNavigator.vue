//BoardNavigator.vue // defineProps is a Vue 3 macro
<template>
  <div>
    <div
      class="board-nav-overlay"
      tabindex="0"
      @keydown="onBoardNavKey"
      aria-label="Chessboard navigation"
      ref="navOverlay"
      style="outline: 2px solid #007; margin: 1em 0; min-height: 2em"
    >
      Use arrow keys to navigate the board. Current: {{ currentSquareLabel }}
    </div>
    <div ref="squareAnnouncer" aria-live="polite" class="sr-only"></div>
  </div>
</template>
<script setup>
import { ref, computed, watch } from "vue";
const props = defineProps({ board: Object });

const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
const ranks = [8, 7, 6, 5, 4, 3, 2, 1];
const currentFile = ref(0);
const currentRank = ref(0);
const squareAnnouncer = ref(null);
const navOverlay = ref(null);

const currentSquareLabel = computed(() => {
  return `${files[currentFile.value]}${ranks[currentRank.value]}`;
});

function announceSquare() {
  if (squareAnnouncer.value) {
    squareAnnouncer.value.textContent = `Square ${currentSquareLabel.value}`;
  }
}

function onBoardNavKey(e) {
  if (e.key === "ArrowUp") {
    if (currentRank.value > 0) currentRank.value--;
  } else if (e.key === "ArrowDown") {
    if (currentRank.value < 7) currentRank.value++;
  } else if (e.key === "ArrowLeft") {
    if (currentFile.value > 0) currentFile.value--;
  } else if (e.key === "ArrowRight") {
    if (currentFile.value < 7) currentFile.value++;
  }
  announceSquare();
  e.preventDefault();
}

watch(
  () => props.board,
  () => {
    currentFile.value = 0;
    currentRank.value = 0;
  }
);
</script>
<style>
.sr-only {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
</style>
