<template>
  <div>
    <h2>Games</h2>
    <div v-if="games.length === 0" aria-live="polite">No games loaded</div>
    <ul v-else role="list" style="list-style: none; padding: 0">
      <li v-for="(g, idx) in games" :key="idx" style="margin: 0.5em 0">
        <button @click="select(idx)" :aria-label="`Open game ${idx + 1}`">
          {{ idx + 1 }}. {{ g.white }} – {{ g.black }} ({{ g.result }})
          <span v-if="g.eco">[{{ g.eco }}]</span>
        </button>
        <button
          @click="del(idx)"
          aria-label="Delete game"
          style="margin-left: 0.5em"
        >
          🗑️
        </button>
      </li>
    </ul>
    <button @click="$emit('add-game')" aria-label="Add new game">
      ➕ Add Game
    </button>
  </div>
</template>
<script setup>
// GameList.vue
// defineProps is Vue macro
defineProps({ games: Array });
const emit = defineEmits(["select", "delete", "add-game"]);
function select(idx) {
  emit("select", idx);
}
function del(idx) {
  emit("delete", idx);
}
</script>
