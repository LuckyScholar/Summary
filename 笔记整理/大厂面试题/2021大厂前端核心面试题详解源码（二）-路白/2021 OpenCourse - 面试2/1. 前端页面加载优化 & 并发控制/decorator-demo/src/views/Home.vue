<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '../components/HelloWorld.vue'; // @ is an alias to /src
import { measure } from '../lib/decorator';

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
    public longTimefn() {
        return new Promise((resolve) => setTimeout(resolve, 3000));
    }

    @measure
    public async created() {
        await this.longTimefn();
    }
}
</script>
