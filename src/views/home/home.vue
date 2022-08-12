<template>
  <div class="home-content">
    <div class="quick-entrance-container" v-if="user.role === 'create'">
      <van-row>
        <van-col span="12">
          <div class="col-item">
            <div class="item-box">
              <!-- <van-image
                width="100"
                height="100"
                src="https://img01.yzcdn.cn/vant/cat.jpeg"
              /> -->
              <van-icon name="apps-o" size="50" color="white" />
              <span class="col-item-title">任务列表</span>
            </div>
          </div>
        </van-col>
        <van-col span="12">
          <div class="col-item" @click="onClick">
            <div class="item-box">
              <!-- <van-image
                width="100"
                height="100"
                src="https://img01.yzcdn.cn/vant/cat.jpeg"
              /> -->
              <van-icon name="edit" size="50" color="white" />
              <span class="col-item-title">新增任务</span>
            </div>
          </div>
        </van-col>
        <!-- <van-col span="8">
          <div class="col-item">
            <div class="item-box">
              
              <van-icon name="exchange" size="50" color="white" />
              <span class="col-item-title">批量导入</span>
            </div>
          </div>
        </van-col> -->
      </van-row>
    </div>
    <van-tabs :value="tabsActive" color="#1989fa" @click="onClickTabs" sticky>
      <van-tab title="待受理" name="待受理" v-if="user.role === 'create'">
      </van-tab>
      <van-tab title="处理中" name="处理中" v-if="user.role === 'create'">
      </van-tab>
      <van-tab
        title="已完成"
        name="已完成"
        v-if="user.role === 'create'"
        title-class="title-right-line"
      >
      </van-tab>
      <van-tab title="待处理" name="待处理"> </van-tab>
      <van-tab title="已处理" name="已处理"></van-tab>
    </van-tabs>
    <div class="data-list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          :title="item.type || ''"
          :label="'完成时限：' + (item.wcsx || '')"
          center
          v-for="(item, index) in data"
          :key="index"
        >
          <div slot="right-icon" style="flex:0 0 auto;">
            <div class="right-box">
              <div
                class="v-button"
                style="background-color:#1989fa"
                @click="
                  $router.push({
                    name: 'SolveTask',
                    query: { id: item.id, state: item.state, tab: tabsActive },
                  })
                "
                v-show="queryType === 0"
              >
                {{ tabsActive === "待处理" ? "处理" : "受理" }}
              </div>
              <div
                class="v-button"
                :style="{ backgroundColor: item.cbzt === '1' ? '#ccc' : 'red' }"
                @click="handleCuiBan(item, index)"
                v-show="tabsActive === '处理中'"
              >
                催办
              </div>
              <div
                class="v-button"
                @click="
                  $router.push({ name: 'TaskDetails', query: { id: item.id } })
                "
                v-show="tabsActive === '处理中'"
              >
                查看
              </div>
              <div
                class="v-button"
                @click="
                  $router.push({ name: 'TaskDetails', query: { id: item.id } })
                "
                v-show="tabsActive === '已完成' || tabsActive === '已处理'"
              >
                查看
              </div>

              <div
                class="v-button"
                style="background-color:#1989fa"
                @click="
                  $router.push({name:'EditTask', query: { id: item.id } })
                "
                v-show="tabsActive === '已完成' || tabsActive === '处理中'"
              >
                <i class="el-icon-edit"></i>
              </div>
            </div>
          </div>
        </van-cell>
      </van-list>
    </div>
    <!-- <div class="footer-page">
      <Page :page="page" @onPre="onPre" @onToHome="onToHome" @onNext="onNext" />
    </div> -->

    
  </div>
</template>

<script>
import { Col as VanCol, Row as VanRow } from "vant";
import { Image as VanImage, Icon as VanIcon } from "vant";
import { Cell as VanCell, CellGroup as VanCellGroup } from "vant";
import { Tab as VanTab, Tabs as VanTabs } from "vant";
import { List as VanList } from "vant";
import Page from "@/views/home/page.vue";
import { mapState } from "vuex";
import {currentPage} from "@/util/buryingPoint"
import {
  getEventList,
  getEventTodo,
  getEventDone,
  cuiban,
} from "@/network/api/api";
export default {
  data() {
    return {
      data: [],
      tabsActive: "待受理",
      loading: false,
      finished: false,
      isLoading: false,
      page: {
        totalPages: 0,
        number: 0,
        totalElements: 0,
      },
      timeID: "",
    };
  },
  components: {
    VanCol,
    VanRow,
    VanCell,
    VanCellGroup,
    VanImage,
    VanIcon,
    VanTabs,
    VanTab,
    VanList,
    Page,
  },
  computed: {
    ...mapState("Public", ["user"]),
    queryType() {
      let type = 0;
      switch (this.tabsActive) {
        case "处理中":
          type = 1;
          break;
        case "已处理":
          type = 1;
          break;
        case "已完成":
          type = 2;
          break;
      }
      return type;
    },
  },
  watch: {
    user(value) {
      // dd.confirm({
      //   title: "user",
      //   message: JSON.stringify(value),
      //   buttonLabels: ["ok", "cancel"],
      // });
      // this.data = [];
      // this.tabsActive = value.role !== "create" ? "待处理" : "待受理";
      // this.timeID = setTimeout(() => {
      //   this.fetchList();
      //   clearTimeout(this.timeID);
      // }, 200);
    },
  },
  mounted() {
    // this.onClickTabs(0);
    this.data = [];
    this.tabsActive = this.user.role !== "create" ? "待处理" : "待受理";
    this.fetchList();
    

    currentPage(1,"首页","/home")

  },
  methods: {
    fetchList() {
      if (this.tabsActive === "待处理") {
        getEventTodo({
          page: this.page.number,
        }).then((res) => {
          this.data.push(...res.data.content);
          this.page = {
            totalPages: res.data.totalPages,
            number: res.data.number,
            totalElements: res.data.totalElements,
          };

          if (this.page.number + 1 >= this.page.totalPages) {
            this.finished = true;
          } else {
            this.page.number += 1;
          }
          this.loading = false;
        });
      } else if (this.tabsActive === "已处理") {
        getEventDone({
          page: this.page.number,
        }).then((res) => {
          this.data.push(...res.data.content);
          this.page = {
            totalPages: res.data.totalPages,
            number: res.data.number,
            totalElements: res.data.totalElements,
          };

          if (this.page.number + 1 >= this.page.totalPages) {
            this.finished = true;
          } else {
            this.page.number += 1;
          }
          this.loading = false;
        });
      } else {
        getEventList({
          state: this.queryType,
          page: this.page.number,
        }).then((res) => {
          this.data.push(...res.data.content);
          this.page = {
            totalPages: res.data.totalPages,
            number: res.data.number,
            totalElements: res.data.totalElements,
          };

          if (this.page.number + 1 >= this.page.totalPages) {
            this.finished = true;
          } else {
            this.page.number += 1;
          }
          this.loading = false;
        });
      }
    },
    onClickTabs(name, list) {
      this.tabsActive = name;
      this.loading = false;
      this.finished = false;
      this.page = {
        totalPages: 0,
        number: 0,
      };
      this.data = [];

      this.fetchList();
    },
    onLoad() {
      if (this.data.length > 9) {
        this.fetchList();
      }
    },
    onClick() {
      this.$router.push("Form");
    },
    onClickBtn() {
      this.$router.push("Form");
    },
    handleCuiBan(item, index) {
      if (this.isLoading) return;
      if (item.cbzt === "1"){
        dd.confirm({
          title: "提示",
          message: "已催办",
          buttonLabels: ["确认"],
        })
        return;
      }
      this.isLoading = !this.isLoading;
      dd.confirm({
        title: "提示",
        message: "是否催办？",
        buttonLabels: ["确认", "取消"],
      }).then((res) => {
        if (!res.buttonIndex) {
          cuiban(item.id).then((res) => {
            // dd.confirm({
            //   title: "hasLogin",
            //   message: JSON.stringify({ 1:  }),
            //   buttonLabels: ["ok", "cancel"],
            // });
            this.data[index].cbzt = "1";
            this.isLoading = !this.isLoading;
          });
        } else {
          this.isLoading = !this.isLoading;
        }
      });
    },
    onPre() {
      this.fetchList();
    },
    onToHome() {
      this.onClickTabs();
    },
    onNext() {
      this.fetchList();
    },
  },
};
</script>

<style scoped>
.list {
  width: 100%;
  height: 100vh;
  /* overflow-y: auto; */
}
.col-item {
  margin: 0 20px;
}

.quick-entrance-container {
  padding: 40px 20px;
}

.item-box {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  /* background-image: linear-gradient(to top, #a3bded 0%, #6991c7 100%); */
  background-image: linear-gradient(to top, #b5cfee 0%, #a3bded 100%);
  padding: 20px 0;
  border-radius: 15px;
}

.col-item-title {
  margin-top: 10px;
  font-size: 28px;
  color: white;
}
.task-title {
  border-top: 1px dashed #ccc;
  border-bottom: 1px dashed #ccc;
  padding: 5px 30px;
  font-size: 32px;
}

.right-box {
  display: flex;
  flex-flow: row nowrap;
}

.v-button {
  border-radius: 10px;
  padding: 5px 30px;
  margin-left: 10px;
  color: white;
  background-color: #ccc;
}

.home-content {
  position: relative;
  height: calc(100vh-300px);
}

.home-content > .footer-page {
  position: absolute;
  bottom: 100px;
  left: 0;
  width: 100%;
  height: 100px;
}

.data-list {
  height: calc(100vh-600px);
  overflow-y: scroll;
  padding-bottom: 80px;
}
/deep/ .title-right-line {
  position: relative;
}
/deep/ .title-right-line::after {
  display: block;
  content: "";
  width: 2px;
  height: 30px;
  background-color: #ccc;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
}
</style>
