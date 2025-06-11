<template>
  <div @keydown="onSectionShortcut">
    <h1>Blind ChessBase</h1>
    <AppSections>
      <!-- 1 Upload -->
      <section ref="uploadSection">
        <PgnUploader @pgnLoaded="onFileLoaded" />
      </section>

      <!-- 2 Games List -->
      <section ref="listSection" v-if="games.length">
        <GameList
          :games="games"
          @select="openGame"
          @delete="deleteGame"
          @add-game="startAddGame"
        />
      </section>

      <!-- 3 Editor for adding a new game -->
      <section ref="editorSection" v-if="addingGame">
        <PgnEditor :pgn="newGameText" @updatePgn="newGameText = $event" />
        <button @click="saveNewGame">Save Game</button>
        <button @click="cancelAdd">Cancel</button>
      </section>

      <!-- 4 Viewer / Navigator / Announcer when game selected -->
      <section ref="viewerSection" v-if="currentGame">
        <AccessiblePgnViewer
          :pgn="currentGame.raw"
          editable
          @boardUpdate="onBoardUpdate"
          @move="onMove"
        />
      </section>
      <section ref="navigatorSection" v-if="currentGame">
        <BoardNavigator :board="board" />
      </section>
      <section ref="announcerSection" v-if="currentGame">
        <BoardStateAnnouncer :board="board" :trigger="announceBoardTrigger" />
      </section>
    </AppSections>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import PgnUploader from "./components/PgnUploader.vue";
import PgnEditor from "./components/PgnEditor.vue";
import AccessiblePgnViewer from "./components/AccessiblePgnViewer.vue";
import BoardNavigator from "./components/BoardNavigator.vue";
import BoardStateAnnouncer from "./components/BoardStateAnnouncer.vue";
import AppSections from "./components/AppSections.vue";
import GameList from "./components/GameList.vue";
import { parsePgnFile } from "./utils/pgnService.js";

const games = ref([]);
const selectedIdx = ref(null);
const addingGame = ref(false);
const newGameText = ref("");
const board = ref(null);
const announceBoardTrigger = ref(0);

function onFileLoaded(filePgn) {
  // Parse entire file into games array
  games.value = parsePgnFile(filePgn);
  selectedIdx.value = null;
  addingGame.value = false;
}

function openGame(idx) {
  selectedIdx.value = idx;
  addingGame.value = false;
}

const currentGame = computed(() =>
  selectedIdx.value !== null ? games.value[selectedIdx.value] : null
);

function deleteGame(idx) {
  games.value.splice(idx, 1);
  if (selectedIdx.value === idx) selectedIdx.value = null;
}

function startAddGame() {
  addingGame.value = true;
  selectedIdx.value = null;
  newGameText.value = "";
}

function saveNewGame() {
  if (!newGameText.value.trim()) return;
  const parsed = parsePgnFile(newGameText.value);
  if (parsed.length) {
    games.value.push(...parsed);
    addingGame.value = false;
  }
}

function cancelAdd() {
  addingGame.value = false;
}

function onBoardUpdate(newBoard) {
  board.value = newBoard;
}
function onMove() {
  // Optionally trigger board state announcement on move
}

const sectionShortcuts = {
  1: 0, // Upload
  2: 1, // Games List
  3: 2, // Add Game (Editor)
  4: 3, // Viewer
  5: 4, // Navigator
  6: 5, // Announcer
};
function onSectionShortcut(e) {
  if (e.altKey && sectionShortcuts[e.key]) {
    const sections = document.querySelectorAll("section");
    const idx = sectionShortcuts[e.key];
    if (sections[idx]) {
      sections[idx].focus();
      e.preventDefault();
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
