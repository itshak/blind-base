// AppSections: wrapper for section keyboard navigation
<template>
  <div @keydown="onSectionShortcut">
    <slot />
  </div>
</template>
<script setup>
const sectionShortcuts = {
  1: 0, // Upload
  2: 1, // Editor
  3: 2, // Viewer
  4: 3, // Navigator
  5: 4, // Announcer
};
function onSectionShortcut(e) {
  if (e.altKey && e.key in sectionShortcuts) {
    const sections = document.querySelectorAll("section");
    const idx = sectionShortcuts[e.key];
    if (sections[idx]) {
      sections[idx].focus();
      e.preventDefault();
    }
  }
}
</script>
