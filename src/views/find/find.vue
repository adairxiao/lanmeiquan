<template>
  <div class="body-box">
    <div class="item-box" v-for="(item,index) in findList" :key="index">
      <div class="info-box">
        <div class=letf></div>
        <div class=middle><span>{{name}}</span><span>{{time}}</span></div>
        <div class=right></div>
      </div>
      <div class="conent-box"></div>
      <div class="bottom-box"></div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      name:'殷桃小丸子',
      time:'3天前',
      title:'记录生活小动态！',
      addr:'杭州西湖风景区',
      findList:['https://hichat2.oss-cn-shanghai.aliyuncs.com/kliao/2020/11/05/10267/ios_1604548048170957249265.mp4']
    }
  }
}
</script>

<style lang="less">
@import "index";
</style>