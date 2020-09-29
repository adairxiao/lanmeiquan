<template>
  <div class="forget-article">
    <!-- <router-link to="/"></router-link> -->
    <div v-if="currendPage==='phone'">
      <main-phone v-on:updatePage="nextPage" ></main-phone>
    </div>
    <div v-else-if="currendPage==='code'">
      <main-code v-on:updatePage="nextPage" ></main-code>
    </div>
    <div v-else>
      <main-change v-on:updatePage="nextPage" ></main-change>
    </div>
  </div>
</template>

<script>
import MainPhone from "@/views/forget/childcomponents/Mainphone";
import MainCode from "@/views/forget/childcomponents/Maincode";
import MainChange from "@/views/forget/childcomponents/Mainchange";
export default {
  name: "Forget",
  data() {
    return {
      currendPage: "phone",
      
    };
  },
  mounted() {
  },
  methods: {
    nextPage(page) {
      this.currendPage = page;
    }
    
  },
  components: {
    MainPhone,
    MainCode,
    MainChange
  }
};
</script>

<style lang="less" >
.forget-article {
  width: 100%;
  height: 100%;

  .forget-upper-half {
    width: 100%;
    height: 100%;
    // position: absolute;
    background-color: #e6ecf0;
    overflow: hidden;

    .login-content {
      width: 100%;
      // margin: 0 auto;
      .Icon-hint {
        .froget-title-text {
          color: #999;
          font-size: 14px;
          margin: 22px 23px 22px 15px;

          span {
            word-break: normal;
            width: auto;
            display: block;
            white-space: pre-wrap;
            word-wrap: break-word;
            overflow: hidden;
          }
        }
      }
    }
  }
}
</style>