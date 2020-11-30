<template>
  <div class="swipe-box">
    <ul
      class="wrap"
      ref="wrap"
      @touchmove="moveEvent($event)"
      @touchstart="startEvent($event)"
      @touchend="endEvent($event)"
    >
      <li v-for="(item, index) in imgs" :key="index">
        <img
          :src="require('../../../assets/images/home/banner/' + item)"
          alt="img"
        />
      </li>
    </ul>
    <div class="buttons">
      <span
        v-for="index in imgs.length - 2"
        :key="index"
        :style="{ opacity: swipeIndicators(index) }"
      ></span>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      imgs: ['timg2.jpg', 'timg.jpg', 'timg1.jpg', 'timg2.jpg', 'timg.jpg'],
      // 显示宽度
      showWidth: 0,
      // 点击时x位置
      startX: 0,
      // 离开时x位置
      endX: 0,
      // 当前移动的偏移量
      currentOffsetx: 0,
      index: 0,
      // 定时器
      intervalID: undefined
    }
  },
  created() {

  },
  mounted() {
    //获取显示区域的宽度
    this.showWidth = this.$refs.wrap.offsetWidth
    //初始化容器的宽度
    const divWidth = (this.imgs.length) * this.showWidth
    this.$refs.wrap.style.width = divWidth + 'px'

    // 初始化位置
    this.endX = -this.showWidth
    this.index = -1
    this.$refs.wrap.style.left = -this.showWidth + 'px'


    // 自动播放
    this.Autoplay(this.index)
  },
  methods: {
    startEvent(e) {
      this.startX = e.changedTouches[0].pageX
    },

    moveEvent(e) {
      //清除定时器
      if (this.intervalID) {
        clearInterval(this.intervalID)
        this.intervalID = undefined
      }

      //移动过程中的偏移位
      // 位于页面中的x坐标
      let moveX = e.changedTouches[0].pageX

      this.currentOffsetx = (moveX - this.startX) + this.endX

      // 控制每次移动最大偏移量
      //实际偏移量x
      let x = this.currentOffsetx - (this.index * this.showWidth)
      if (x < -this.showWidth) {
        this.currentOffsetx = (this.index + -1) * this.showWidth
      } else if (x > this.showWidth) {
        this.currentOffsetx = (this.index + 1) * this.showWidth
      }

      this.$refs.wrap.style.left = this.currentOffsetx + 'px'

    },
    endEvent(e) {

      this.index = this.currentOffsetx / this.showWidth > this.index ? Math.ceil(this.currentOffsetx / this.showWidth) : Math.floor(this.currentOffsetx / this.showWidth)
      const x = e.changedTouches[0].pageX - this.startX
      this.endX += x
      x > 0 ? this.prev() : this.next()
      this.Autoplay(this.index)
    },
    prev() {
      // 翻页
      if (this.index === -0) {
        this.index = -(this.imgs.length - 2)
      }
      this.currentOffsetx = this.showWidth * this.index
      this.endX = this.currentOffsetx
      this.$refs.wrap.style.left = this.currentOffsetx + 'px'
      // console.log("prev");

    },
    next() {
      // 翻页
      if (this.index === -4) {
        this.index = -1
      }
      this.currentOffsetx = this.index * this.showWidth
      this.endX = this.currentOffsetx
      this.$refs.wrap.style.left = this.currentOffsetx + 'px'

      // console.log("next");
    },
    Autoplay(index) {
      // 自动播放
      const self = this
      this.intervalID = setInterval(() => {
        index--
        if(index ===-(self.imgs.length-1)){
          index = -1
        }
        self.index = index
        self.next()
      }, 1000);


    },
    swipeIndicators(currentIndex) {
      // 显示对应下标指示
      if (currentIndex === Math.abs(this.index)) {
        return 1
      }
      return 0.5
    },

  }
}
</script>

<style lang="less">
@import "index";
</style>