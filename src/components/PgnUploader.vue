//PgnUploader.vue // defineEmits is a Vue 3 macro
<template>
  <div>
    <label for="pgn-upload">Upload PGN:</label>
    <input
      id="pgn-upload"
      type="file"
      accept=".pgn"
      @change="onFileChange"
      aria-label="Upload PGN"
    />
  </div>
</template>
<script setup>
const emit = defineEmits(["pgnLoaded"]);
function onFileChange(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (event) => {
    emit("pgnLoaded", event.target.result);
  };
  reader.readAsText(file);
}
</script>
