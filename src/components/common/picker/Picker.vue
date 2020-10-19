<script>
import { Picker } from 'vant'

export default {
  name: "Picker",
  props: {
    showToolbar: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    columns: {
      type: Array,
      default () {
        return []
      }
      // [// 第一列
      // {
      //   values: ['周一', '周二', '周三', '周四', '周五'],
      //   defaultIndex: 2,
      // },
      // 第二列
      // {
      //   values: ['上午', '下午', '晚上'],
      //   defaultIndex: 1,
      // },],
    },
  },
  render (h) {
    var self = this
    return h(Picker, {
      props: {
        showToolbar: self.showToolbar,
        title: self.title,
        columns: self.columns
      },
      on: {
        confirm: function(value){

          self.$emit("confirm",{title:self.title,columnVal:value})
          
        },
        cancel:function(){
          self.$emit("cancel",!self.showToolbar)
          
        },
      },

    })
  }
}
</script>