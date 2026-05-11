/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, BarChart3, TrendingUp, Wallet, 
  ArrowRight, FileText, Activity, LineChart, 
  Search, ArrowUpDown, AlertCircle, Package, X
} from 'lucide-react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';

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
    totalPrincipal: 105263157.9, holdingPrincipal: 100000000, segmentGain: 120424.91, segmentWeighted: 5405405.405,
    managerGain: 24364556.06, managerMaxDays: 37, managerAccWeighted: 12027074278, 
    managerReturnRate: '0.2026%', managerAnnualized: '2.0165%', managerPreFee: '1.9856%', managerPostFee: '1.6156%' 
  },
  { 
    manager: '初金霞', buyDate: '20260401', endDate: '20260403', days: 3, 
    totalPrincipal: 585163866.1, holdingPrincipal: 555905672.8, segmentGain: 52806.43662, segmentWeighted: 45073432.93,
    managerGain: 24364556.06, managerMaxDays: 37, managerAccWeighted: 12027074278, 
    managerReturnRate: '0.2026%', managerAnnualized: '2.0165%', managerPreFee: '1.9856%', managerPostFee: '1.6156%' 
  },
  { 
    manager: '初金霞', buyDate: '20260401', endDate: '20260407', days: 7, 
    totalPrincipal: 583083.7795, holdingPrincipal: 553929.5905, segmentGain: 152.4394964, segmentWeighted: 104797.4901,
    managerGain: 24364556.06, managerMaxDays: 37, managerAccWeighted: 12027074278, 
    managerReturnRate: '0.2026%', managerAnnualized: '2.0165%', managerPreFee: '1.9856%', managerPostFee: '1.6156%' 
  },
  // 李炜菁
  { 
    manager: '李炜菁', buyDate: '20260403', endDate: '20260408', days: 6, 
    totalPrincipal: 548918989.9, holdingPrincipal: 521473040.4, segmentGain: 102777.9992, segmentWeighted: 89395378.35,
    managerGain: 8389195.496, managerMaxDays: 35, managerAccWeighted: 4357404360, 
    managerReturnRate: '0.1925%', managerAnnualized: '2.0261%', managerPreFee: '1.9948%', managerPostFee: '1.6248%' 
  },
  { 
    manager: '李炜菁', buyDate: '20260403', endDate: '20260414', days: 12, 
    totalPrincipal: 316684032.6, holdingPrincipal: 300049831, segmentGain: 129794.9995, segmentWeighted: 103148513.5,
    managerGain: 8389195.496, managerMaxDays: 35, managerAccWeighted: 4357404360, 
    managerReturnRate: '0.1925%', managerAnnualized: '2.0261%', managerPreFee: '1.9948%', managerPostFee: '1.6248%' 
  },
  // 茹昊
  { 
    manager: '茹昊', buyDate: '20260403', endDate: '20260507', days: 35, 
    totalPrincipal: 400004226.9, holdingPrincipal: 380004015.5, segmentGain: 14233.982, segmentWeighted: 369448348.4,
    managerGain: 8901890.646, managerMaxDays: 36, managerAccWeighted: 4649881454, 
    managerReturnRate: '0.1914%', managerAnnualized: '1.9581%', managerPreFee: '1.9302%', managerPostFee: '1.5602%' 
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

// --- 类型 ---

type ViewState = 'selection' | 'detail';
type TabType = 'summary' | 'attribution' | 'transactions' | 'net-value' | 'product-type';

const PRODUCT_TYPE_DATA = [
  { code: 'CR0078', name: '大家资产稳健智选8号固定收益类资产管理产品', type: '货币型', dataType: '万份收益' },
  { code: 'CR0059', name: '太平资产吉祥2号', type: '货币型', dataType: '' },
  { code: 'LBB2206070001', name: '泰康资产纯泰货币12号资产管理产品', type: '货币型', dataType: '七日年化收益率' },
  { code: '970034', name: '中国人保资产中短期配置43号资产管理产品', type: '净值型', dataType: '' },
  { code: 'ZTYS16', name: '中铁信托-云升16号集合资金信托计划', type: '净值型', dataType: '' },
  { code: 'ZTJX22', name: '中铁信托-锦信22号集合资金信托计划', type: '净值型', dataType: '' },
  { code: 'ZTJX20', name: '中铁信托-锦信20号集合资金信托计划', type: '净值型', dataType: '' },
  { code: 'ZTJX37', name: '中铁信托-锦信37号集合资金信托计划', type: '净值型', dataType: '' },
  { code: '2023-0495', name: '华润信托·睿阳8号集合资金信托', type: '净值型', dataType: '' },
  { code: 'G202501AZGS00189', name: '中信信托和耀1号证券投资信托计划', type: '净值型', dataType: '' },
  { code: 'ZTYS01', name: '中铁信托-云升1号集合资金信托计划', type: '净值型', dataType: '' },
  { code: 'ZTJX33', name: '中铁信托-锦信33号集合资金信托计划', type: '净值型', dataType: '' },
  { code: 'ZTYS19', name: '中铁信托-云升19号集合资金信托计划', type: '净值型', dataType: '' },
  { code: '052800', name: '陆家嘴信托-悦享2号集合资金信托计划', type: '净值型', dataType: '' },
  { code: 'SZN318', name: '光大期货鑫泰18号集合资产管理计划', type: '净值型', dataType: '' },
];

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('selection');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('summary');
  
  // 筛选状态
  const [managerFilter] = useState('全部');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [netValueSubTab, setNetValueSubTab] = useState<'value' | 'missing'>('value');
  const [selectedMissingProduct, setSelectedMissingProduct] = useState<any | null>(null);
  const [showNetValueAlert, setShowNetValueAlert] = useState(true);
  const [editingProductType, setEditingProductType] = useState<any | null>(null);

  const missingDatesForProduct = useMemo(() => {
    if (!selectedMissingProduct) return [];
    return [
      '2026-02-12', '2026-02-13', '2026-02-16', '2026-02-17', '2026-02-18', 
      '2026-02-19', '2026-02-20', '2026-02-23', '2026-02-24', '2026-02-25',
      '2026-02-26', '2026-02-27', '2026-03-02', '2026-03-03', '2026-03-04'
    ];
  }, [selectedMissingProduct]);

  const handleProductClick = (productName: string) => {
    setSelectedProduct(productName);
    setCurrentView('detail');
    setActiveTab('summary');
  };

  const handleBack = () => {
    setCurrentView('selection');
    setSelectedProduct(null);
  };

  const sortedAttribution = useMemo(() => {
    let items = [...ATTRIBUTION_DATA];
    if (managerFilter !== '全部') {
      items = items.filter(i => i.manager === managerFilter);
    }
    if (sortConfig) {
      items.sort((a: any, b: any) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return items;
  }, [managerFilter, sortConfig]);

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className={`${currentView === 'selection' ? 'max-w-7xl mx-auto' : 'w-full'} px-6 h-14 flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <div className="bg-brand-primary p-1.5 rounded-lg shadow-lg shadow-brand-primary/20">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-bold tracking-tight text-slate-800">
              投资经理收益贡献分析系统
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg border border-slate-200 transition-all text-xs font-semibold">
              <FileText className="w-3.5 h-3.5" />
              导出报表
            </button>
            {currentView === 'detail' && (
              <button
                onClick={handleBack}
                className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-brand-primary transition-colors pr-2"
              >
                <ChevronLeft className="w-4 h-4" />
                返回前页
              </button>
            )}
          </div>
        </div>
      </header>

      <main className={`${currentView === 'selection' ? 'max-w-7xl mx-auto' : 'w-full'} px-4 py-8`}>
        <AnimatePresence mode="wait">
          {currentView === 'selection' ? (
            <motion.div
              key="selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto"
            >
              <ProductCard
                id="ygjfl"
                name="阳光金丰利617期"
                description="投资经理累计收益及达成率分析"
                icon={<BarChart3 className="w-6 h-6" />}
                colorClass="text-brand-primary"
                hoverBorderClass="hover:border-brand-primary/30"
                onClick={() => handleProductClick('阳光金丰利617期')}
              />
              <ProductCard
                id="tty43"
                name="天天盈43号"
                description="投资经理费前费后年华收益率分析"
                icon={<Wallet className="w-6 h-6" />}
                colorClass="text-brand-secondary"
                hoverBorderClass="hover:border-brand-secondary/30"
                onClick={() => handleProductClick('天天盈43号')}
              />
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="flex flex-col gap-6"
            >
              <div className="bg-white px-6 py-4 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="bg-slate-100 px-2 py-0.5 rounded text-[9px] font-bold text-slate-500">
                      核心绩效分析模块
                    </div>
                    <div className="h-4 w-px bg-slate-200" />
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">{selectedProduct}</h2>
                    <div className="h-4 w-px bg-slate-200" />
                    <p className="text-slate-500 font-medium text-xs opacity-70">
                      分析区间: <span className="font-bold text-slate-700">2026-04-01 至 2026-05-09</span>
                    </p>
                  </div>
                </div>
              </div>

              {selectedProduct === '天天盈43号' && (
                <div className="flex flex-col lg:flex-row gap-6">
                  <aside className="lg:w-48 flex flex-col gap-1">
                    <TabButton 
                      active={activeTab === 'summary'} 
                      onClick={() => setActiveTab('summary')}
                      icon={<Activity className="w-4 h-4" />}
                      label="业绩看板"
                    />
                    <TabButton 
                      active={activeTab === 'attribution'} 
                      onClick={() => setActiveTab('attribution')}
                      icon={<FileText className="w-4 h-4" />}
                      label="归因明细"
                    />
                    <TabButton 
                      active={activeTab === 'transactions'} 
                      onClick={() => setActiveTab('transactions')}
                      icon={<TrendingUp className="w-4 h-4" />}
                      label="交易流水"
                    />
                    <TabButton 
                      active={activeTab === 'net-value'} 
                      onClick={() => setActiveTab('net-value')}
                      icon={<LineChart className="w-4 h-4" />}
                      label="产品净值"
                    />
                    <TabButton 
                      active={activeTab === 'product-type'} 
                      onClick={() => setActiveTab('product-type')}
                      icon={<Package className="w-4 h-4" />}
                      label="产品类型维护"
                    />
                  </aside>

                  <div className="flex-1">
                    <AnimatePresence mode="wait">
                      {activeTab === 'summary' && (
                        <motion.div 
                          key="summary"
                          initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                          className="space-y-6"
                        >
                          <AnimatePresence>
                            {showNetValueAlert && (
                              <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-[#C91F1F] text-white px-6 py-2.5 rounded flex items-center justify-between"
                              >
                                <div className="flex items-center gap-3 text-[13px] font-bold">
                                  <AlertCircle className="w-4 h-4" />
                                  <span>净值缺失提醒： 20 只产品缺少净值数据</span>
                                </div>
                                <button onClick={() => setShowNetValueAlert(false)}><X className="w-4 h-4" /></button>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                              <table className="w-full text-left border-collapse">
                                <thead className="bg-[#F2EDF7] border-b border-slate-200 text-[11px] font-bold text-[#6D1786]">
                                  <tr>
                                    <th className="px-6 py-3.5">投资经理</th>
                                    <th className="px-6 py-3.5 text-right">总本金（元）</th>
                                    <th className="px-6 py-3.5 text-right">持仓本金（元）</th>
                                    <th className="px-6 py-3.5 text-right">累计收益（元）</th>
                                    <th className="px-6 py-3.5 text-right">累计收益率</th>
                                    <th className="px-6 py-3.5 text-right">年化收益率</th>
                                    <th className="px-6 py-3.5 text-right">费前年化率</th>
                                    <th className="px-6 py-3.5 text-right">费后年化率</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-[13px]">
                                  {TIAN_TIAN_YING_DATA.map((item, index) => (
                                    <tr key={index}>
                                      <td className="px-6 py-4 font-medium">{item.manager}</td>
                                      <td className="px-6 py-4 text-right font-mono">{item.totalPrincipal.toLocaleString()}</td>
                                      <td className="px-6 py-4 text-right font-mono">{item.holdingPrincipal.toLocaleString()}</td>
                                      <td className="px-6 py-4 text-right font-mono text-red-600 font-semibold">{item.accumulatedReturn.toLocaleString()}</td>
                                      <td className="px-6 py-4 text-right text-red-600">{item.returnRate}</td>
                                      <td className="px-6 py-4 text-right text-red-600">{item.annualized}</td>
                                      <td className="px-6 py-4 text-right text-red-600">{item.preFee}</td>
                                      <td className="px-6 py-4 text-right text-red-600">{item.postFee}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {activeTab === 'attribution' && (
                        <motion.div key="attr" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-6 rounded-xl border">
                           <div className="flex justify-between items-center mb-6">
                             <h3 className="font-bold">收益归因明细</h3>
                             <button onClick={() => requestSort('days')} className="text-xs bg-slate-100 px-3 py-1 rounded">按时间排序</button>
                           </div>
                           <div className="overflow-x-auto text-[11px]">
                             <table className="w-full">
                               <thead className="bg-slate-50">
                                 <tr>
                                   <th className="p-2 text-left">经理</th><th className="p-2">买入</th><th className="p-2">天数</th><th className="p-2 text-right">本金</th><th className="p-2 text-right">收益</th>
                                 </tr>
                               </thead>
                               <tbody>
                                 {sortedAttribution.map((a, i) => (
                                   <tr key={i} className="border-t">
                                     <td className="p-2">{a.manager}</td><td className="p-2">{a.buyDate}</td><td className="p-2 text-center">{a.days}</td>
                                     <td className="p-2 text-right">{a.totalPrincipal.toLocaleString()}</td><td className="p-2 text-right text-red-600">{a.segmentGain.toFixed(2)}</td>
                                   </tr>
                                 ))}
                               </tbody>
                             </table>
                           </div>
                        </motion.div>
                      )}

                      {activeTab === 'transactions' && (
                        <motion.div key="tx" className="bg-white p-6 rounded-xl border">
                          <h3 className="font-bold mb-4">交易流水</h3>
                          <table className="w-full text-[12px]">
                            <thead className="bg-[#F2EDF7]">
                              <tr><th className="p-3 text-left">日期</th><th className="p-3 text-left">名称</th><th className="p-3">方向</th><th className="p-3 text-right">金额</th></tr>
                            </thead>
                            <tbody>
                              {TRANSACTION_DATA.map((t, i) => (
                                <tr key={i} className="border-b">
                                  <td className="p-3">{t.date}</td><td className="p-3 font-medium">{t.security}</td>
                                  <td className="p-3 text-center"><span className="px-2 py-0.5 bg-purple-50 text-purple-600 rounded">{t.direction}</span></td>
                                  <td className="p-3 text-right">{t.amount.toLocaleString()}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </motion.div>
                      )}

                      {activeTab === 'net-value' && (
                        <motion.div key="nv" className="space-y-4">
                           <div className="flex gap-4 border-b">
                             <button onClick={() => setNetValueSubTab('value')} className={`p-2 ${netValueSubTab === 'value' ? 'border-b-2 border-purple-600 text-purple-600' : ''}`}>产品净值</button>
                             <button onClick={() => setNetValueSubTab('missing')} className={`p-2 ${netValueSubTab === 'missing' ? 'border-b-2 border-purple-600 text-purple-600' : ''}`}>缺失净值</button>
                           </div>
                           <table className="w-full bg-white border text-[13px]">
                             <thead className="bg-[#F2EDF7]">
                               <tr><th className="p-3 text-left">名称</th><th className="p-3">日期</th><th className="p-3 text-right">值</th></tr>
                             </thead>
                             <tbody>
                               {(netValueSubTab === 'value' ? PRODUCT_NET_VALUE_LIST : MISSING_NET_VALUE_LIST).map(p => (
                                 <tr key={p.id} className="border-t">
                                   <td className="p-3">{p.name}</td><td className="p-3 text-center">{p.date}</td><td className="p-3 text-right">{p.value}</td>
                                 </tr>
                               ))}
                             </tbody>
                           </table>
                        </motion.div>
                      )}

                      {activeTab === 'product-type' && (
                        <motion.div key="pt" className="bg-white border rounded">
                          <table className="w-full text-[12px]">
                            <thead className="bg-[#F2EDF7]">
                              <tr><th className="p-3 text-left">代码</th><th className="p-3 text-left">名称</th><th className="p-3">类型</th><th className="p-3">操作</th></tr>
                            </thead>
                            <tbody>
                              {PRODUCT_TYPE_DATA.map((p, i) => (
                                <tr key={i} className="border-t">
                                  <td className="p-3">{p.code}</td><td className="p-3 font-medium">{p.name}</td><td className="p-3">{p.type}</td>
                                  <td className="p-3 text-center"><button onClick={() => setEditingProductType(p)} className="text-purple-600">维护</button></td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {selectedProduct !== '天天盈43号' && (
                <div className="bg-white p-20 rounded-3xl border border-dashed text-center">
                   <Activity className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                   <h3 className="text-2xl font-bold mb-2">{selectedProduct}</h3>
                   <p className="text-slate-400">模块开发中...</p>
                   <button onClick={handleBack} className="mt-8 px-8 py-3 bg-purple-600 text-white rounded-lg text-sm font-bold">返回列表</button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {selectedMissingProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white p-6 rounded-xl w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold">{selectedMissingProduct.name} 缺失日期</h3>
                <button onClick={() => setSelectedMissingProduct(null)}><X className="w-5 h-5" /></button>
              </div>
              <div className="max-h-60 overflow-y-auto">
                {missingDatesForProduct.map(d => <div key={d} className="p-2 border-b text-sm">{d}</div>)}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {editingProductType && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white p-8 rounded-2xl w-full max-w-sm">
              <h3 className="font-bold mb-4">维护: {editingProductType.name}</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1">产品类型</label>
                  <select className="w-full p-2 border rounded">
                    <option value="净值型">净值型</option>
                    <option value="货币型">货币型</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditingProductType(null)} className="flex-1 py-2 border rounded">关闭</button>
                  <button onClick={() => setEditingProductType(null)} className="flex-1 py-2 bg-purple-600 text-white rounded">保存</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProductCard({ id, name, description, icon, colorClass, hoverBorderClass, onClick }: {
  id: string; name: string; description: string; icon: React.ReactNode; colorClass: string; hoverBorderClass: string; onClick: () => void;
}) {
  return (
    <motion.button
      id={id}
      whileHover={{ y: -8 }}
      onClick={onClick}
      className={`bg-white p-10 rounded-2xl border border-slate-200 shadow-xl text-left relative overflow-hidden ${hoverBorderClass}`}
    >
      <div className={`mb-6 w-12 h-12 rounded-xl flex items-center justify-center bg-slate-50 ${colorClass}`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-2">{name}</h3>
      <p className="text-slate-400 mb-8 text-sm font-medium">{description}</p>
      <div className={`flex items-center gap-2 text-xs font-bold uppercase ${colorClass}`}>
        查看详情 <ArrowRight className="w-4 h-4" />
      </div>
    </motion.button>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold text-[13px] border ${
        active 
          ? 'bg-purple-50 text-purple-600 border-purple-200' 
          : 'bg-white text-slate-500 border-transparent hover:bg-slate-50'
      }`}
    >
      {icon}
      <span>{label}</span>
      {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-600" />}
    </button>
  );
}
