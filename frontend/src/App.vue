<template>
  <div id="app">
    <Navbar />
    {{ new Date() | moment("LLL") }}
    <b-container>
      <b-row>
        <b-col cols="12">
          <router-view />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Navbar from "./components/Navbar/Navbar";
export default {
  components: {
    Navbar
  },
  data() {
    return {
      datim: Date.now()
    };
  }
};
</script>

<style lang="scss" >
</style>