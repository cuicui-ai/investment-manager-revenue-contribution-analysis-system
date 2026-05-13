<script setup lang="ts">
import { ref, computed } from 'vue';
import { 
  BarChart3, Wallet, Activity, FileText, TrendingUp, LineChart, Package, 
  AlertCircle, X, ChevronLeft, ArrowRight
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
  // 初金霞
  { 
    manager: '初金霞', buyDate: '20260401', endDate: '20260402', days: 2, 
    totalPrincipal: 105263157.9, holdingPrincipal: 100000000, segmentGain: 120424.91, segmentWeighted: 5405405.405
  },
  { 
    manager: '初金霞', buyDate: '20260401', endDate: '20260403', days: 3, 
    totalPrincipal: 585163866.1, holdingPrincipal: 555905672.8, segmentGain: 52806.43662, segmentWeighted: 45073432.93
  },
  { 
    manager: '初金霞', buyDate: '20260401', endDate: '20260407', days: 7, 
    totalPrincipal: 583083.7795, holdingPrincipal: 553929.5905, segmentGain: 152.4394964, segmentWeighted: 104797.4901
  },
  // 李炜菁
  { 
    manager: '李炜菁', buyDate: '20260403', endDate: '20260408', days: 6, 
    totalPrincipal: 548918989.9, holdingPrincipal: 521473040.4, segmentGain: 102777.9992, segmentWeighted: 89395378.35
  },
  { 
    manager: '李炜菁', buyDate: '20260403', endDate: '20260414', days: 12, 
    totalPrincipal: 316684032.6, holdingPrincipal: 300049831, segmentGain: 129794.9995, segmentWeighted: 103148513.5
  },
  // 茹昊
  { 
    manager: '茹昊', buyDate: '20260403', endDate: '20260507', days: 35, 
    totalPrincipal: 400004226.9, holdingPrincipal: 380004015.5, segmentGain: 14233.982, segmentWeighted: 369448348.4
  }
];

const TRANSACTION_DATA = [
  { date: '2024-05-08', product: '天天盈43号', security: '江苏信托-宁聚8号', direction: '申购', price: 1.0452, amount: 5000000, status: '已成交', delegateStatus: '全部分配', manager: '初金霞' },
  { date: '2024-05-07', product: '天天盈43号', security: '陕国投·鑫和1号', direction: '赎回', price: 1.0890, amount: 2000000, status: '已成交', delegateStatus: '全部分配', manager: '李炜菁' },
  { date: '2024-05-06', product: '天天盈43号', security: '中铁信托-财富系列', direction: '申购', price: 1.0210, amount: 8000000, status: '部分成交', delegateStatus: '待分配', manager: '茹昊' },
  { date: '2024-05-05', product: '天天盈43号', security: '中航信托-天璇系列', direction: '申购', price: 1.0560, amount: 3500000, status: '已成交', delegateStatus: '全部分配', manager: '陈英华' },
];

const PRODUCT_NET_VALUE_LIST = [
  { id: '1', name: '东方汇智-光大银行-博普量化2号集合资产管理计划', date: '2026-05-08', value: '1.2401' },
  { id: '2', name: '中信保诚资管诚远19号资产管理产品', date: '2026-05-08', value: '1.0027' },
  { id: '3', name: '中信信托和耀1号证券投资信托计划', date: '2026-05-08', value: '1.0080' },
  { id: '4', name: '中信信托和耀2号证券投资信托计划', date: '2026-05-08', value: '1.0016' },
  { id: '5', name: '中信信托和耀3号证券投资信托计划', date: '2026-05-08', value: '1.0006' },
  { id: '6', name: '中信信托和耀4号证券投资信托计划', date: '2026-05-08', value: '1.0016' },
  { id: '7', name: '中信信托和耀6号证券投资信托计划', date: '2026-05-08', value: '1.0029' },
  { id: '8', name: '中信期货利率阿尔法4号', date: '2026-05-08', value: '1.1334' },
  { id: '9', name: '中信期货固收对冲2号', date: '2026-05-08', value: '1.1495' },
  { id: '10', name: '中信期货稳享利率1号集合资产管理计划', date: '2026-05-08', value: '1.0767' },
  { id: '11', name: '中信期货阳光添利4号集合资产管理计划', date: '2026-05-08', value: '1.2202' },
  { id: '12', name: '中信期货鸣石融辰1号集合资产管理计划', date: '2026-05-08', value: '1.3956' },
  { id: '13', name: '中信证券基础设施1号集合资产管理计划', date: '2026-05-08', value: '1.1068' },
  { id: '14', name: '中再资产-安心收益32号保险资产管理产品', date: '2026-05-08', value: '1.0639' },
  { id: '15', name: '中再资产-安心收益40号保险资产管理产品', date: '2026-05-08', value: '1.0502' },
];

const MISSING_NET_VALUE_LIST = [
  { id: 'm1', name: '中信保诚资管诚远19号资产管理产品', date: '2026-05-07', value: '缺失' },
  { id: 'm2', name: '外贸信托-汇金5号', date: '2024-05-01', value: '缺失' },
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

const currentView = ref<'selection' | 'detail'>('selection');
const selectedProduct = ref<string | null>(null);
const activeTab = ref<'summary' | 'attribution' | 'transactions' | 'net-value' | 'product-type'>('summary');
const sortConfig = ref<{ key: string; direction: 'asc' | 'desc' } | null>(null);
const netValueSubTab = ref<'value' | 'missing'>('value');
const showNetValueAlert = ref(true);
const editingProductType = ref<any | null>(null);

const handleProductClick = (productName: string) => {
  selectedProduct.value = productName;
  currentView.value = 'detail';
  activeTab.value = 'summary';
};

const handleBack = () => {
  currentView.value = 'selection';
  selectedProduct.value = null;
};

const sortedAttribution = computed(() => {
  let items = [...ATTRIBUTION_DATA];
  if (sortConfig.value) {
    const { key, direction } = sortConfig.value;
    items.sort((a: any, b: any) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }
  return items;
});

const requestSort = (key: string) => {
  let direction: 'asc' | 'desc' = 'asc';
  if (sortConfig.value && sortConfig.value.key === key && sortConfig.value.direction === 'asc') {
    direction = 'desc';
  }
  sortConfig.value = { key, direction };
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
                <p class="text-slate-500 font-medium text-xs opacity-70">
                  分析区间: <span class="font-bold text-slate-700">2026-04-01 至 2026-05-09</span>
                </p>
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
                :active="activeTab === 'product-type'" 
                @click="activeTab = 'product-type'"
                label="产品类型维护"
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

                <div v-else-if="activeTab === 'attribution'" key="attr" class="bg-white p-6 rounded-xl border">
                  <div class="flex justify-between items-center mb-6">
                    <h3 class="font-bold">收益归因明细</h3>
                    <button @click="requestSort('days')" class="text-xs bg-slate-100 px-3 py-1 rounded">按时间排序</button>
                  </div>
                  <div class="overflow-x-auto text-[11px]">
                    <table class="w-full">
                      <thead class="bg-slate-50">
                        <tr>
                          <th class="p-2 text-left">经理</th><th class="p-2">买入</th><th class="p-2">天数</th><th class="p-2 text-right">本金</th><th class="p-2 text-right">收益</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(a, i) in sortedAttribution" :key="i" class="border-t">
                          <td class="p-2">{{ a.manager }}</td><td class="p-2">{{ a.buyDate }}</td><td class="p-2 text-center">{{ a.days }}</td>
                          <td class="p-2 text-right">{{ a.totalPrincipal.toLocaleString() }}</td><td class="p-2 text-right text-red-600">{{ a.segmentGain.toFixed(2) }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div v-else-if="activeTab === 'transactions'" key="tx" class="bg-white p-6 rounded-xl border">
                  <h3 class="font-bold mb-4">交易流水</h3>
                  <table class="w-full text-[12px]">
                    <thead class="bg-[#F2EDF7]">
                      <tr><th class="p-3 text-left">日期</th><th class="p-3 text-left">名称</th><th class="p-3">方向</th><th class="p-3 text-right">金额</th></tr>
                    </thead>
                    <tbody>
                      <tr v-for="(t, i) in TRANSACTION_DATA" :key="i" class="border-b">
                        <td class="p-3">{{ t.date }}</td><td class="p-3 font-medium">{{ t.security }}</td>
                        <td class="p-3 text-center"><span class="px-2 py-0.5 bg-purple-50 text-purple-600 rounded">{{ t.direction }}</span></td>
                        <td class="p-3 text-right">{{ t.amount.toLocaleString() }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div v-else-if="activeTab === 'net-value'" key="nv" class="space-y-4">
                  <div class="flex gap-4 border-b">
                    <button @click="netValueSubTab = 'value'" :class="['p-2', netValueSubTab === 'value' ? 'border-b-2 border-purple-600 text-purple-600' : '']">产品净值</button>
                    <button @click="netValueSubTab = 'missing'" :class="['p-2', netValueSubTab === 'missing' ? 'border-b-2 border-purple-600 text-purple-600' : '']">缺失净值</button>
                  </div>
                  <table class="w-full bg-white border text-[13px]">
                    <thead class="bg-[#F2EDF7]">
                      <tr><th class="p-3 text-left">名称</th><th class="p-3">日期</th><th class="p-3 text-right">值</th></tr>
                    </thead>
                    <tbody>
                      <tr v-for="p in (netValueSubTab === 'value' ? PRODUCT_NET_VALUE_LIST : MISSING_NET_VALUE_LIST)" :key="p.id" class="border-t">
                        <td class="p-3">{{ p.name }}</td><td class="p-3 text-center">{{ p.date }}</td><td class="p-3 text-right">{{ p.value }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div v-else-if="activeTab === 'product-type'" key="pt" class="bg-white border rounded">
                  <table class="w-full text-[12px]">
                    <thead class="bg-[#F2EDF7]">
                      <tr><th class="p-3 text-left">代码</th><th class="p-3 text-left">名称</th><th class="p-3">类型</th><th class="p-3">操作</th></tr>
                    </thead>
                    <tbody>
                      <tr v-for="(p, i) in PRODUCT_TYPE_DATA" :key="i" class="border-t">
                        <td class="p-3">{{ p.code }}</td><td class="p-3 font-medium">{{ p.name }}</td><td class="p-3">{{ p.type }}</td>
                        <td class="p-3 text-center"><button @click="editingProductType = p" class="text-purple-600">维护</button></td>
                      </tr>
                    </tbody>
                  </table>
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
