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
      itemList: [],
      columnList1: [], // 第一列元素列表
      columnList2: [],
      columnList3: [],
      renderIndex: -1, // 渲染第几个item
      isRendering:false
    }
  },
  watch: {
    renderIndex(value) {
      this.renderData()
    }
  },

  created() {

  },
  mounted() {
    getImages().then(res => {
      this.itemList = [...res.data];
      console.log(this.itemList);
      this.renderData()
    })


  },
  methods: {
    // 获取高度
    columsHeight() {
      // 通过ref获取每列高度，column1，column2，column3，column4分别代表第一、二、三列
      console.log(this.$refs.column1.$el);
      return [this.$refs.column1.$el.offsetHeight, this.$refs.column2.$el.offsetHeight, this.$refs.column3.$el.offsetHeight]
    },
    // 获取高度最小索引函数
    getMinhIndex(arr, value) {
      return new Promise((reslove) => {
        console.log(arr, value);
        let minIndex = arr.findIndex(index => index === value)
        reslove(minIndex);
      }
      );
    },
    renderData() {
      
      if (this.renderIndex === this.itemList.length) return
      if(this.isRendering) return
      this.isRendering = true
      // 获取各列最小高度
      let columsHeight = this.columsHeight()
      let minHeight = Math.min.apply(null, columsHeight);
      this.getMinhIndex(columsHeight, minHeight).then(minIndex => {

        const key = `columnList${minIndex + 1}`

        let itemData = this.itemList[this.renderIndex + 1];

        this[key] = this[key].concat(itemData);

        this.$nextTick(() => {
          this.renderIndex = this.renderIndex + 1;
          this.isRendering = false;
        });

      })
    }
  },

  components: {
    column,
  }
}
</script>

<style lang = "less">
@import "index";
</style>