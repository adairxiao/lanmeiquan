<template>
  <div class="home-content">
    <!-- <div class="head-container"></div> -->
    <div class="tabs-container">
      <!-- <el-tabs v-model="tabsActive" type="card" @tab-click="onClickTabs">
        <el-tab-pane
          :label="item"
          :name="item"
          v-for="item in ['待受理', '处理中', '全部', '待处理', '已处理']"
          :key="item"
        >
        </el-tab-pane>
      </el-tabs> -->
      <div class="box-left">
        <div class="logo">
          <div>定海公路最多一小时</div>
        </div>
        <div style="padding-bottom: 5px;">
          <el-radio-group
            v-model="tabsActive"
            @change="onClickTabs"
            fill="rgb(191, 206, 255)"
          >
            <el-radio-button
              :label="item"
              v-for="item in tabs"
              :key="item"
            ></el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div class="box-right" style="padding-bottom: 5px;">
        <el-button size="medium" @click="handleExprot" v-show="tabsActive==='全部'">导出</el-button>
        <el-button size="medium" @click="openDialog(null, '新增')" v-show="user.role === 'create'"
          >新增</el-button
        >
      </div>
    </div>

    <div class="table-content">
      <el-form
        ref="form"
        :model="filterForm"
        label-width="80px"
        inline
        v-show="tabsActive === '全部'"
      >
        <el-form-item label="任务类型">
          <el-select v-model="filterForm.rwlx" placeholder="请选择" clearable>
            <el-option
              v-for="item in taskCol"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="清单类型">
          <el-select v-model="filterForm.qdlx" placeholder="请选择" clearable>
            <el-option
              v-for="item in listCol"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="事件类型">
          <el-select v-model="filterForm.type" placeholder="请选择" clearable>
            <el-option
              v-for="item in eventTypeCol"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="事件来源">
          <el-select v-model="filterForm.datafrom" placeholder="请选择" clearable>
            <el-option
              v-for="item in eventDatafrom"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="" >
           <div style="display:flex;flex-flow:row nowarp;">
           <el-select v-model="filterForm.seltype" placeholder="请选择" clearable>
            <el-option
              v-for="item in [{name: '完成时间',value:'overTime'}, {name: '创建时间',value:'createTime'},{name: '派单时间',value:'acceptTime'}]"
              :key="item.name"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
            <el-date-picker
              v-model="filterForm.selfrom"
              type="date"
              placeholder="开始日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd">
            </el-date-picker>
            <el-date-picker
              v-model="filterForm.selto"
              type="date"
              placeholder="结束日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </div>
        </el-form-item>
        
         <el-form-item label="状态">

          <el-select v-model="filterForm.state" placeholder="请选择" clearable>
            <el-option
              v-for="item in [{name:'待受理',value:'0'}, {name:'处理中',value:'1'}, {name:'全部',value:''}]"
              :key="item.name"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="fetchList"
            >搜索</el-button
          >
        </el-form-item>
      </el-form>
      <el-table :data="data" border style="width: 100%" :height="tabsActive === '全部' ? '60vh':'85vh'" stripe>
        <!-- <el-table-column label="状态" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ {'0': '待处理','1':'处理中','2':'全部'}[scope.row.state] }}</span>
          </template>
        </el-table-column> -->
        <el-table-column prop="rwlx" label="任务类型" width="100">
        </el-table-column>
        <el-table-column prop="qdlx" label="清单类型" width="100">
        </el-table-column>
        <el-table-column prop="datafrom" label="事件来源" width="110">
        </el-table-column>
        <el-table-column prop="blbm" label="承办部门" min-width="180">
        </el-table-column>
         <el-table-column prop="acceptTime" label="派单时间" width="180">
        </el-table-column>
        <el-table-column prop="wcsx" label="完成时限" width="180">
        </el-table-column>
        <el-table-column prop="overTime" label="完成时间" width="180">
        </el-table-column>
        <el-table-column label="操作" width="170" align="center">
          <template slot-scope="scope">
            <el-button
              @click="
                openDialog(scope.row, tabsActive === '待处理' ? '处理' : '受理')
              "
              type="text"
              size="small"
              v-show="queryType === 0"
              >{{ tabsActive === "待处理" ? "处理" : "受理" }}</el-button
            >

            <el-button
              type="text"
              size="small"
              v-show="tabsActive === '处理中'"
              @click="handleCuiBan(scope.row)"
              >{{ scope.row.cbzt === "1" ? "已催办" : "催办" }}</el-button
            >

            <el-button
              circle
              size="medium"
              icon="el-icon-edit-outline"
              v-show="tabsActive === '处理中' || tabsActive === '全部'"
              @click="openDialog(scope.row, tabsActive)"
            ></el-button>
            <el-button
              @click="openDialog(scope.row, '查看详情')"
              circle
              size="medium"
              icon="el-icon-tickets"
              v-show="tabsActive === '处理中'"
            ></el-button>
            <el-button
              @click="openDialog(scope.row, '查看处理结果')"
              circle
              size="medium"
              icon="el-icon-tickets"
              v-show="tabsActive === '全部' || tabsActive === '已处理'"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-size="page.size"
          layout="total, prev, pager, next, jumper"
          :total="page.total"
        >
        </el-pagination>
      </div>
    </div>

    <!-- <div class="footer-page">
      <Page :page="page" @onPre="onPre" @onToHome="onToHome" @onNext="onNext" />
    </div> -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      :destroy-on-close="true"
    >
      <div class="dialog-container">
        <TaskForm
          @closeDialog="dialogVisible = false"
          v-if="currentEvent === '新增'"
        />

        <div v-if="currentEvent === '处理' || currentEvent === '受理'">
          <SolveTask
            :row="currentRow"
            :tab="tabsActive"
            @closeDialog="handleCloseDialog"
          />
        </div>
        <div
          v-else-if="
            currentEvent === '查看处理结果' || currentEvent === '查看详情'
          "
        >
          <TaskDetails :row="currentRow" />
        </div>

        <template
          v-else-if="currentEvent === '处理中' || currentEvent === '全部'"
        >
          <EditTask
            :row="currentRow"
            @closeDialog="handleCloseDialog"
            v-if="dialogVisible"
          />
        </template>
      </div>
    </el-dialog>

    <!-- <div style="padding:20px">{{res}}</div> -->
  </div>
</template>

<script>
import { Col as VanCol, Row as VanRow } from "vant";
import { Image as VanImage, Icon as VanIcon } from "vant";
import { Cell as VanCell, CellGroup as VanCellGroup } from "vant";
import { Tab as VanTab, Tabs as VanTabs } from "vant";
import { List as VanList } from "vant";
import TaskForm from "./taskForm.vue";
import TaskDetails from "./taskDetails.vue";
import SolveTask from "./solveTask.vue";
import EditTask from "./editTask.vue";
import { currentPage } from "@/util/buryingPoint";
import { mapState } from "vuex";
import {
  getEventList,
  getEventTodo,
  getEventDone,
  cuiban,
  exportFile,
  getQdlx,
  getRwlx,
  getSjlx,
  getSjly
} from "@/network/api/api";
const initFilterForm = () => ({
  qdlx: "",
  rwlx: "",
  type: "",
  datafrom: "",
  state: "",
  seltype: 'overTime',
  selfrom:'',
  selto:''
});
export default {
  data() {
    return {
      data: [],
      filterForm: initFilterForm(),
      tabsActive: "待受理",
      isLoading: false,
      dialogVisible: false,
      dialogTitle: "",
      page: {
        totalPages: 0,
        currentPage: 1,
        total: 0,
        size: 10,
      },
      timeID: "",
      currentRow: { id: "" },
      currentEvent: "",
      res: null,
      eventTypeCol:[],
      eventDatafrom:[],
      taskCol:[],
      listCol:[]
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
    TaskForm,
    TaskDetails,
    SolveTask,
    EditTask,
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
        case "全部":
          type = '';
          break;
      }
      return type;
    },
    tableData() {
      // dd.confirm({
      //   title: "data",
      //   message: JSON.stringify({ 1: this.data }),
      //   buttonLabels: ["ok", "cancel"],
      // });
      const list = this.data.map((item) => {});
      return this.data;
    },
    tabs(){
      return this.user.role === "create" ? ['待受理', '处理中', '全部', '待处理', '已处理'] :['待处理', '已处理']
    }
  },

  mounted() {
    // this.onClickTabs(0);
    this.data = [];
    this.tabsActive = this.user.role !== "create" ? "待处理" : "待受理";
    this.fetchList();
    currentPage(1, "首页", "/home");

    getSjlx().then((res) => {
      this.eventTypeCol = res.data.split(",");
      // dd.confirm({
      //   title: "data",
      //   message: JSON.stringify({ 1: this.eventTypeCol }),
      //   buttonLabels: ["ok", "cancel"],
      // });
    });
    getSjly().then((res) => {
      // dd.confirm({
      //   title: "data",
      //   message: JSON.stringify(res),
      //   buttonLabels: ["ok", "cancel"],
      // });
      this.eventDatafrom = res.data.split(",");
    });
    getRwlx().then((res) => {
      this.taskCol = res.data.split(",");
    });
    getQdlx().then((res) => {
      this.listCol = res.data.split(",");
    });
  },
  methods: {
    fetchList() {
      if (this.tabsActive === "待处理") {
        getEventTodo({
          page: this.page.currentPage -1,
        }).then((res) => {
          this.data = res.data.content;
          this.page = {
            totalPages: res.data.totalPages,
            currentPage: res.data.number+1,
            total: res.data.totalElements,
            size: res.data.size,
          };
        });
      } else if (this.tabsActive === "已处理") {
        getEventDone({
          page: this.page.currentPage-1,
        }).then((res) => {
          this.data = res.data.content;
          this.page = {
            totalPages: res.data.totalPages,
            currentPage: res.data.number+1,
            total: res.data.totalElements,
            size: res.data.size,
          };
        });
      } else {
           
        const query =  this.tabsActive === '全部' ?{
          ...this.filterForm,
          page: this.page.currentPage-1,
        }:{
          state: this.queryType,
          page: this.page.currentPage-1,
        }
       
        getEventList(query).then((res) => {
          this.data = res.data.content;
          this.page = {
            totalPages: res.data.totalPages,
            currentPage: res.data.number+1,
            total: res.data.totalElements,
            size: res.data.size,
          };
        });
      }
    },
    onClickTabs() {
      this.page = {
        totalPages: 0,
        currentPage: 1,
        total: 0,
        size: 10,
      };
      this.data = [];
      this.filterForm = initFilterForm();
      this.fetchList();
    },
    onClick() {
      this.$router.push("Form");
    },
    onClickBtn() {
      this.$router.push("Form");
    },
    handleCuiBan(row) {
      if (this.isLoading) return;
      if (row.cbzt === "1") return;
      this.isLoading = !this.isLoading;
      dd.confirm({
        title: "提示",
        message: "是否催办？",
        buttonLabels: ["确认", "取消"],
      }).then((res) => {
        if (!res.buttonIndex) {
          cuiban(row.id).then((res) => {
            // dd.confirm({
            //   title: "hasLogin",
            //   message: JSON.stringify({ 1: res }),
            //   buttonLabels: ["ok", "cancel"],
            // });
            this.fetchList();
            this.isLoading = !this.isLoading;
          });
        } else {
          this.isLoading = !this.isLoading;
        }
      });
    },
    openDialog(row, event) {
      this.currentEvent = event;
      if (event !== "新增") {
        this.currentRow = row;
        //   dd.confirm({
        //   title: "hasLogin",
        //   message: JSON.stringify({ 1: this.currentRow}),
        //   buttonLabels: ["ok", "cancel"],
        // });
      }
      this.dialogVisible = true;
    },
    handleCloseDialog() {
      this.dialogVisible = false;
      this.fetchList();
    },
    handleExprot() {
      const _this = this;

      exportFile(this.filterForm).then((res) => {
        // this.res=res.headers
        const {
          data,
          headers: { filename },
          headers,
        } = res;
        
        const blob = new Blob([data], { type: headers["content-type"] });
        // const fileName = "filename.xls";
        const elink = document.createElement("a");
        elink.download = filename;
        elink.style.display = "none";
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href); // 释放URL 对象
        document.body.removeChild(elink);
      });
    },
    handleCurrentChange(index) {
      this.page.currentPage = index;
      this.fetchList();
    },
    // handleSizeChange(size){
    //    this.page.size =size
    //    this.fetchList();
    // },
    handleDate(value){
        // dd.confirm({
        //   title: "handleDate",
        //   message: JSON.stringify({ 1: value}),
        //   buttonLabels: ["ok", "cancel"],
        // });
    }
  },
};
</script>

<style scoped>
.home-content {
  /* position: relative; */
  height: calc(100vh);
}

.head-container {
  width: 100%;
  height: 50px;
  background-color: rgb(3, 3, 119);
}

.tabs-container {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: flex-end;
  background-color: rgb(3, 3, 119);
}
.tabs-container > .box-left {
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-end;
}
.tabs-container > .box-left > .logo {
  width: 90px;
  height: 35px;
  /* line-height: 35px; */
  padding: 0 5px;
  font-weight: bold;
  font-size: 8px;
  font-family: initial;
  color: rgb(191, 206, 255);
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}
.box-right {
  margin-right: 5px;
}
.table-content {
  height: calc(100%-100px);
  padding: 10px;
  background-color: white;
}

.pagination-container {
  padding-right: 10px;
  text-align: right;
}

.dialog-container {
  width: 100%;
  height: 300px;
  overflow-x: scroll;
}

/* /deep/ .el-tabs__nav-scroll {
  background-color: rgb(3, 3, 119);
} */
/* /deep/ .el-tabs__nav {
  background-color: white;
} */
</style>

<style></style>
