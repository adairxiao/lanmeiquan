// 策略对象
function strategies() { }

strategies.prototype.mobileFormat = function (value) {
  let re = /^[1]([3-9])[0-9]{9}$/
  return re.test(value[0])
}

strategies.prototype.isNonEmpty = function (value) {
  if (value[0] === '') {
    return false
  }
  return true
}

strategies.prototype.minLength = function (value) {
  console.log(value);
  if (value[0].length < value[2]) {
    return false
  }
  return true
}

strategies.prototype.maxLength = function (value) {
  console.log(value[0].length);
  if (value[0].length > value[2]) {
    return false
  }
  return true
}

// 环境类  Context接受客户的请求，随后把请求委托给某一个策略方法
export var validator = {
  msg: '',
  cache: [], // 保存效验规则
  isRun: false, //是否执行
  add(rule) {


    this.cache.push(rule)
    return this
  },
  start(self) {
    console.log(this.cache);
    console.log(this);
    const objectives = new strategies()
    let msg = null
    for (let rule of this.cache) {
      msg = rule[rule.length - 1]
      let event = rule[1]
      this.isRun = objectives[event](rule)
      console.log("this.isRun", this.isRun);
      if (!this.isRun) {
        this.msg = msg
        this.toast(self)
        this.cache = []
        break
      }

      
      this.isRun = false
      this.cache = []
      this.msg=""
      1
    }
    return this.msg
  },
  toast(self) {
    // 获取到vue实例的this,去调用全局的toast方法
    if (!this.isRun) {
      self.$toast(this.msg)
    }
  }
}