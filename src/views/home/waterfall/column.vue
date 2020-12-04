<template>
  <div class="column" >
    <template>
      <slot name="first-col"></slot>
    </template>

    <!-- 第一列瀑布流内容... -->
    <div
      class="column-content"
      v-for="(item, index) in columnList"
      :key="index"
      ref="c1"
    >
      <div class="content-img" >
        <img :src="item.img" :alt="index" :style="{height:setHeight(item.width,item.height)}"  />
      </div>
      <div class="content-bottom-box">
        <span>xxxxxxxxx</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    columnList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {

    }
  },
  updated(){

    this.$nextTick(()=>{
      
    })
    
  },
  methods:{
    setHeight(w,h){
      console.log(this.$refs.c1.offsetWidth);
      
      console.log(h*0.3);
    }
  }
  
}
</script>

<style lang="less">
.column {
  width: 30%;
  
  .column-content {
    position: relative;
    padding: 2px;
    border-radius: 5%;
    overflow: hidden;
    margin-bottom: 20px;
    background-color: slateblue;
    .content-img {
      width: 100%;
      height: auto;
      min-height: 150px;
      img {
        width: 100%;
        height: auto;
        vertical-align: top;
      }
    }

    .content-bottom-box {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 50px;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.1) 5%,
        rgba(0, 0, 0, 0.2) 10%,
        rgba(0, 0, 0, 0.3) 25%,
        rgba(0, 0, 0, 0.4) 50%,
        rgba(0, 0, 0, 0.5) 75%
      );
      text-align: center;
      line-height: 50px;
      color: white;
    }
  }
}
</style>