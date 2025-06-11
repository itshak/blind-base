//AccessiblePgnViewer.vue // defineProps and defineEmits are Vue 3 macros
<template>
  <div>
    <PgnViewer
      :config="config"
      @ready="onReady"
      @move="onMove"
      ref="pgnViewer"
    />
    <div ref="moveAnnouncer" aria-live="polite" class="sr-only"></div>
  </div>
</template>
<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { PgnViewer } from "vue-pgn-viewer";

const props = defineProps({
  pgn: String,
  editable: { type: Boolean, default: false },
});
const emit = defineEmits(["boardUpdate", "move"]);

const config = ref({
  pgn: props.pgn,
  orientation: "white",
  editable: props.editable,
});

const pgnViewer = ref(null);
const moveAnnouncer = ref(null);

let apiRef = null;

function onReady(api) {
  apiRef = api;
  emit("boardUpdate", api.getFen());
}

function onMove(move) {
  if (moveAnnouncer.value) {
    moveAnnouncer.value.textContent = `Move: ${move.san}`;
  }
  if (pgnViewer.value && pgnViewer.value.api) {
    emit("boardUpdate", pgnViewer.value.api.getFen());
  }
  emit("move", move);
}

function prevMove() {
  if (apiRef) apiRef.goTo("prev");
}

function nextMove() {
  if (apiRef) apiRef.goTo("next");
}

function onGlobalKey(e) {
  if (e.target.closest("textarea, input, [contenteditable=true]")) return; // ignore typing fields
  if (e.key === "[") {
    prevMove();
    e.preventDefault();
  } else if (e.key === "]") {
    nextMove();
    e.preventDefault();
  }
}

onMounted(() => {
  window.addEventListener("keydown", onGlobalKey);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onGlobalKey);
});

watch(
  () => props.pgn,
  (val) => {
    config.value = { ...config.value, pgn: val };
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
