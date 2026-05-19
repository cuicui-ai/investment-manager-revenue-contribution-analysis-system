<script setup lang="ts">
import { ref, computed } from 'vue';
import { 
  BarChart3, Wallet, Activity, FileText, TrendingUp, LineChart, Package, 
  AlertCircle, X, ChevronLeft, ArrowRight, Search, Plus, FileUp, FileDown, Download
} from 'lucide-vue-next';
import ProductCard from './components/ProductCard.vue';
import TabButton from './components/TabButton.vue';

// --- 数据定义 ---

const TIAN_TIAN_YING_DATA = [
  { manager: '初金霞', totalPrincipal: 11071973304, holdingPrincipal: 10518374639, accumulatedReturn: 24364556.06, returnRate: '0.20%', annualized: '2.02%', preFee: '1.99%', postFee: '1.62%' },
  { manager: '李炜菁', totalPrincipal: 5659594568, holdingPrincipal: 5376614840, accumulatedReturn: 8389195.496, returnRate: '0.19%', annualized: '2.03%', preFee: '1.99%', postFee: '1.62%' },
  { manager: '茹昊', totalPrincipal: 5263175067, holdingPrincipal: 5000016314, accumulatedReturn: 8901890.646, returnRate: '0.19%', annualized: '1.96%', preFee: '1.93%', postFee: '1.56%' },
  { manager: '陈英华', totalPrincipal: 3157894737, holdingPrincipal: 3000000000, accumulatedReturn: 4802636.809, returnRate: '0.16%', annualized: '2.07%', preFee: '2.04%', postFee: '1.67%' }
];

const ATTRIBUTION_DATA = [
  {
    manager: '初金霞',
    summaries: {
      accGain: 24364556.06,
      maxDays: 35,
      accWeighted: 4357404360,
      accReturnRate: '0.1925%',
      annualized: '2.0261%',
      preFee: '1.9948%',
      postFee: '1.6248%'
    },
    items: [
      { buyDate: '20260408', endDate: '20260507', days: 30, totalPrincipal: 600210526.3, holdingPrincipal: 570200000, gain: 120807.4825, weighted: 462324324.3 },
      { buyDate: '20260409', endDate: '20260507', days: 29, totalPrincipal: 1189473.684, holdingPrincipal: 1130000, gain: 1648.665474, weighted: 885675.6757 },
      { buyDate: '20260413', endDate: '20260414', days: 2, totalPrincipal: 231578947.4, holdingPrincipal: 220000000, gain: 344622.97, weighted: 11891891.89 },
      { buyDate: '20260413', endDate: '20260430', days: 17, totalPrincipal: 17557894.74, holdingPrincipal: 16680000, gain: 14054.14811, weighted: 8114594.595 },
      { buyDate: '20260414', endDate: '20260507', days: 23, totalPrincipal: 577178947.4, holdingPrincipal: 548320000, gain: 594626.0491, weighted: 355667027 },
      { buyDate: '20260416', endDate: '20260507', days: 21, totalPrincipal: 305378947.4, holdingPrincipal: 290110000, gain: 288698.2233, weighted: 172497837.8 }
    ]
  },
  {
    manager: '李炜菁',
    summaries: {
      accGain: 8389195.496,
      maxDays: 35,
      accWeighted: 4357404360,
      accReturnRate: '0.1925%',
      annualized: '2.0261%',
      preFee: '1.9948%',
      postFee: '1.6248%'
    },
    items: [
      { buyDate: '20260403', endDate: '20260408', days: 5, totalPrincipal: 548918989.9, holdingPrincipal: 521473040.4, gain: 102777.9992, weighted: 89395378.35 },
      { buyDate: '20260403', endDate: '20260414', days: 11, totalPrincipal: 316684032.6, holdingPrincipal: 300049831, gain: 129794.9995, weighted: 103148513.5 },
      { buyDate: '20260403', endDate: '20260416', days: 13, totalPrincipal: 163620083.5, holdingPrincipal: 155439079.4, gain: 79160.04975, weighted: 62175631.74 }
    ]
  },
  {
    manager: '茹昊',
    summaries: {
      accGain: 8901890.646,
      maxDays: 36,
      accWeighted: 4649881454,
      accReturnRate: '0.1914%',
      annualized: '1.9581%',
      preFee: '1.9302%',
      postFee: '1.5602%'
    },
    items: [
      { buyDate: '20260403', endDate: '20260507', days: 34, totalPrincipal: 400004226.9, holdingPrincipal: 380004015.5, gain: 14233.982, weighted: 369448348.4 }
    ]
  },
  {
    manager: '陈英华',
    summaries: {
      accGain: 4802636.809,
      maxDays: 29,
      accWeighted: 2948275862,
      accReturnRate: '0.1629%',
      annualized: '2.0697%',
      preFee: '2.0362%',
      postFee: '1.6662%'
    },
    items: [
      { buyDate: '20260409', endDate: '20260507', days: 28, totalPrincipal: 1578947368, holdingPrincipal: 1500000000, gain: 2459118.414, weighted: 1500000000 },
      { buyDate: '20260410', endDate: '20260507', days: 27, totalPrincipal: 1578947368, holdingPrincipal: 1500000000, gain: 2343518.395, weighted: 1448275862 }
    ]
  }
];

const TRANSACTION_DATA = [
  { date: '2026-05-06', direction: '申购', security: '陕国投·鑫和15号证券投资集合资金信托计划', amount: 141440000.00, manager: '孙绍雪' },
  { date: '2026-04-30', direction: '申购', security: '中铁信托-锦信34号集合资金信托计划', amount: 110000000.00, manager: '许伟' },
  { date: '2026-04-30', direction: '申购', security: '华润信托·光银星河13号集合资金信托计划', amount: 65000000.00, manager: '许伟' },
  { date: '2026-04-29', direction: '申购', security: '陕国投·鑫和15号证券投资集合资金信托计划', amount: 28430000.00, manager: '孙绍雪' },
  { date: '2026-04-28', direction: '申购', security: '中信信托和耀3号证券投资信托计划', amount: 175000000.00, manager: '许伟' },
  { date: '2026-04-27', direction: '申购', security: '华润信托·光银星河13号集合资金信托计划', amount: 20000000.00, manager: '许伟' },
  { date: '2026-04-24', direction: '申购', security: '江苏信托-宁聚4号集合资金信托计划', amount: 1000000000.00, manager: '初金霞' },
];

const PRODUCT_NET_VALUE_LIST = [
  { name: '东方汇智-光大银行-博普量化2号集合资产管理计划', date: '2026-05-18', value: 1.2401 },
  { name: '中信保诚资管诚远19号资产管理产品', date: '2026-05-18', value: 1.0027 },
  { name: '中信信托和耀1号证券投资信托计划', date: '2026-05-18', value: 1.0080 },
  { name: '中信信托和耀2号证券投资信托计划', date: '2026-05-18', value: 1.0016 },
  { name: '中信信托和耀3号证券投资信托计划', date: '2026-05-18', value: 1.0006 },
  { name: '中信信托和耀4号证券投资信托计划', date: '2026-05-18', value: 1.0016 },
  { name: '中信信托和耀6号证券投资信托计划', date: '2026-05-18', value: 1.0029 },
];

const MISSING_NET_VALUE_LIST = [
  { name: '华夏中短债债券A', remark: '缺失净值，查看缺失日期' },
  { name: '汇添富丰润中短债E', remark: '缺失净值，查看缺失日期' },
  { name: '景顺长城中短债债券F类', remark: '缺失净值，查看缺失日期' },
  { name: '汇添富投资级信用债指数A', remark: '缺失净值，查看缺失日期' },
];

const MONEY_MARKET_MAINTENANCE_DATA = [
  { name: '大家资产稳健智选8号固定收益类资产管理产品', amount: 260000000.00, marketValue: 260000000.00, gain: 10675.60 },
  { name: '泰康资产纯泰货币12号资产管理产品', amount: 120000000.00, marketValue: 120000000.00, gain: 5046.00 },
];

const PRODUCT_TYPE_DATA = [
  { code: 'CR0078', name: '大家资产稳健智选8号固定收益类资产管理产品', type: '货币型', dataType: '万份收益' },
  { code: 'CR0059', name: '太平资产吉祥2号', type: '货币型', dataType: '' },
  { code: 'LBB2206070001', name: '泰康资产纯泰货币12号资产管理产品', type: '货币型', dataType: '七日年化收益率' },
  { code: '970034', name: '中国人保资产中短期配置43号资产管理产品', type: '净值型', dataType: '' },
  { code: 'ZTYS16', name: '中铁信托-云升16号集合资金信托计划', type: '净值型', dataType: '' },
  { code: 'ZTYS01', name: '中铁信托-云升1号集合资金信托计划', type: '净值型', dataType: '' },
  { code: 'ZTJX33', name: '中铁信托-锦信33号集合资金信托计划', type: '净值型', dataType: '' },
];

// --- 状态 ---

const startDate = ref('2026-04-01');
const endDate = ref('2026-05-09');

const handleStartDateChange = (e: Event) => {
  const newDate = (e.target as HTMLInputElement).value;
  if (newDate > endDate.value) {
    // 如果开始日期晚于结束日期，将结束日期设为开始日期的后一天
    const d = new Date(newDate);
    d.setDate(d.getDate() + 1);
    endDate.value = d.toISOString().split('T')[0];
  }
};

const handleEndDateChange = (e: Event) => {
  const newDate = (e.target as HTMLInputElement).value;
  if (newDate < startDate.value) {
    // 如果结束日期早于开始日期，重置为开始日期的后一天
    const d = new Date(startDate.value);
    d.setDate(d.getDate() + 1);
    endDate.value = d.toISOString().split('T')[0];
    alert('结束日期不能早于开始日期');
  }
};

const currentView = ref<'selection' | 'detail'>('selection');
const selectedProduct = ref<string | null>(null);
const activeTab = ref<'summary' | 'attribution' | 'transactions' | 'net-value' | 'money-market'>('summary');
const sortConfig = ref<{ key: string; direction: 'asc' | 'desc' } | null>(null);
const netValueSubTab = ref<'value' | 'missing'>('value');
const showNetValueAlert = ref(true);
const editingProductType = ref<any | null>(null);
const showMissingDatesModal = ref(false);
const selectedMissingProduct = ref<string | null>(null);
const missingDates = ref<string[]>([]);

const txType = ref('申购');
const txStartDate = ref('');
const txEndDate = ref('');
const txPlanName = ref('');
const txManager = ref('');

const handleProductClick = (productName: string) => {
  selectedProduct.value = productName;
  currentView.value = 'detail';
  activeTab.value = 'summary';
};

const handleBack = () => {
  currentView.value = 'selection';
  selectedProduct.value = null;
};

const handleViewMissingDates = (productName: string) => {
  selectedMissingProduct.value = productName;
  // 模拟一些缺失日期
  missingDates.value = [
    '2026-05-15',
    '2026-05-14',
    '2026-05-13',
    '2026-05-12',
    '2026-05-11',
    '2026-05-08',
    '2026-05-07',
    '2026-05-06',
    '2026-05-05',
    '2026-05-04'
  ];
  showMissingDatesModal.value = true;
};
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 font-sans">
    <header class="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div :class="[currentView === 'selection' ? 'max-w-7xl mx-auto' : 'w-full', 'px-6 h-14 flex items-center justify-between']">
        <div class="flex items-center gap-3">
          <div class="bg-brand-primary p-1.5 rounded-lg shadow-lg shadow-brand-primary/20">
            <BarChart3 class="w-5 h-5 text-white" />
          </div>
          <h1 class="text-lg font-bold tracking-tight text-slate-800">
            投资经理收益贡献分析系统
          </h1>
        </div>
        <div class="flex items-center gap-4">
          <button class="flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg border border-slate-200 transition-all text-xs font-semibold">
            <FileText class="w-3.5 h-3.5" />
            导出报表
          </button>
          <button
            v-if="currentView === 'detail'"
            @click="handleBack"
            class="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-brand-primary transition-colors pr-2"
          >
            <ChevronLeft class="w-4 h-4" />
            返回前页
          </button>
        </div>
      </div>
    </header>

    <main :class="[currentView === 'selection' ? 'max-w-7xl mx-auto' : 'w-full', 'px-4 py-8']">
      <Transition name="fade" mode="out-in">
        <div
          v-if="currentView === 'selection'"
          key="selection"
          class="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto"
        >
          <ProductCard
            id="ygjfl"
            name="阳光金丰利617期"
            description="投资经理累计收益及达成率分析"
            icon-color="text-brand-primary"
            hover-border="hover:border-brand-primary/30"
            @click="handleProductClick('阳光金丰利617期')"
          >
            <template #icon><BarChart3 class="w-6 h-6" /></template>
          </ProductCard>
          <ProductCard
            id="tty43"
            name="天天盈43号"
            description="投资经理费前费后年华收益率分析"
            icon-color="text-brand-secondary"
            hover-border="hover:border-brand-secondary/30"
            @click="handleProductClick('天天盈43号')"
          >
            <template #icon><Wallet class="w-6 h-6" /></template>
          </ProductCard>
        </div>

        <div
          v-else
          key="detail"
          class="flex flex-col gap-6"
        >
          <div class="bg-white px-6 py-4 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-2 relative z-10">
              <div class="flex items-center gap-4">
                <div class="bg-slate-100 px-2 py-0.5 rounded text-[9px] font-bold text-slate-500">
                  核心绩效分析模块
                </div>
                <div class="h-4 w-px bg-slate-200" />
                <h2 class="text-xl font-bold text-slate-900 tracking-tight">{{ selectedProduct }}</h2>
                <div class="h-4 w-px bg-slate-200" />
                <div class="flex items-center gap-2 text-slate-500 font-medium text-xs">
                  <span>分析区间:</span>
                  <div class="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-md border border-slate-200">
                    <input 
                      type="date" 
                      v-model="startDate" 
                      @change="handleStartDateChange"
                      class="bg-transparent border-none focus:ring-0 cursor-pointer font-bold text-slate-700 outline-none"
                    />
                    <span class="text-slate-300">至</span>
                    <input 
                      type="date" 
                      v-model="endDate" 
                      @change="handleEndDateChange"
                      class="bg-transparent border-none focus:ring-0 cursor-pointer font-bold text-slate-700 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="selectedProduct === '天天盈43号'" class="flex flex-col lg:flex-row gap-6">
            <aside class="lg:w-48 flex flex-col gap-1">
              <TabButton 
                :active="activeTab === 'summary'" 
                @click="activeTab = 'summary'"
                label="业绩看板"
              >
                <template #icon><Activity class="w-4 h-4" /></template>
              </TabButton>
              <TabButton 
                :active="activeTab === 'attribution'" 
                @click="activeTab = 'attribution'"
                label="归因明细"
              >
                <template #icon><FileText class="w-4 h-4" /></template>
              </TabButton>
              <TabButton 
                :active="activeTab === 'transactions'" 
                @click="activeTab = 'transactions'"
                label="交易流水"
              >
                <template #icon><TrendingUp class="w-4 h-4" /></template>
              </TabButton>
              <TabButton 
                :active="activeTab === 'net-value'" 
                @click="activeTab = 'net-value'"
                label="产品净值"
              >
                <template #icon><LineChart class="w-4 h-4" /></template>
              </TabButton>
              <TabButton 
                :active="activeTab === 'money-market'" 
                @click="activeTab = 'money-market'"
                label="货币产品收益维护"
              >
                <template #icon><Package class="w-4 h-4" /></template>
              </TabButton>
            </aside>

            <div class="flex-1">
              <Transition name="slide-fade" mode="out-in">
                <div 
                  v-if="activeTab === 'summary'"
                  key="summary"
                  class="space-y-6"
                >
                  <Transition name="fade">
                    <div 
                      v-if="showNetValueAlert"
                      class="bg-[#C91F1F] text-white px-6 py-2.5 rounded flex items-center justify-between"
                    >
                      <div class="flex items-center gap-3 text-[13px] font-bold">
                        <AlertCircle class="w-4 h-4" />
                        <span>净值缺失提醒： 20 只产品缺少净值数据</span>
                      </div>
                      <button @click="showNetValueAlert = false"><X class="w-4 h-4" /></button>
                    </div>
                  </Transition>

                  <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div class="overflow-x-auto">
                      <table class="w-full text-left border-collapse">
                        <thead class="bg-[#F2EDF7] border-b border-slate-200 text-[11px] font-bold text-[#6D1786]">
                          <tr>
                            <th class="px-6 py-3.5">投资经理</th>
                            <th class="px-6 py-3.5 text-right">总本金（元）</th>
                            <th class="px-6 py-3.5 text-right">持仓本金（元）</th>
                            <th class="px-6 py-3.5 text-right">累计收益（元）</th>
                            <th class="px-6 py-3.5 text-right">累计收益率</th>
                            <th class="px-6 py-3.5 text-right">年化收益率</th>
                            <th class="px-6 py-3.5 text-right">费前年化率</th>
                            <th class="px-6 py-3.5 text-right">费后年化率</th>
                          </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 text-[13px]">
                          <tr v-for="(item, index) in TIAN_TIAN_YING_DATA" :key="index">
                            <td class="px-6 py-4 font-medium">{{ item.manager }}</td>
                            <td class="px-6 py-4 text-right font-mono">{{ item.totalPrincipal.toLocaleString() }}</td>
                            <td class="px-6 py-4 text-right font-mono">{{ item.holdingPrincipal.toLocaleString() }}</td>
                            <td class="px-6 py-4 text-right font-mono text-red-600 font-semibold">{{ item.accumulatedReturn.toLocaleString() }}</td>
                            <td class="px-6 py-4 text-right text-red-600">{{ item.returnRate }}</td>
                            <td class="px-6 py-4 text-right text-red-600">{{ item.annualized }}</td>
                            <td class="px-6 py-4 text-right text-red-600">{{ item.preFee }}</td>
                            <td class="px-6 py-4 text-right text-red-600">{{ item.postFee }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div v-else-if="activeTab === 'attribution'" key="attr" class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse text-[10px]">
                      <thead class="bg-[#F2EDF7] border-b border-slate-200 text-[#6D1786] font-bold">
                        <tr>
                          <th class="px-2 py-3 border-r border-slate-200">投资经理</th>
                          <th class="px-2 py-3 border-r border-slate-200">买入日期</th>
                          <th class="px-2 py-3 border-r border-slate-200">结束日期</th>
                          <th class="px-2 py-3 border-r border-slate-200">持有时间(天)</th>
                          <th class="px-2 py-3 border-r border-slate-200">总本金(元)</th>
                          <th class="px-2 py-3 border-r border-slate-200">持仓本金(元)</th>
                          <th class="px-2 py-3 border-r border-slate-200">收益(元)</th>
                          <th class="px-2 py-3 border-r border-slate-200">按持有期加权本金</th>
                          <th class="px-2 py-3 border-r border-slate-200">累计收益(元)</th>
                          <th class="px-2 py-3 border-r border-slate-200 text-center">最大持有时间(天)</th>
                          <th class="px-2 py-3 border-r border-slate-200">累计按持有期加权本金</th>
                          <th class="px-2 py-3 border-r border-slate-200">累计收益率</th>
                          <th class="px-2 py-3 border-r border-slate-200 text-center">年化收益率</th>
                          <th class="px-2 py-3 border-r border-slate-200">对应费前年华收益率</th>
                          <th class="px-2 py-3">对应费后年华收益率</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-slate-100">
                        <template v-for="(group, gIdx) in ATTRIBUTION_DATA" :key="gIdx">
                          <tr v-for="(item, iIdx) in group.items" :key="iIdx" class="hover:bg-slate-50/50 transition-colors">
                            <td v-if="iIdx === 0" :rowspan="group.items.length" class="px-2 py-4 font-bold text-slate-800 border-r border-slate-200 bg-slate-50/30">
                              {{ group.manager }}
                            </td>
                            <td class="px-2 py-4 text-slate-600 border-r border-slate-100">{{ item.buyDate }}</td>
                            <td class="px-2 py-4 text-slate-600 border-r border-slate-100">{{ item.endDate }}</td>
                            <td class="px-2 py-4 text-center text-slate-600 border-r border-slate-100">{{ item.days }}</td>
                            <td class="px-2 py-4 text-right font-mono text-slate-700 border-r border-slate-100">{{ item.totalPrincipal.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 }) }}</td>
                            <td class="px-2 py-4 text-right font-mono text-slate-700 border-r border-slate-100">{{ item.holdingPrincipal.toLocaleString() }}</td>
                            <td class="px-2 py-4 text-right font-mono text-red-600 border-r border-slate-100">{{ item.gain.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 }) }}</td>
                            <td class="px-2 py-4 text-right font-mono text-slate-700 border-r border-slate-100">{{ item.weighted.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 4 }) }}</td>
                            
                            <td v-if="iIdx === 0" :rowspan="group.items.length" class="px-2 py-4 text-right font-mono text-red-600 border-r border-slate-200">
                              {{ group.summaries.accGain.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 }) }}
                            </td>
                            <td v-if="iIdx === 0" :rowspan="group.items.length" class="px-2 py-4 text-center text-slate-600 border-r border-slate-200">
                              {{ group.summaries.maxDays }}
                            </td>
                            <td v-if="iIdx === 0" :rowspan="group.items.length" class="px-2 py-4 text-right font-mono text-slate-700 border-r border-slate-200">
                              {{ group.summaries.accWeighted.toLocaleString() }}
                            </td>
                            <td v-if="iIdx === 0" :rowspan="group.items.length" class="px-2 py-4 text-right text-red-600 border-r border-slate-200">
                              {{ group.summaries.accReturnRate }}
                            </td>
                            <td v-if="iIdx === 0" :rowspan="group.items.length" class="px-2 py-4 text-center text-red-600 border-r border-slate-200">
                              {{ group.summaries.annualized }}
                            </td>
                            <td v-if="iIdx === 0" :rowspan="group.items.length" class="px-2 py-4 text-right text-red-600 border-r border-slate-200">
                              {{ group.summaries.preFee }}
                            </td>
                            <td v-if="iIdx === 0" :rowspan="group.items.length" class="px-2 py-4 text-right text-red-600">
                              {{ group.summaries.postFee }}
                            </td>
                          </tr>
                        </template>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div v-else-if="activeTab === 'transactions'" key="tx" class="flex flex-col gap-4">
                  <!-- Tabs for Type -->
                  <div class="flex items-center justify-between border-b border-slate-200">
                    <div class="flex">
                      <button 
                        @click="txType = '申购'" 
                        :class="['px-6 py-2 text-sm font-bold transition-all border-b-2', txType === '申购' ? 'border-[#6D1786] text-[#6D1786]' : 'border-transparent text-slate-500 hover:text-slate-700']"
                      >
                        申购
                      </button>
                      <button 
                        @click="txType = '赎回'" 
                        :class="['px-6 py-2 text-sm font-bold transition-all border-b-2', txType === '赎回' ? 'border-[#6D1786] text-[#6D1786]' : 'border-transparent text-slate-500 hover:text-slate-700']"
                      >
                        赎回
                      </button>
                    </div>
                    
                    <div class="mb-2">
                      <button class="bg-[#EAB308] text-white px-4 py-1.5 rounded hover:bg-yellow-600 flex items-center gap-1 font-bold text-xs">
                        <FileUp class="w-3.5 h-3.5" /> 导入
                      </button>
                    </div>
                  </div>

                  <!-- Table -->
                  <div class="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <table class="w-full text-left border-collapse text-[13px]">
                      <thead class="bg-[#F2EDF7] text-[#6D1786] font-bold border-b border-slate-200">
                        <tr>
                          <th class="px-4 py-3 w-10 text-center"><input type="checkbox" class="rounded border-slate-300 text-[#6D1786] focus:ring-[#6D1786]" /></th>
                          <th class="px-4 py-3 border-r border-slate-100">业务日期</th>
                          <th class="px-4 py-3 border-r border-slate-100">业务类型</th>
                          <th class="px-4 py-3 border-r border-slate-100">投放资管计划名称</th>
                          <th class="px-4 py-3 text-right border-r border-slate-100">金额 (元)</th>
                          <th class="px-4 py-3">投资经理</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-slate-100">
                        <tr v-for="(t, i) in TRANSACTION_DATA" :key="i" class="hover:bg-slate-50/50 transition-colors">
                          <td class="px-4 py-3 text-center"><input type="checkbox" class="rounded border-slate-300 text-[#6D1786] focus:ring-[#6D1786]" /></td>
                          <td class="px-4 py-4 text-slate-600 font-medium">{{ t.date }}</td>
                          <td class="px-4 py-4 text-slate-600">{{ t.direction }}</td>
                          <td class="px-4 py-4 font-bold text-slate-800">{{ t.security }}</td>
                          <td class="px-4 py-4 text-right font-mono text-slate-700">{{ t.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</td>
                          <td class="px-4 py-4 text-slate-600">{{ t.manager }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div v-else-if="activeTab === 'net-value'" key="nv" class="flex flex-col gap-4">
                  <div class="flex border-b border-slate-200">
                    <button 
                      @click="netValueSubTab = 'value'" 
                      :class="['px-6 py-2 text-sm font-bold transition-all border-b-2', netValueSubTab === 'value' ? 'border-[#6D1786] text-[#6D1786]' : 'border-transparent text-slate-500 hover:text-slate-700']"
                    >
                      产品净值
                    </button>
                    <button 
                      @click="netValueSubTab = 'missing'" 
                      :class="['px-6 py-2 text-sm font-bold transition-all border-b-2', netValueSubTab === 'missing' ? 'border-[#6D1786] text-[#6D1786]' : 'border-transparent text-slate-500 hover:text-slate-700']"
                    >
                      缺失净值
                    </button>
                  </div>

                  <div v-if="netValueSubTab === 'value'" class="space-y-4">
                    <!-- Filter Area -->
                    <div class="bg-white p-4 rounded-xl border border-slate-200 flex flex-wrap items-center gap-4 text-xs font-medium">
                      <div class="flex items-center gap-2">
                        <span class="text-slate-500">资管计划名称:</span>
                        <input 
                          type="text" 
                          placeholder="请输入资管计划名称" 
                          class="bg-white border border-slate-200 rounded px-3 py-1.5 w-48 outline-none focus:ring-1 focus:ring-[#6D1786]/20" 
                        />
                      </div>
                      <button class="bg-white border border-slate-200 text-slate-600 px-4 py-1.5 rounded hover:bg-slate-50 flex items-center gap-1 font-bold">
                        <Search class="w-3.5 h-3.5" /> 搜索
                      </button>

                      <div class="flex items-center gap-2 ml-auto">
                        <button class="bg-[#6D1786] text-white px-4 py-1.5 rounded hover:bg-[#5a136f] flex items-center gap-1 font-bold">
                          <Plus class="w-3.5 h-3.5" /> 新增
                        </button>
                        <button class="bg-[#EAB308] text-white px-4 py-1.5 rounded hover:bg-yellow-600 flex items-center gap-1 font-bold">
                          <FileUp class="w-3.5 h-3.5" /> 导入
                        </button>
                      </div>
                    </div>

                    <div class="flex">
                      <button class="bg-[#6D1786] text-white px-3 py-1.5 rounded text-[10px] font-bold hover:bg-[#5a136f] flex items-center gap-1 shrink-0">
                        <Download class="w-3 h-3" /> 下载模板
                      </button>
                    </div>

                    <div class="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                      <table class="w-full text-left border-collapse text-[13px]">
                        <thead class="bg-[#F2EDF7] text-[#6D1786] font-bold border-b border-slate-200">
                          <tr>
                            <th class="px-4 py-3 w-10 text-center"><input type="checkbox" class="rounded border-slate-300 text-[#6D1786] focus:ring-[#6D1786]" /></th>
                            <th class="px-4 py-3 border-r border-slate-100">资管计划产品名称</th>
                            <th class="px-4 py-3 border-r border-slate-100">最新净值日期</th>
                            <th class="px-4 py-3 text-right">最新净值</th>
                          </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                          <tr v-for="(p, i) in PRODUCT_NET_VALUE_LIST" :key="i" class="hover:bg-slate-50/50 transition-colors">
                            <td class="px-4 py-3 text-center"><input type="checkbox" class="rounded border-slate-300 text-[#6D1786] focus:ring-[#6D1786]" /></td>
                            <td class="px-4 py-3 text-slate-700">{{ p.name }}</td>
                            <td class="px-4 py-3 text-slate-600">{{ p.date }}</td>
                            <td class="px-4 py-3 text-right font-mono text-slate-800">{{ p.value.toFixed(4) }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div v-else-if="netValueSubTab === 'missing'" class="space-y-4">
                    <!-- Filter Area -->
                    <div class="bg-white p-4 rounded-xl border border-slate-200 flex flex-wrap items-center gap-4 text-xs font-medium">
                      <div class="flex items-center gap-2">
                        <span class="text-slate-500">资管计划名称:</span>
                        <input 
                          type="text" 
                          placeholder="请输入资管计划名称" 
                          class="bg-white border border-slate-200 rounded px-3 py-1.5 w-48 outline-none focus:ring-1 focus:ring-[#6D1786]/20" 
                        />
                      </div>
                      <button class="bg-white border border-slate-200 text-slate-600 px-4 py-1.5 rounded hover:bg-slate-50 flex items-center gap-1 font-bold">
                        <Search class="w-3.5 h-3.5" /> 搜索
                      </button>

                      <div class="flex items-center gap-2 ml-auto">
                        <button class="bg-[#EAB308] text-white px-4 py-1.5 rounded hover:bg-yellow-600 flex items-center gap-1 font-bold">
                          <FileUp class="w-3.5 h-3.5" /> 批量导入
                        </button>
                      </div>
                    </div>

                    <div class="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                      <table class="w-full text-left border-collapse text-[13px]">
                        <thead class="bg-[#F2EDF7] text-[#6D1786] font-bold border-b border-slate-200">
                          <tr>
                            <th class="px-4 py-3 w-10 text-center"><input type="checkbox" class="rounded border-slate-300 text-[#6D1786] focus:ring-[#6D1786]" /></th>
                            <th class="px-4 py-3 border-r border-slate-100">资管计划产品名称</th>
                            <th class="px-4 py-3 text-left">备注</th>
                          </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                          <tr v-for="(p, i) in MISSING_NET_VALUE_LIST" :key="i" class="hover:bg-slate-50/50 transition-colors">
                            <td class="px-4 py-3 text-center"><input type="checkbox" class="rounded border-slate-300 text-[#6D1786] focus:ring-[#6D1786]" /></td>
                            <td class="px-4 py-3 text-slate-700">{{ p.name }}</td>
                            <td class="px-4 py-3 text-red-600 cursor-pointer hover:underline" @click="handleViewMissingDates(p.name)">{{ p.remark }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div v-else-if="activeTab === 'money-market'" key="mm" class="flex flex-col gap-4">
                  <!-- Money Market Maintenance Section -->
                  <div class="flex items-center justify-between">
                    <h3 class="text-lg font-bold text-slate-800">货币产品收益维护</h3>
                    <div class="flex items-center gap-2 bg-purple-50 px-3 py-1.5 rounded-lg border border-purple-100">
                      <FileText class="w-4 h-4 text-[#6D1786]" />
                      <span class="text-xs font-bold text-[#6D1786]">估值表日期：2026-05-19</span>
                    </div>
                  </div>

                  <div class="bg-white p-4 rounded-xl border border-slate-200 flex flex-wrap items-center gap-4 text-xs font-medium">
                    <div class="flex items-center gap-2 ml-auto">
                      <button class="bg-[#6D1786] text-white px-4 py-1.5 rounded hover:bg-[#5a136f] flex items-center gap-1 font-bold">
                        <FileUp class="w-3.5 h-3.5" /> 导入最新产品估值表
                      </button>
                    </div>
                  </div>

                  <div class="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <table class="w-full text-left border-collapse text-[13px]">
                      <thead class="bg-[#F2EDF7] text-[#6D1786] font-bold border-b border-slate-200">
                        <tr>
                          <th class="px-4 py-3 border-r border-slate-100">货币产品名称</th>
                          <th class="px-4 py-3 text-right border-r border-slate-100">持有数量</th>
                          <th class="px-4 py-3 text-right border-r border-slate-100">市值 (元)</th>
                          <th class="px-4 py-3 text-right">收益 (元)</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-slate-100 text-slate-700">
                        <tr v-for="(p, i) in MONEY_MARKET_MAINTENANCE_DATA" :key="i" class="hover:bg-slate-50/50 transition-colors">
                          <td class="px-4 py-3 font-medium">{{ p.name }}</td>
                          <td class="px-4 py-3 text-right font-mono">{{ p.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</td>
                          <td class="px-4 py-3 text-right font-mono">{{ p.marketValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</td>
                          <td class="px-4 py-3 text-right font-mono text-red-600">{{ p.gain.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </Transition>
            </div>

          </div>

          <div v-else class="bg-white p-20 rounded-3xl border border-dashed text-center">
            <Activity class="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 class="text-2xl font-bold mb-2">{{ selectedProduct }}</h3>
            <p class="text-slate-400">模块开发中...</p>
            <button @click="handleBack" class="mt-8 px-8 py-3 bg-purple-600 text-white rounded-lg text-sm font-bold">返回列表</button>
          </div>
        </div>
      </Transition>
    </main>

    <Transition name="fade">
      <div v-if="showMissingDatesModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
        <div class="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300">
          <div class="bg-[#F2EDF7] px-6 py-4 flex items-center justify-between">
            <div class="flex items-center gap-2 text-[#6D1786]">
              <AlertCircle class="w-5 h-5" />
              <h3 class="font-bold tracking-tight">净值缺失日期详情</h3>
            </div>
            <button @click="showMissingDatesModal = false" class="text-slate-400 hover:text-slate-600 transition-colors">
              <X class="w-5 h-5" />
            </button>
          </div>
          
          <div class="p-6">
            <div class="mb-6">
              <label class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">资管计划产品名称</label>
              <div class="text-sm font-bold text-slate-800 leading-tight">
                {{ selectedMissingProduct }}
              </div>
            </div>

            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <label class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">缺失日期列表</label>
                <span class="text-[10px] bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-bold">共 {{ missingDates.length }} 个交易日</span>
              </div>
              <div class="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-1">
                <div 
                  v-for="date in missingDates" 
                  :key="date"
                  class="bg-slate-50 border border-slate-100 px-3 py-2 rounded-xl text-xs font-mono text-slate-600 flex items-center justify-between group hover:border-[#6D1786]/20 hover:bg-white transition-all"
                >
                  {{ date }}
                  <span class="w-1.5 h-1.5 rounded-full bg-red-400 group-hover:animate-pulse"></span>
                </div>
              </div>
            </div>

            <div class="mt-8 flex gap-3">
              <button 
                @click="showMissingDatesModal = false" 
                class="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs font-bold transition-all"
              >
                我知道了
              </button>
              <button 
                @click="showMissingDatesModal = false" 
                class="flex-1 py-3 px-4 bg-[#6D1786] hover:bg-[#5a136f] text-white rounded-2xl text-xs font-bold shadow-lg shadow-[#6D1786]/20 transition-all flex items-center justify-center gap-2"
              >
                <FileUp class="w-3.5 h-3.5" />
                立即补录
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <Transition name="fade">
      <div v-if="editingProductType" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
        <div class="bg-white p-8 rounded-2xl w-full max-w-sm">
          <h3 class="font-bold mb-4">维护: {{ editingProductType.name }}</h3>
          <div class="space-y-4">
            <div>
              <label class="text-xs font-bold text-slate-400 block mb-1">产品类型</label>
              <select class="w-full p-2 border rounded">
                <option value="净值型">净值型</option>
                <option value="货币型">货币型</option>
              </select>
            </div>
            <div class="flex gap-2">
              <button @click="editingProductType = null" class="flex-1 py-2 border rounded">关闭</button>
              <button @click="editingProductType = null" class="flex-1 py-2 bg-purple-600 text-white rounded">保存</button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
