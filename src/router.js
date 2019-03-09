import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

/**
 * (resolve) => require(['@/components/teacher/TeacherInfoCase.vue'], resolve) 这种方式有利于减轻项目第一次加载网页的负担
 */

const router = new Router({
  linkActiveClass: "active",
  scrollBehavior(to, from, savedPosition) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ x: 0, y: 1 });
      }, 0);
    });
  },
  // mode: 'history',
  routes: [
    // 重定向
    {
      path: "*",
      redirect: '/ketang'
    },
    //课程
    {
      path: "/ketang",
      name: "ketang",
      component: () => import("@/views/classroom/ClassRoom.vue")
    },
    //课程搜索结果
    {
      path: "/ketangjieguo",
      name: "ketangjieguo",
      component: () => import("@/views/classroom/SearchResult.vue")
    },
    //课程详情
    {
      path: "/ketangxiangqing",
      name: "ketangxiangqing",
      component: () => import("@/views/classroom/ClassRoomDetail.vue")
    },
    //课程所有评论
    {
      path: "/allketangpinglun",
      name: "allketangpinglun",
      component: () => import("@/views/classroom/AllPinglun.vue")
    },
    //课程付费
    {
      path: "/payclass",
      name: "payclass",
      component: () => import("@/views/classroom/Payclass.vue")
    },
    //放松区
    {
      path: "/fangsong",
      name: "fangsong",
      component: () => import("@/views/relax/Relax.vue")
    },
    // 曼陀罗
    {
      path: "/mtl_details",
      name: "mtl_details",
      component: () => import("@/views/relax/mantuoluo/MTL_details.vue")
    },
    {
      path: "/mtl_select",
      name: "mtl_select",
      component: () => import("@/views/relax/mantuoluo/MTL_select.vue")
    },
    {
      path: "/mywork",
      name: "mywork",
      component: () => import("@/views/relax/mantuoluo/myWork.vue")
    },
    {
      path: "/lookmywork",
      name: "lookmywork",
      component: () => import("@/views/relax/mantuoluo/lookmyWork.vue")
    },
    {
      path: "/jing",
      name: "jing",
      component: () => import("@/views/relax/mantuoluo/jing.vue")
    },
    {
      path: "/si",
      name: "si",
      component: () => import("@/views/relax/mantuoluo/si.vue")
    },
    {
      path: "/hua",
      name: "hua",
      component: () => import("@/views/relax/mantuoluo/hua.vue")
    },
    {
      path: "/write",
      name: "write",
      component: () => import("@/views/relax/mantuoluo/write.vue")
    },
    // 冥想屋
    {
      path: "/mxw_list",
      name: "mxw_list",
      component: () => import("@/views/relax/mingxiangwu/MXW_list.vue")
    },
    {
      path: "/mxw_player",
      name: "mxw_player",
      component: () => import("@/views/relax/mingxiangwu/MXW_player.vue")
    },
    // 弹个瓶
    {
      path: "/tgp_default",
      name: "tgp_default",
      component: () => import("@/views/relax/tangeping/TGP_default.vue")
    },
    {
      path: "/my_bottle",
      name: "my_bottle",
      component: () => import("@/views/relax/tangeping/My_bottle.vue")
    },
    {
      path: "/postmsg",
      name: "postmsg",
      component: () => import("@/views/relax/tangeping/postMsg.vue")
    },
    //专业测评
    {
      path: "/zhuanyeceping",
      name: "zhuanyeceping",
      component: () => import("@/views/appraisal/Appraisal.vue")
    },
    // 公共试题介绍页
    {
      path: "/publicIntroduction",
      name: "publicIntroduction",
      component: () => import("@/views/appraisal/PublicIntroduction.vue")
    },
    // 测试题
    {
      path: "/answer/:type",
      name: "answer",
      component: () => import("@/views/appraisal/Answer.vue")
    },
    // 测评结果
    {
      path: "/DetailAnswer",
      name: "DetailAnswer",
      component: () => import("@/views/appraisal/DetailAnswer.vue")
    },
    //登录之前
    {
      path: "/loginbeforesz",
      name: "loginbeforesz",
      component: () => import("@/views/login_reg/LoginBefore.vue")
    },
    //登录
    {
      path: "/loginsz",
      name: "loginsz",
      component: () => import("@/views/login_reg/Login.vue")
    },
    //忘记密码
    {
      path: "/forgetpwdsz",
      name: "forgetpwdsz",
      component: () => import("@/views/login_reg/ForgetPwd.vue")
    },
    //注册(选择角色)
    {
      path: "/registersz",
      name: "registersz",
      component: () => import("@/views/login_reg/Register.vue")
    },
    //注册（第一步验证）
    {
      path: "/register2sz",
      name: "register2sz",
      component: () => import("@/views/login_reg/Register2.vue")
    },
    //注册（第二步确定）
    {
      path: "/register3sz",
      name: "register3sz",
      component: () => import("@/views/login_reg/Register3.vue")
    },
    //成长中心
    {
      path: "/chengzhang",
      name: "chengzhang",
      component: () => import("@/views/growing/Growing.vue")
    },
    // 心情签到
    {
      path: "/reports",
      name: "reports",
      component: () => import("@/views/growing/selfMood/reports/Reports")
    },
    // 未来畅想
    {
      path: "/future/:id",
      name: "future",
      component: () => import("@/views/growing/selfMood/future/Future.vue")
    },
    // 写畅想
    {
      path: "/writeIdeal",
      name: "writeIdeal",
      component: () => import("@/views/growing/selfMood/future/writeIdeal.vue")
    },
    // 个人信息
    {
      path: "/userInfo",
      name: "userInfo",
      component: () => import("@/views/growing/UserInfo.vue")
    },
    // 成绩记录
    {
      path: "/resultsRecord",
      name: "resultsRecord",
      component: () => import("@/views/growing/resultsRecord/ResultsRecord")
    },
    // 查看编辑
    {
      path: "/writeResult",
      name: "writeResult",
      component: () => import("@/views/growing/resultsRecord/WriteResult")
    },
    // 历史课程
    {
      path: "/kc/:type",
      name: "kc",
      component: () => import("@/views/growing/kc/kc.vue")
    },
    // 自我评价
    {
      path: "/selfAssessment",
      name: "selfAssessment",
      component: () => import("@/views/growing/selfAssessment/SelfAssessment.vue")
    },
    // 评价公共页
    {
      path: "/assessment",
      name: "assessment",
      component: () => import("@/views/growing/selfAssessment/assessment.vue")
    },
    // 月目标月总结
    {
      path: "/monthlyGoals",
      name: "monthlyGoals",
      component: () => import("@/views/growing/monthlyGoals/MonthlyGoals.vue")
    },
    // 月目标月编辑
    {
      path: "/goals",
      name: "goals",
      component: () => import("@/views/growing/monthlyGoals/Goals.vue")
    },
    // 我的同班同学ClassMateDetail.vue
    {
      path: "/classmate",
      name: "classmate",
      component: () => import("@/views/growing/myClassmate/Classmate.vue")
    },
    //同班同学私信列表
    {
      path: "/classMateDetail",
      name: "classMateDetail",
      component: () => import("@/views/growing/myClassmate/ClassMateDetail.vue")
    },
    // 发消息页
    {
      path: "/connectStu",
      name: "connectStu",
      component: () => import("@/views/growing/myClassmate/connectStu.vue")
    },
    //问卷调查
    {
      path: "/questionnaire",
      name: "questionnaire",
      component: () => import("@/views/growing/questionnaire/Questionnaire.vue")
    },
    // 问卷调查答题页面
    {
      path: "/questionnaireAnswer",
      name: "questionnaireAnswer",
      component: () => import("@/views/growing/questionnaire/QuestionnaireAnswer.vue")
    },
    // 问卷调查答题页面
    {
      path: "/serviceCenter",
      name: "serviceCenter",
      component: () => import("@/views/growing/serviceCenter/ServiceCenter.vue")
    },
    // 常见问题
    {
      path: "/problem",
      name: "problem",
      component: () => import("@/views/growing/serviceCenter/Problem.vue")
    },
    // 意见反馈
    {
      path: "/feedback",
      name: "feedback",
      component: () => import("@/views/growing/serviceCenter/Feedback.vue")
    },
    // 学期目标
    {
      path: "/target",
      name: "target",
      component: () => import("@/views/growing/selfMood/targets.vue")
    },
    {
      path: "/lookTarget/:query",
      name: "lookTarget",
      component: () => import("@/views/growing/selfMood/lookTarget.vue")
    }
  ]
});

//  退出登录的时候需要删除session
//  全局导航守卫钩子
router.beforeEach((to, from, next) => {
  let isLogin = sessionStorage.token ? true : false; // 判断是否是登录状态 看sessionStorage有没有token
  switch (to.path) {
    case '/ketang':
    case '/ketangjieguo':
    case '/ketangxiangqing':
    case '/fangsong':
    case '/zhuanyeceping':
    case '/loginbeforesz':
    case '/loginsz':
    case '/forgetpwdsz':
    case '/registersz':
    case '/register2sz':
    case '/register3sz':
      next();
      break;
    default:
      isLogin ? next() : router.push('/loginbeforesz');
  }
});

export default router
