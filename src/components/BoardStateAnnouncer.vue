//BoardStateAnnouncer.vue // defineProps is a Vue 3 macro
<template>
  <div>
    <button @click="announceBoard" aria-label="Announce board state">
      Announce Board State
    </button>
    <div
      ref="boardAnnouncer"
      aria-live="polite"
      tabindex="0"
      class="sr-only"
    ></div>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";
const props = defineProps({ board: Object, trigger: Number });
const boardAnnouncer = ref(null);

function announceBoard() {
  if (!props.board || !boardAnnouncer.value) return;
  const boardText =
    typeof props.board === "string" ? props.board : JSON.stringify(props.board);
  boardAnnouncer.value.textContent = `Board: ${boardText}`;
}
watch(
  () => props.trigger,
  () => {
    announceBoard();
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
