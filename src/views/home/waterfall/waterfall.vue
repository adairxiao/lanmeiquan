<template>
  <div class="water-fall" ref="waterfall">
    <column :columnList="columnList1" ref="column1">
      <template #first-col>
        <div></div>
      </template>
    </column>
    <column :columnList="columnList2" ref="column2">
      <template #first-col>
        <div></div>
      </template>
    </column>
    <column :columnList="columnList3" ref="column3">
      <template #first-col>
        <div></div>
      </template>
    </column>
  </div>
</template>

<script>
import column from '@/views/home/waterfall/column.vue'
import { getImages } from "@/network/api/api.js"
export default {
  data() {
    return {
      imgs: [],
      columnList1: [], // 第一列元素列表
      columnList2: [],
      columnList3: [],
    }
  },
  created() {
    getImages().then(res => {
      this.imgs = [...res.data];
    })
  },
  mounted() {
    // console.log(this.$refs);
    this.$nextTick(() => {
      // 通过ref获取每列高度，column1，column2，column3，column4分别代表第一、二、三列
      let columsHeight = [this.$refs.column1.$el.offsetHeight, this.$refs.column2.$el.offsetHeight, this.$refs.column3.$el.offsetHeight]
      

      // 获取各列最小高度
      let minHeight = Math.min.apply(null, columsHeight);
      // 获取最小高度index
      let minHeightIndex = columsHeight.findIndex(index => index===minHeight)
      
    })

  },

  components: {
    column,
  }
}
</script>

<style lang = "less">
@import "index";
</style>