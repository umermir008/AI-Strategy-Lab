import React, { useState, useEffect, useRef } from 'react';
import {
  Layout,
  Settings,
  Terminal,
  Play,
  Save,
  RefreshCw,
  Shield,
  Zap,
  BarChart3,
  Layers,
  Cpu,
  Database,
  Search,
  Bell,
  Sun,
  Moon,
  Menu,
  X,
  ChevronRight,
  Copy,
  Download,
  Filter,
  CheckCircle2,
  AlertCircle,
  Activity,
  History,
  Rocket,
  Trash2,
  Check,
  TrendingUp,
  Globe,
  Cpu as CpuIcon,
  HardDrive,
  Network
} from 'lucide-react';

// --- Components ---

const Button = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/40',
    secondary: 'bg-slate-700 hover:bg-slate-600 text-slate-100',
    outline: 'border border-slate-600 hover:border-blue-400 text-slate-300 hover:text-blue-400',
    ghost: 'hover:bg-slate-800 text-slate-400 hover:text-white',
    danger: 'bg-red-600/20 border border-red-500/50 text-red-400 hover:bg-red-600 hover:text-white',
    success: 'bg-emerald-600/20 border border-emerald-500/50 text-emerald-400 hover:bg-emerald-600 hover:text-white',
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base font-semibold',
  };

  return (
    <button
      className={`rounded-lg transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ title, children, icon: Icon, action, className = "" }) => (
  <div className={`bg-slate-900/40 border border-slate-800/60 rounded-2xl overflow-hidden backdrop-blur-md ${className}`}>
    {(title || Icon) && (
      <div className="px-6 py-4 border-b border-slate-800/60 flex items-center justify-between bg-slate-800/20">
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-5 h-5 text-blue-400" />}
          <h3 className="font-bold text-slate-200 text-sm tracking-wide uppercase">{title}</h3>
        </div>
        {action}
      </div>
    )}
    <div className="p-6">{children}</div>
  </div>
);

// --- Main Application ---

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  // Notification State
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Deployment Success', message: 'Sentinel-Alpha is now live on Prod.', type: 'success', time: '2m ago', read: false },
    { id: 2, title: 'High Latency Warning', message: 'Region US-East is experiencing 200ms+ spikes.', type: 'warning', time: '15m ago', read: false },
    { id: 3, title: 'New Agent Template', message: 'GPT-4o Vision templates are now available.', type: 'info', time: '1h ago', read: true },
  ]);
  const notifRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Debug Logs State
  const [logs, setLogs] = useState([
    { id: 1, type: 'info', msg: 'System initialized. Ready for simulation.', time: '10:00:01' },
    { id: 2, type: 'success', msg: 'Model GPT-4o connected successfully.', time: '10:00:05' },
    { id: 3, type: 'warning', msg: 'Latency spikes detected in Region-US-East.', time: '10:05:12' },
  ]);

  // Handle outside click for notification drawer
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [notifRef]);

  // Prevent Background Scroll (Mobile Menu) - FIXED
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMobileMenuOpen]);


  const addLog = (msg, type = 'info') => {
    const newLog = {
      id: Date.now(),
      type,
      msg,
      time: new Date().toLocaleTimeString([], { hour12: false })
    };
    setLogs(prev => [newLog, ...prev].slice(0, 50));
  };

  const notify = (title, message, type = 'info') => {
    const newNotif = {
      id: Date.now(),
      title,
      message,
      type,
      time: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setIsNotifOpen(false); // FIXED: Close Notification Drawer After "Read All"
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const markRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const simulateRun = () => {
    if (isRunning) return; // FIXED: Prevent overlapping runs
    setIsRunning(true);

    // Improved simulateRun logic from request
    addLog('Starting strategy validation...', 'info');

    // Using async/await pattern for better readability and to match request logic 
    // (though setTimeout is clearer here without making the function async in a blocking way for React, 
    // sticking to provided logic structure where possible but ensuring safety)

    setTimeout(() => {
      addLog('Neural weights optimized.', 'success');
      notify('Optimization Complete', 'Neural weights optimized.', 'success');

      setTimeout(() => {
        addLog('Strategy execution completed.', 'success');
        notify('Simulation Finished', 'Backtest passed all parameters.', 'info');
        setIsRunning(false);
      }, 1500);
    }, 2000);
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Layers },
    { id: 'builder', label: 'Agent Builder', icon: Cpu },
    { id: 'editor', label: 'Strategy Editor', icon: Terminal },
    { id: 'backtesting', label: 'Backtesting', icon: History },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'deployment', label: 'Deployment', icon: Rocket },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#0B0F1A] text-slate-100' : 'bg-slate-50 text-slate-900'}`}>

      {/* Top Bar */}
      <nav className={`fixed top-0 w-full z-50 border-b transition-colors ${isDarkMode ? 'bg-[#0B0F1A]/80 border-slate-800/50' : 'bg-white/80 border-slate-200'} backdrop-blur-md px-6 h-16 flex items-center justify-between`}>
        <div className="flex items-center gap-4">
          <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 hover:bg-slate-700/20 rounded-lg">
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Zap className="w-5 h-5 text-white fill-current" />
            </div>
            <span className="font-black text-xl tracking-tighter hidden sm:block uppercase italic">AI Strategy Lab</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 hover:bg-slate-700/20 rounded-lg transition-colors">
            {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>

          {/* Notification Button */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className={`p-2 rounded-lg transition-all relative ${isNotifOpen ? 'bg-blue-600/20 text-blue-400' : 'hover:bg-slate-700/20 text-slate-400'}`}
            >
              <Bell className={`w-5 h-5 ${unreadCount > 0 ? 'animate-pulse' : ''}`} />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-[#111827]">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {isNotifOpen && (
              <div className="absolute right-0 mt-3 w-80 md:w-96 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right z-[100]">
                <div className="p-4 border-b border-slate-700 flex items-center justify-between bg-slate-800/50">
                  <h4 className="font-bold text-sm uppercase tracking-wider">Notifications</h4>
                  <div className="flex gap-2">
                    <button onClick={markAllAsRead} className="text-[10px] font-bold text-blue-400 hover:text-blue-300 uppercase">Read All</button>
                    <button onClick={clearNotifications} className="text-[10px] font-bold text-slate-500 hover:text-red-400 uppercase">Clear</button>
                  </div>
                </div>
                <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                  {notifications.length === 0 ? (
                    <div className="p-10 text-center">
                      <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Bell className="w-6 h-6 text-slate-600" />
                      </div>
                      <p className="text-slate-500 text-sm">No new notifications</p>
                    </div>
                  ) : (
                    notifications.map(n => (
                      <div
                        key={n.id}
                        onClick={() => markRead(n.id)}
                        className={`p-4 border-b border-slate-800/50 hover:bg-slate-800/50 cursor-pointer transition-colors flex gap-4 ${!n.read ? 'bg-blue-600/5' : ''}`}
                      >
                        <div className={`mt-1 shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${n.type === 'success' ? 'bg-emerald-500/10 text-emerald-500' :
                          n.type === 'warning' ? 'bg-amber-500/10 text-amber-500' :
                            'bg-blue-500/10 text-blue-500'
                          }`}>
                          {n.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : n.type === 'warning' ? <AlertCircle className="w-4 h-4" /> : <Activity className="w-4 h-4" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <h5 className={`text-sm font-bold ${!n.read ? 'text-white' : 'text-slate-400'}`}>{n.title}</h5>
                            <span className="text-[10px] text-slate-500">{n.time}</span>
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed">{n.message}</p>
                        </div>
                        {!n.read && <div className="mt-2 w-2 h-2 bg-blue-500 rounded-full shrink-0"></div>}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <Button variant="primary" size="sm" className="hidden sm:flex font-bold uppercase tracking-wider">
            Deploy Agent
          </Button>
        </div>
      </nav>

      {/* Main Container */}
      <div className="flex pt-16 min-h-screen">

        {/* Sidebar Desktop */}
        <aside className={`hidden lg:flex flex-col border-r sticky top-16 h-[calc(100vh-64px)] transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} ${isDarkMode ? 'bg-[#0B0F1A] border-slate-800/50' : 'bg-white border-slate-200'}`}>
          <div className="flex-1 py-8 px-4 space-y-2 overflow-y-auto custom-scrollbar">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-3 py-3 rounded-xl transition-all group ${activeTab === item.id ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/40' : 'text-slate-500 hover:bg-slate-800/40 hover:text-slate-200'}`}
              >
                <item.icon className={`w-5 h-5 transition-transform duration-300 ${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'}`} />
                {isSidebarOpen && <span className="font-bold text-sm tracking-wide">{item.label}</span>}
              </button>
            ))}
          </div>
          <div className="p-4 border-t border-slate-800/50">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-slate-800 text-slate-500 transition-colors"
            >
              <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${isSidebarOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-4 lg:p-8 overflow-x-hidden">
          <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {activeTab === 'dashboard' && <DashboardView simulateRun={simulateRun} isRunning={isRunning} />}
            {activeTab === 'builder' && <AgentBuilderView />}
            {activeTab === 'editor' && <StrategyEditorView simulateRun={simulateRun} isRunning={isRunning} />}
            {activeTab === 'backtesting' && <BacktestingView />}
            {activeTab === 'analytics' && <AnalyticsView />}
            {activeTab === 'deployment' && <DeploymentView />}

            <DebugConsole logs={logs} setLogs={setLogs} />
          </div>
        </main>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
        .scanline::after { content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 2px; background: rgba(59, 130, 246, 0.2); animation: scanline 4s linear infinite; pointer-events: none; }
      `}</style>
    </div>
  );
}

// --- TRANSFORMED DASHBOARD VIEW ---

function DashboardView({ simulateRun, isRunning }) {
  const stats = [
    { label: 'Computational Load', value: '42.8%', detail: '8/12 Clusters Active', icon: CpuIcon, color: 'blue', spark: [30, 45, 32, 50, 42] },
    { label: 'Neural Latency', value: '18ms', detail: 'p99: 24ms (Optimal)', icon: Zap, color: 'amber', spark: [20, 18, 22, 19, 18] },
    { label: 'Strategy Success', value: '94.2%', detail: '+2.4% this week', icon: TrendingUp, color: 'emerald', spark: [80, 85, 90, 88, 94] },
    { label: 'Active Ingress', value: '1.2k/s', detail: 'Global Edge Network', icon: Globe, color: 'indigo', spark: [100, 110, 105, 120, 120] },
  ];

  const activeAgents = [
    { name: 'Sentinel-Alpha', type: 'Logic Engine', status: 'Optimal', uptime: '14d 2h', load: 65 },
    { name: 'Vision-Core-01', type: 'OCR/Vision', status: 'Stable', uptime: '4d 18h', load: 32 },
    { name: 'Audit-Bot-X', type: 'Compliance', status: 'Maintenance', uptime: '0h 42m', load: 0 },
    { name: 'Predictor-v4', type: 'ML Inference', status: 'Optimal', uptime: '1d 12h', load: 88 },
  ];

  // FIXED: Explicit mapping for dynamic colors
  const getColorClass = (color, type) => {
    const map = {
      blue: {
        text: 'text-blue-400',
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/20',
        gradient: 'from-blue-600 to-blue-400'
      },
      amber: {
        text: 'text-amber-400',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/20',
        gradient: 'from-amber-600 to-amber-400'
      },
      emerald: {
        text: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/20',
        gradient: 'from-emerald-600 to-emerald-400'
      },
      indigo: {
        text: 'text-indigo-400',
        bg: 'bg-indigo-500/10',
        border: 'border-indigo-500/20',
        gradient: 'from-indigo-600 to-indigo-400'
      },
    };
    return map[color]?.[type] || '';
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 relative">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
            <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase">System Status: Operational</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black tracking-tighter uppercase italic bg-gradient-to-r from-white via-slate-400 to-slate-600 bg-clip-text text-transparent">
            Command Center
          </h1>
          <p className="text-slate-500 font-medium max-w-xl">Real-time orchestration and cognitive performance monitoring for enterprise AI strategies.</p>
        </div>

        <div className="flex gap-3 bg-slate-900/50 p-2 rounded-2xl border border-slate-800/50 backdrop-blur-sm">
          <Button variant="ghost" size="md" className="hidden sm:flex text-slate-400 hover:text-white">
            <Settings className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="md" className="border-slate-700">
            <Download className="w-4 h-4" /> Report
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={simulateRun}
            disabled={isRunning}
            className={`px-8 transition-all duration-500 ${isRunning ? 'bg-blue-900/50 shadow-none' : 'hover:scale-105'}`}
          >
            {isRunning ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <div className="w-3 h-3 bg-white rounded-full animate-pulse mr-1"></div>
            )}
            {isRunning ? 'Validating...' : 'Sync System'}
          </Button>
        </div>
      </div>

      {/* Primary Stat Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="group relative bg-[#0F172A] border border-slate-800/60 rounded-3xl p-6 transition-all duration-300 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/5 overflow-hidden">
            <div className={`absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity`}>
              <stat.icon className={`w-24 h-24 ${getColorClass(stat.color, 'text')}`} />
            </div>

            <div className="flex justify-between items-start mb-6">
              <div className={`p-3 rounded-2xl ${getColorClass(stat.color, 'bg')} ${getColorClass(stat.color, 'text')} border ${getColorClass(stat.color, 'border')}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1">
                <div className={`w-1 h-1 rounded-full ${getColorClass(stat.color, 'text').replace('text-', 'bg-')}`}></div>
                <div className={`w-1 h-3 rounded-full ${getColorClass(stat.color, 'text').replace('text-', 'bg-')}/40`}></div>
                <div className={`w-1 h-5 rounded-full ${getColorClass(stat.color, 'text').replace('text-', 'bg-')}/20`}></div>
              </div>
            </div>

            <div className="space-y-1 relative z-10">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{stat.label}</p>
              <h4 className="text-3xl font-black text-white tabular-nums tracking-tight">{stat.value}</h4>
              <p className="text-xs text-slate-500 font-semibold mt-1">{stat.detail}</p>
            </div>

            <div className="mt-4 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${getColorClass(stat.color, 'gradient')} transition-all duration-1000`}
                style={{ width: isRunning ? '95%' : stat.spark[stat.spark.length - 1] + '%' }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Real-time Health Monitor */}
        <Card title="Neural Health Monitor" icon={Activity} className="lg:col-span-2 scanline relative">
          <div className="h-64 flex flex-col justify-end gap-1 overflow-hidden relative">
            {/* Health Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between opacity-10 pointer-events-none">
              {[...Array(6)].map((_, i) => <div key={i} className="w-full h-px bg-slate-500"></div>)}
            </div>

            {/* Animated Waveform Placeholder - FIXED: Randomized Re-render */}
            <Waveform isRunning={isRunning} />

            <div className="flex justify-between mt-4 text-[10px] font-mono text-slate-500 border-t border-slate-800 pt-4">
              <div className="flex gap-4">
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div> CPU Usage</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-700"></div> Background Task</span>
              </div>
              <span>BUFFER: 1024KB / FRAME: 16ms</span>
            </div>
          </div>
        </Card>

        {/* Global Distribution */}
        <Card title="Regional Status" icon={Globe}>
          <div className="space-y-6">
            <div className="relative aspect-square rounded-full border-4 border-slate-800/50 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-blue-500/20 animate-ping"></div>
              <div className="text-center">
                <p className="text-[10px] font-bold text-slate-500 uppercase">Primary Region</p>
                <p className="text-xl font-black">US-EAST-01</p>
                <Badge variant="success">Online</Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-800/30 rounded-xl text-center">
                <p className="text-[10px] font-bold text-slate-400">EU-WEST</p>
                <p className="text-sm font-bold">12ms</p>
              </div>
              <div className="p-3 bg-slate-800/30 rounded-xl text-center">
                <p className="text-[10px] font-bold text-slate-400">AS-SOUTH</p>
                <p className="text-sm font-bold">142ms</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Agents Matrix */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <Network className="w-4 h-4" /> Agent Deployment Matrix
          </h3>
          <button className="text-[10px] font-bold text-blue-400 hover:text-blue-300 uppercase underline decoration-2 underline-offset-4">Configure Nodes</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {activeAgents.map((agent, i) => (
            <div key={i} className="bg-slate-900/40 border border-slate-800/60 p-5 rounded-2xl hover:bg-slate-800/40 transition-all cursor-pointer group">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h5 className="font-bold text-slate-200 group-hover:text-blue-400 transition-colors">{agent.name}</h5>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">{agent.type}</p>
                </div>
                <div className={`w-2 h-2 rounded-full ${agent.status === 'Optimal' ? 'bg-emerald-500' : agent.status === 'Stable' ? 'bg-blue-500' : 'bg-amber-500'}`}></div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-[10px]">
                  <span className="text-slate-500 font-bold">INF. LOAD</span>
                  <span className="text-slate-300 font-mono">{agent.load}%</span>
                </div>
                <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600" style={{ width: `${agent.load}%` }}></div>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-[10px] text-slate-500 font-bold">UPTIME: <span className="text-slate-400">{agent.uptime}</span></span>
                  <ChevronRight className="w-3 h-3 text-slate-700 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Waveform Component to fix random re-renders
const Waveform = ({ isRunning }) => {
  const [waveData, setWaveData] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setWaveData([...Array(40)].map(() => Math.random() * 80 + 10));
  }, [isRunning]);

  return (
    <div className="flex items-end justify-between gap-1 px-2 relative z-10">
      {waveData.map((height, i) => (
        <div
          key={i}
          className={`w-full rounded-t-sm transition-all duration-700 ${isRunning ? 'bg-blue-500' : 'bg-slate-700'}`}
          style={{
            height: `${height}%`,
            opacity: 0.3 + (i / 40)
          }}
        ></div>
      ))}
    </div>
  );
};

// --- REST OF THE VIEWS (Unchanged as requested) ---

function AgentBuilderView() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-black tracking-tight mb-1 uppercase">Agent Builder</h1>
        <p className="text-slate-400">Configure core parameters and cognitive architecture.</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Configuration Blocks" icon={Settings}>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase">Primary Model</label>
              <select className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                <option>GPT-4o (Omni)</option>
                <option>GPT-4 Turbo</option>
                <option>Claude 3.5 Sonnet</option>
              </select>
            </div>
            <Button variant="primary" className="w-full py-3">Save Configuration</Button>
          </div>
        </Card>
        <Card title="Agent Identity" icon={Shield}>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase">Agent Name</label>
              <input type="text" placeholder="e.g. Sentinel-Alpha" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <textarea rows="4" placeholder="Define behavior..." className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm outline-none resize-none font-mono text-slate-300"></textarea>
          </div>
        </Card>
      </div>
    </div>
  );
}

function StrategyEditorView({ simulateRun, isRunning }) {
  const code = `// AI Strategy v2.4.1\nimport { Agent } from "@lab/core";\n\nexport default async function run(ctx) {\n  const res = await Agent.think(ctx.input);\n  return res.execute();\n}`;

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black tracking-tight mb-1 uppercase">Strategy Editor</h1>
          <p className="text-slate-400">Define logic flow and decision-making trees.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="primary" onClick={simulateRun} disabled={isRunning}>
            {isRunning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
            Run Test
          </Button>
        </div>
      </header>
      <div className="h-[400px] bg-slate-900 rounded-xl border border-slate-700 p-4 font-mono text-sm">
        <pre className="text-slate-400"><code>{code}</code></pre>
      </div>
    </div>
  );
}

function BacktestingView() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black tracking-tight mb-1 uppercase">Backtesting</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <Card key={i} title={`Test Session #${i}04`}>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold">Success Rate</p>
                <p className="text-2xl font-black text-emerald-400">98.2%</p>
              </div>
              <Badge variant="success">Passed</Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function AnalyticsView() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black tracking-tight mb-1 uppercase">Analytics</h1>
      <Card title="Traffic Metrics">
        <div className="h-48 bg-slate-900/50 rounded-lg flex items-center justify-center italic text-slate-600">
          Analytics graph rendering...
        </div>
      </Card>
    </div>
  );
}

function DeploymentView() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black tracking-tight mb-1 uppercase">Deployment</h1>
      <Card title="Production Nodes">
        <div className="space-y-4">
          <div className="p-4 bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="font-bold">US-EAST-01</span>
            </div>
            <Badge variant="info">Active</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}

function DebugConsole({ logs, setLogs }) {
  const [filter, setFilter] = useState('all');
  const filteredLogs = logs.filter(log => filter === 'all' || log.type === filter);

  return (
    <div className="mt-8 border border-slate-700/50 rounded-xl overflow-hidden bg-[#0F172A]/90 backdrop-blur-xl">
      <div className="px-5 py-3 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
        <div className="flex items-center gap-3"><Terminal className="w-4 h-4 text-blue-400" /><h3 className="text-xs font-black uppercase">Debug Console</h3></div>
        <div className="flex items-center gap-2">
          {['all', 'info', 'success', 'warning', 'error'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-2 py-1 text-[10px] font-bold uppercase rounded ${filter === f ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-white'}`}>{f}</button>
          ))}
          <button onClick={() => setLogs([])} className="p-1.5 hover:bg-slate-700 rounded-lg text-slate-500"><RefreshCw className="w-3.5 h-3.5" /></button>
        </div>
      </div>
      <div className="h-48 overflow-y-auto p-4 space-y-1 font-mono text-[11px] custom-scrollbar">
        {filteredLogs.map(log => (
          <div key={log.id} className="flex gap-4 px-2 py-0.5 rounded transition-colors hover:bg-slate-800/30">
            <span className="text-slate-600">[{log.time}]</span>
            <span className={`uppercase font-black ${log.type === 'error' ? 'text-red-500' : log.type === 'warning' ? 'text-amber-500' : log.type === 'success' ? 'text-emerald-500' : 'text-blue-500'}`}>{log.type}</span>
            <span className="text-slate-300">{log.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Badge({ children, variant = 'info' }) {
  const styles = {
    info: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  };
  return <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase border ${styles[variant]}`}>{children}</span>;
}
