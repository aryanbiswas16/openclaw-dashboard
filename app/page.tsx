"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  MessageSquare,
  Bot,
  Clock,
  Settings,
  Zap,
  Calendar,
  Mail,
  Github,
  Globe,
  Terminal,
  Wifi,
  ChevronRight,
  Plus,
  Pause,
  Play,
  Square,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  X,
  FileText,
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { 
  useSessions, 
  useTasks, 
  useSystemStatus, 
  useChannels, 
  useCronJobs,
  useDuration 
} from "@/lib/hooks";
import { Session, Task, Channel } from "@/lib/types";

// Components
function GlassCard({ 
  children, 
  className = "", 
  hover = true,
  onClick
}: { 
  children: React.ReactNode; 
  className?: string; 
  hover?: boolean;
  onClick?: () => void;
}) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.01, y: -2 } : {}}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={`glass rounded-2xl p-6 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    active: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    idle: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    paused: "bg-rose-500/20 text-rose-400 border-rose-500/30",
    running: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    queued: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    completed: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    failed: "bg-rose-500/20 text-rose-400 border-rose-500/30",
    pending: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    cancelled: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  };
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${colors[status] || colors.idle}`}>
      {status}
    </span>
  );
}

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
      />
    </div>
  );
}

function ChannelIcon({ type }: { type: string }) {
  const colors: Record<string, string> = {
    discord: "bg-indigo-500/20 text-indigo-400",
    telegram: "bg-sky-500/20 text-sky-400",
    whatsapp: "bg-emerald-500/20 text-emerald-400",
    email: "bg-rose-500/20 text-rose-400",
    slack: "bg-purple-500/20 text-purple-400",
    signal: "bg-blue-500/20 text-blue-400",
    imessage: "bg-green-500/20 text-green-400",
  };
  
  const labels: Record<string, string> = {
    discord: "D",
    telegram: "T",
    whatsapp: "W",
    email: "@",
    slack: "S",
    signal: "S",
    imessage: "i",
  };
  
  return (
    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${colors[type] || colors.discord}`}>
      {labels[type] || "?"}
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center py-8">
      <RefreshCw className="w-6 h-6 text-white/50 animate-spin" />
    </div>
  );
}

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  // Data hooks
  const { sessions, loading: sessionsLoading } = useSessions();
  const { tasks, loading: tasksLoading, cancelTask } = useTasks();
  const { status, loading: statusLoading } = useSystemStatus();
  const { channels, loading: channelsLoading } = useChannels();
  const formatDuration = useDuration();

  // Update clock - only on client
  useEffect(() => {
    setCurrentTime(new Date());
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const metrics = [
    { time: "00:00", requests: 12, latency: 150 },
    { time: "04:00", requests: 8, latency: 120 },
    { time: "08:00", requests: 45, latency: 180 },
    { time: "12:00", requests: 78, latency: 200 },
    { time: "16:00", requests: 65, latency: 175 },
    { time: "20:00", requests: 35, latency: 140 },
    { time: "23:59", requests: 20, latency: 130 },
  ];

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <header className="mb-8">
        <div className="glass-strong rounded-2xl p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl liquid-gradient flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gradient">OpenClaw Mission Control</h1>
              <p className="text-white/50 text-sm">Your personal AI assistant dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-2xl font-mono font-bold">
                {currentTime ? currentTime.toLocaleTimeString("en-US", { hour12: false }) : "--:--:--"}
              </p>
              <p className="text-white/50 text-sm">
                {currentTime ? currentTime.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" }) : "Loading..."}
              </p>
            </div>
            <div className="flex items-center gap-3">
            <a 
              href="http://127.0.0.1:18789" 
              target="_blank"
              className="px-4 py-2 rounded-lg glass text-white/70 text-sm font-medium hover:bg-white/10 transition-colors"
            >
              OpenClaw UI
            </a>
            <div className="w-10 h-10 rounded-full glass flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
              <Settings className="w-5 h-5 text-white/70" />
            </div>
          </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="mb-6">
        <div className="glass rounded-2xl p-2 flex gap-2 w-fit">
          {["overview", "daily", "sessions", "tasks", "channels", "settings"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl text-sm font-medium transition-all capitalize ${
                activeTab === tab
                  ? "bg-white/10 text-white"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-12 gap-6">
          {/* System Status */}
          <div className="col-span-12 lg:col-span-3">
            <GlassCard>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white/80 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  System Status
                </h3>
                <div className="flex items-center gap-2">
                  {statusLoading ? null : (
                    <StatusBadge status={status?.gateway.status === "online" ? "active" : "failed"} />
                  )}
                  <button 
                    onClick={() => window.location.reload()}
                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                    title="Refresh"
                  >
                    <RefreshCw className="w-4 h-4 text-white/50" />
                  </button>
                </div>
              </div>
              
              {statusLoading ? (
                <LoadingState />
              ) : status ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/50 text-sm">Gateway</span>
                    <span className="text-emerald-400 text-sm font-medium capitalize">
                      {status.gateway.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/50 text-sm">API Latency</span>
                    <span className="text-white text-sm font-medium">
                      {status.metrics.averageLatency}ms
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/50 text-sm">Uptime</span>
                    <span className="text-white text-sm font-medium">
                      {formatDuration(status.gateway.uptime)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/50 text-sm">Version</span>
                    <span className="text-white text-sm font-medium">{status.gateway.version}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/50 text-sm">Active Sessions</span>
                    <span className="text-white text-sm font-medium">{status.metrics.activeSessions}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/50 text-sm">Queued Tasks</span>
                    <span className="text-white text-sm font-medium">{status.metrics.queuedTasks}</span>
                  </div>
                </div>
              ) : null}
            </GlassCard>
          </div>

          {/* Active Sessions */}
          <div className="col-span-12 lg:col-span-5">
            <GlassCard>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white/80 flex items-center gap-2">
                  <Bot className="w-4 h-4 text-blue-400" />
                  Active Sessions
                </h3>
                <span className="text-white/50 text-sm">{sessions.length} sessions</span>
              </div>
              
              {sessionsLoading ? (
                <LoadingState />
              ) : (
                <div className="space-y-3">
                  {sessions.map((session) => (
                    <div
                      key={session.id}
                      onClick={() => setSelectedSession(session)}
                      className="glass-subtle rounded-xl p-4 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                          <Bot className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium text-white">{session.label}</p>
                          <p className="text-white/50 text-sm">{session.messageCount} messages</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <StatusBadge status={session.status} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </GlassCard>
          </div>

          {/* Quick Actions */}
          <div className="col-span-12 lg:col-span-4">
            <GlassCard>
              <h3 className="font-semibold text-white/80 mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: MessageSquare, label: "New Chat", color: "blue", action: () => window.open("https://discord.com/channels/@me", "_blank") },
                  { icon: Calendar, label: "Schedule", color: "purple", action: () => window.open("https://calendar.google.com", "_blank") },
                  { icon: Mail, label: "Send Email", color: "rose", action: () => window.open("https://gmail.com", "_blank") },
                  { icon: Github, label: "GitHub", color: "gray", action: () => window.open("https://github.com/aryanbiswas16", "_blank") },
                  { icon: Globe, label: "OG UI", color: "sky", action: () => window.open("http://127.0.0.1:18789", "_blank") },
                  { icon: Terminal, label: "Terminal", color: "emerald", action: () => window.open("terminal://", "_blank") },
                ].map((action, i) => (
                  <button
                    key={i}
                    onClick={action.action}
                    className="glass-subtle rounded-xl p-4 flex flex-col items-center gap-2 hover:bg-white/10 transition-all group"
                  >
                    <action.icon className={`w-6 h-6 text-${action.color}-400 group-hover:scale-110 transition-transform`} />
                    <span className="text-white/70 text-sm font-medium">{action.label}</span>
                  </button>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Task Queue */}
          <div className="col-span-12 lg:col-span-6">
            <GlassCard>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white/80 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-400" />
                  Task Queue
                </h3>
                <button 
                  onClick={() => setActiveTab("tasks")}
                  className="text-white/50 hover:text-white text-sm flex items-center gap-1"
                >
                  View All <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              
              {tasksLoading ? (
                <LoadingState />
              ) : (
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div key={task.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {task.type === "code" && <Terminal className="w-4 h-4 text-emerald-400" />}
                          {task.type === "research" && <Globe className="w-4 h-4 text-sky-400" />}
                          {task.type === "email" && <Mail className="w-4 h-4 text-rose-400" />}
                          {task.type === "calendar" && <Calendar className="w-4 h-4 text-purple-400" />}
                          <span className="text-white font-medium">{task.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <StatusBadge status={task.status} />
                          {task.status === "running" && (
                            <button 
                              onClick={() => cancelTask(task.id)}
                              className="p-1 hover:bg-rose-500/20 rounded transition-colors"
                            >
                              <Square className="w-4 h-4 text-rose-400" />
                            </button>
                          )}
                        </div>
                      </div>
                      <ProgressBar progress={task.progress} />
                    </div>
                  ))}
                </div>
              )}
            </GlassCard>
          </div>

          {/* Channel Activity */}
          <div className="col-span-12 lg:col-span-3">
            <GlassCard>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white/80 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-sky-400" />
                  Channels
                </h3>
                <span className="text-white/50 text-sm">
                  {channels.reduce((acc, c) => acc + c.unreadCount, 0)} unread
                </span>
              </div>
              
              {channelsLoading ? (
                <LoadingState />
              ) : (
                <div className="space-y-3">
                  {channels.map((channel) => (
                    <div
                      key={channel.id}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <ChannelIcon type={channel.type} />
                        <div>
                          <p className="font-medium text-white text-sm">{channel.name}</p>
                          <p className="text-white/40 text-xs">
                            {channel.enabled ? "Connected" : "Disabled"}
                          </p>
                        </div>
                      </div>
                      {channel.unreadCount > 0 && (
                        <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-xs flex items-center justify-center font-medium">
                          {channel.unreadCount}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </GlassCard>
          </div>

          {/* Performance Metrics */}
          <div className="col-span-12 lg:col-span-3">
            <GlassCard>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white/80 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-pink-400" />
                  Activity
                </h3>
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={metrics}>
                    <defs>
                      <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#007AFF" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#007AFF" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" stroke="rgba(255,255,255,0.3)" fontSize={10} />
                    <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(0,0,0,0.8)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        borderRadius: "8px",
                      }}
                      labelStyle={{ color: "white" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="requests"
                      stroke="#007AFF"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorRequests)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          </div>

          {/* Connected Services */}
          <div className="col-span-12">
            <GlassCard className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <Wifi className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Connected Services</p>
                    <p className="text-white/50 text-sm">
                      {status?.services.filter(s => s.status === "connected").length || 0} services active
                    </p>
                  </div>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div className="flex items-center gap-4">
                  {status?.services.map((service) => (
                    <span 
                      key={service.name} 
                      className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 ${
                        service.status === "connected" 
                          ? "glass-subtle text-white/70" 
                          : "bg-rose-500/20 text-rose-400"
                      }`}
                    >
                      {service.status === "connected" ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        <AlertCircle className="w-3 h-3" />
                      )}
                      {service.name}
                    </span>
                  ))}
                </div>
              </div>
              <a 
                href="http://127.0.0.1:18789" 
                target="_blank"
                className="px-4 py-2 rounded-lg liquid-gradient text-white font-medium text-sm hover:opacity-90 transition-opacity"
              >
                Open Control UI
              </a>
            </GlassCard>
          </div>
        </div>
      )}

      {/* Sessions Tab */}
      {activeTab === "sessions" && (
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Active Sessions</h2>
            <button className="px-4 py-2 rounded-lg liquid-gradient text-white font-medium text-sm">
              <Plus className="w-4 h-4 inline mr-2" />
              New Session
            </button>
          </div>
          {sessionsLoading ? (
            <LoadingState />
          ) : (
            <div className="space-y-4">
              {sessions.map((session) => (
                <div key={session.id} className="glass-subtle rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                        <Bot className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{session.label}</h3>
                        <p className="text-white/50 text-sm">{session.key}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <StatusBadge status={session.status} />
                      <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                        <Settings className="w-5 h-5 text-white/50" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tasks Tab */}
      {activeTab === "tasks" && (
        <div className="glass rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-6">Task Queue</h2>
          {tasksLoading ? (
            <LoadingState />
          ) : (
            <div className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="glass-subtle rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {task.type === "code" && <Terminal className="w-5 h-5 text-emerald-400" />}
                      {task.type === "research" && <Globe className="w-5 h-5 text-sky-400" />}
                      {task.type === "email" && <Mail className="w-5 h-5 text-rose-400" />}
                      {task.type === "calendar" && <Calendar className="w-5 h-5 text-purple-400" />}
                      <h3 className="font-semibold text-white">{task.name}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={task.status} />
                      {task.status === "running" && (
                        <button 
                          onClick={() => cancelTask(task.id)}
                          className="p-2 hover:bg-rose-500/20 rounded-lg transition-colors"
                        >
                          <Square className="w-4 h-4 text-rose-400" />
                        </button>
                      )}
                    </div>
                  </div>
                  <ProgressBar progress={task.progress} />
                  {task.description && (
                    <p className="text-white/50 text-sm mt-3">{task.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Channels Tab */}
      {activeTab === "channels" && (
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Connected Channels</h2>
            <button className="px-4 py-2 rounded-lg liquid-gradient text-white font-medium text-sm">
              <Plus className="w-4 h-4 inline mr-2" />
              Add Channel
            </button>
          </div>
          {channelsLoading ? (
            <LoadingState />
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {channels.map((channel) => (
                <div key={channel.id} className="glass-subtle rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <ChannelIcon type={channel.type} />
                      <div>
                        <h3 className="font-semibold text-white">{channel.name}</h3>
                        <p className="text-white/50 text-sm">
                          {channel.unreadCount} unread messages
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className={`w-12 h-6 rounded-full transition-colors ${
                          channel.enabled ? "bg-emerald-500" : "bg-white/20"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-white transition-transform ${
                            channel.enabled ? "translate-x-6" : "translate-x-0.5"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === "settings" && (
        <div className="glass rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-6">Settings</h2>
          <div className="space-y-6">
            <div className="glass-subtle rounded-xl p-6">
              <h3 className="font-semibold text-white mb-4">Gateway Configuration</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-white/50 text-sm">Gateway URL</label>
                  <input 
                    type="text" 
                    value="http://127.0.0.1:18789"
                    className="w-full mt-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                    readOnly
                  />
                </div>
                <div>
                  <label className="text-white/50 text-sm">API Token</label>
                  <input 
                    type="password" 
                    value="••••••••"
                    className="w-full mt-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                    readOnly
                  />
                </div>
              </div>
            </div>
            
            <div className="glass-subtle rounded-xl p-6">
              <h3 className="font-semibold text-white mb-4">Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white">Auto-refresh data</span>
                  <button className="w-12 h-6 rounded-full bg-emerald-500">
                    <div className="w-5 h-5 rounded-full bg-white translate-x-6" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white">Desktop notifications</span>
                  <button className="w-12 h-6 rounded-full bg-emerald-500">
                    <div className="w-5 h-5 rounded-full bg-white translate-x-6" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white">Dark mode</span>
                  <button className="w-12 h-6 rounded-full bg-emerald-500">
                    <div className="w-5 h-5 rounded-full bg-white translate-x-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Daily Tab - Todo & Focus Management */}
      {activeTab === "daily" && (
        <div className="grid grid-cols-12 gap-6">
          {/* Today's Focus */}
          <div className="col-span-12 lg:col-span-4">
            <GlassCard>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white/80 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  Today's Focus
                </h3>
                <span className="text-white/50 text-sm">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="space-y-3">
                <div className="p-4 glass-subtle rounded-xl">
                  <p className="text-white/70 text-sm mb-2">Primary Goal</p>
                  <p className="text-white font-medium">Complete OpenClaw Dashboard</p>
                </div>
                <div className="p-4 glass-subtle rounded-xl">
                  <p className="text-white/70 text-sm mb-2">Secondary</p>
                  <p className="text-white font-medium">Review professor cold emails</p>
                </div>
                <button 
                  onClick={() => window.open("https://calendar.google.com", "_blank")}
                  className="w-full py-3 rounded-xl liquid-gradient text-white font-medium text-sm"
                >
                  <Calendar className="w-4 h-4 inline mr-2" />
                  View Calendar
                </button>
              </div>
            </GlassCard>
          </div>

          {/* Quick Todo Creator */}
          <div className="col-span-12 lg:col-span-4">
            <GlassCard>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white/80 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Quick Add Todo
                </h3>
              </div>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="What needs to be done?"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/30"
                />
                <div className="flex gap-2">
                  <button className="flex-1 py-2 rounded-lg glass-subtle text-white/70 text-sm hover:bg-white/10">
                    High
                  </button>
                  <button className="flex-1 py-2 rounded-lg glass-subtle text-white/70 text-sm hover:bg-white/10">
                    Medium
                  </button>
                  <button className="flex-1 py-2 rounded-lg glass-subtle text-white/70 text-sm hover:bg-white/10">
                    Low
                  </button>
                </div>
                <button className="w-full py-3 rounded-xl bg-emerald-500/20 text-emerald-400 font-medium text-sm border border-emerald-500/30 hover:bg-emerald-500/30">
                  <Plus className="w-4 h-4 inline mr-2" />
                  Add to MEMORY.md
                </button>
              </div>
            </GlassCard>
          </div>

          {/* Active Todos */}
          <div className="col-span-12 lg:col-span-4">
            <GlassCard>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white/80 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  Active Todos
                </h3>
                <span className="text-white/50 text-sm">3 pending</span>
              </div>
              <div className="space-y-2">
                {[
                  { text: "Complete dashboard UI", done: true, priority: "high" },
                  { text: "Send cold emails to professors", done: false, priority: "high" },
                  { text: "Review GitHub notifications", done: false, priority: "medium" },
                  { text: "Update MEMORY.md", done: false, priority: "low" },
                ].map((todo, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 glass-subtle rounded-xl">
                    <button className={`w-5 h-5 rounded border ${todo.done ? 'bg-emerald-500 border-emerald-500' : 'border-white/30'} flex items-center justify-center`}>
                      {todo.done && <CheckCircle2 className="w-3 h-3 text-white" />}
                    </button>
                    <span className={`flex-1 text-sm ${todo.done ? 'text-white/50 line-through' : 'text-white'}`}>
                      {todo.text}
                    </span>
                    <span className={`w-2 h-2 rounded-full ${
                      todo.priority === 'high' ? 'bg-rose-500' : todo.priority === 'medium' ? 'bg-amber-500' : 'bg-blue-500'
                    }`} />
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Workspace Files */}
          <div className="col-span-12 lg:col-span-6">
            <GlassCard>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white/80 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-purple-400" />
                  Workspace Files
                </h3>
              </div>
              <div className="space-y-2">
                {[
                  { name: "MEMORY.md", type: "doc", path: "~/.openclaw/workspace/" },
                  { name: "AGENTS.md", type: "doc", path: "~/.openclaw/workspace/" },
                  { name: "USER.md", type: "doc", path: "~/.openclaw/workspace/" },
                  { name: "SOUL.md", type: "doc", path: "~/.openclaw/workspace/" },
                  { name: "TOOLS.md", type: "doc", path: "~/.openclaw/workspace/" },
                  { name: "HEARTBEAT.md", type: "doc", path: "~/.openclaw/workspace/" },
                ].map((file, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 glass-subtle rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <span className="text-blue-400 text-xs font-bold">MD</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">{file.name}</p>
                      <p className="text-white/40 text-xs">{file.path}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/30" />
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Quick Commands */}
          <div className="col-span-12 lg:col-span-6">
            <GlassCard>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white/80 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  Quick Commands
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "OpenClaw Status", cmd: "openclaw status" },
                  { label: "View Logs", cmd: "openclaw logs --follow" },
                  { label: "Security Audit", cmd: "openclaw security audit" },
                  { label: "Update Check", cmd: "openclaw update check" },
                  { label: "Restart Gateway", cmd: "openclaw gateway restart" },
                  { label: "Session List", cmd: "openclaw sessions list" },
                ].map((cmd, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      navigator.clipboard.writeText(cmd.cmd);
                      alert(`Copied: ${cmd.cmd}`);
                    }}
                    className="p-4 glass-subtle rounded-xl text-left hover:bg-white/10 transition-colors"
                  >
                    <p className="text-white text-sm font-medium">{cmd.label}</p>
                    <p className="text-white/40 text-xs font-mono mt-1">{cmd.cmd}</p>
                  </button>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      )}

      {/* Session Detail Modal */}
      {selectedSession && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedSession(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-strong rounded-2xl p-6 max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Session Details</h3>
              <button 
                onClick={() => setSelectedSession(null)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-white/50 text-sm">Name</label>
                <p className="text-white font-medium">{selectedSession.label}</p>
              </div>
              <div>
                <label className="text-white/50 text-sm">Session Key</label>
                <p className="text-white font-mono text-sm">{selectedSession.key}</p>
              </div>
              <div>
                <label className="text-white/50 text-sm">Status</label>
                <div className="mt-1">
                  <StatusBadge status={selectedSession.status} />
                </div>
              </div>
              <div>
                <label className="text-white/50 text-sm">Messages</label>
                <p className="text-white">{selectedSession.messageCount}</p>
              </div>
              <div>
                <label className="text-white/50 text-sm">Created</label>
                <p className="text-white">{new Date(selectedSession.createdAt).toLocaleString()}</p>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button className="flex-1 px-4 py-2 rounded-lg liquid-gradient text-white font-medium">
                Open Session
              </button>
              <button className="px-4 py-2 rounded-lg glass-subtle text-white font-medium">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}