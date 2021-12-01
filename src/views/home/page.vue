<template>
  <div class="page-container">
    <div @click="onPre" v-show="page.number===0">上一页</div>
    <div @click="onToHome" v-show="page.number===0">首页</div>
    <div @click="onNext" v-show="isNext">
      下一页
    </div>
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
      isPre(){
          if (this.page.number + 1 < this.page.totalPages ){ return 0}else{return 1};
      },
    isNext() {
    //     dd.confirm({
    //     title: "this.page",

    //     message: JSON.stringify(this.page),
    //     buttonLabels: ["ok", "cancel"],
    //   });
    //   if (this.page.totalPages>=1) return 1;
      if (this.page.number + 1 > this.page.totalPages ){ return 0}else{return 1};
    },
  },
  data() {
    return {};
  },
  methods: {
    onPre() {
      this.$emit('onPre');
    },
    onToHome() {
      this.$emit('onToHome');
    },
    onNext() {
      this.$emit('onNext');
    },
  },
};
</script>

<style>
.page-container {
  /* background-color: red; */
  width: 100%;
  height: 64px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
}
</style>
