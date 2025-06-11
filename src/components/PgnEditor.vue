//PgnEditor.vue // defineProps and defineEmits are Vue 3 macros
<template>
  <div>
    <label for="pgn-editor">Edit PGN:</label>
    <textarea
      id="pgn-editor"
      v-model="localPgn"
      @input="emit('updatePgn', localPgn)"
      aria-label="Edit PGN"
      rows="10"
      cols="60"
    ></textarea>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";
const props = defineProps({ pgn: String });
const emit = defineEmits(["updatePgn"]);
const localPgn = ref(props.pgn);
watch(
  () => props.pgn,
  (val) => {
    localPgn.value = val;
  }
);
</script>
