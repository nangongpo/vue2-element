<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/base/_variables.scss';

.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - #{$headerHeight});
  width: 100%;
  position: relative;
  overflow: hidden;
  background: $gray;
}

.fixed-header+.app-main {
  padding-top: $headerHeight;
}

.hasTagsView {
  .app-main {
    min-height: 100vh;
  }

  .fixed-header+.app-main {
    padding-top: $headerHeight + 34;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
