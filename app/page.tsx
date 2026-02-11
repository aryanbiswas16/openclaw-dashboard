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
  Server,
  Calendar,
  Mail,
  Github,
  Globe,
  Terminal,
  Cpu,
  Wifi,
  ChevronRight,
  Plus,
  MoreHorizontal,
  Play,
  Pause,
  Square,
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Types
interface Session {
  id: string;
  name: string;
  status: "active" | "idle" | "paused";
  lastActive: string;
  messages: number;
}

interface Task {
  id: string;
  name: string;
  status: "running" | "queued" | "completed" | "failed";
  progress: number;
  type: string;
}

interface Channel {
  id: string;
  name: string;
  type: "discord" | "telegram" | "whatsapp" | "email";
  unread: number;
  lastMessage: string;
}

// Mock Data
const mockSessions: Session[] = [
  { id: "1", name: "Main Agent", status: "active", lastActive: "2m ago", messages: 42 },
  { id: "2", name: "Research Assistant", status: "idle", lastActive: "15m ago", messages: 128 },
  { id: "3", name: "Code Reviewer", status: "paused", lastActive: "1h ago", messages: 15 },
];

const mockTasks: Task[] = [
  { id: "1", name: "Web Research: Professors", status: "running", progress: 75, type: "research" },
  { id: "2", name: "Email: Draft Cold Outreach", status: "queued", progress: 0, type: "email" },
  { id: "3", name: "GitHub: Commit Dashboard", status: "completed", progress: 100, type: "code" },
  { id: "4", name: "Calendar: Schedule Meeting", status: "running", progress: 30, type: "calendar" },
];

const mockChannels: Channel[] = [
  { id: "1", name: "Discord #general", type: "discord", unread: 3, lastMessage: "2m ago" },
  { id: "2", name: "Telegram Personal", type: "telegram", unread: 0, lastMessage: "1h ago" },
  { id: "3", name: "WhatsApp Work", type: "whatsapp", unread: 5, lastMessage: "5m ago" },
  { id: "4", name: "Gmail", type: "email", unread: 12, lastMessage: "10m ago" },
];

const mockMetrics = [
  { time: "00:00", requests: 12, latency: 150 },
  { time: "04:00", requests: 8, latency: 120 },
  { time: "08:00", requests: 45, latency: 180 },
  { time: "12:00", requests: 78, latency: 200 },
  { time: "16:00", requests: 65, latency: 175 },
  { time: "20:00", requests: 35, latency: 140 },
  { time: "23:59", requests: 20, latency: 130 },
];

// Components
function GlassCard({ children, className = "", hover = true }: { children: React.ReactNode; className?: string; hover?: boolean }) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -2 } : {}}
      transition={{ duration: 0.2 }}
      className={`glass rounded-2xl p-6 ${className}`}
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
  const icons: Record<string, React.ReactNode> = {
    discord: <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">D</div>,
    telegram: <div className="w-8 h-8 rounded-lg bg-sky-500/20 flex items-center justify-center text-sky-400">T</div>,
    whatsapp: <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">W</div>,
    email: <div className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center text-rose-400">@</div>,
  };
  return icons[type] || null;
}

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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
                {currentTime.toLocaleTimeString("en-US", { hour12: false })}
              </p>
              <p className="text-white/50 text-sm">
                {currentTime.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full glass flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
              <Settings className="w-5 h-5 text-white/70" />
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="mb-6">
        <div className="glass rounded-2xl p-2 flex gap-2 w-fit">
          {["overview", "sessions", "tasks", "channels", "settings"].map((tab) => (
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

      {/* Main Dashboard Grid */}
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
                <StatusBadge status="active" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/50 text-sm">Gateway</span>
                  <span className="text-emerald-400 text-sm font-medium">Online</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/50 text-sm">API Latency</span>
                  <span className="text-white text-sm font-medium">145ms</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/50 text-sm">Uptime</span>
                  <span className="text-white text-sm font-medium">3d 12h 45m</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/50 text-sm">Version</span>
                  <span className="text-white text-sm font-medium">2026.2.3</span>
                </div>
              </div>
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
                <span className="text-white/50 text-sm">{mockSessions.length} sessions</span>
              </div>
              <div className="space-y-3">
                {mockSessions.map((session) => (
                  <div
                    key={session.id}
                    className="glass-subtle rounded-xl p-4 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{session.name}</p>
                        <p className="text-white/50 text-sm">{session.messages} messages</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <StatusBadge status={session.status} />
                      <span className="text-white/30 text-sm">{session.lastActive}</span>
                    </div>
                  </div>
                ))}
              </div>
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
                  { icon: MessageSquare, label: "New Chat", color: "blue" },
                  { icon: Calendar, label: "Schedule", color: "purple" },
                  { icon: Mail, label: "Send Email", color: "rose" },
                  { icon: Github, label: "GitHub", color: "gray" },
                  { icon: Globe, label: "Web Search", color: "sky" },
                  { icon: Terminal, label: "Terminal", color: "emerald" },
                ].map((action, i) => (
                  <button
                    key={i}
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
                <button className="text-white/50 hover:text-white text-sm flex items-center gap-1">
                  View All <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
                {mockTasks.map((task) => (
                  <div key={task.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {task.type === "code" && <Terminal className="w-4 h-4 text-emerald-400" />}
                        {task.type === "research" && <Globe className="w-4 h-4 text-sky-400" />}
                        {task.type === "email" && <Mail className="w-4 h-4 text-rose-400" />}
                        {task.type === "calendar" && <Calendar className="w-4 h-4 text-purple-400" />}
                        <span className="text-white font-medium">{task.name}</span>
                      </div>
                      <StatusBadge status={task.status} />
                    </div>
                    <ProgressBar progress={task.progress} />
                  </div>
                ))}
              </div>
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
                  {mockChannels.reduce((acc, c) => acc + c.unread, 0)} unread
                </span>
              </div>
              <div className="space-y-3">
                {mockChannels.map((channel) => (
                  <div
                    key={channel.id}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <ChannelIcon type={channel.type} />
                      <div>
                        <p className="font-medium text-white text-sm">{channel.name}</p>
                        <p className="text-white/40 text-xs">{channel.lastMessage}</p>
                      </div>
                    </div>
                    {channel.unread > 0 && (
                      <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-xs flex items-center justify-center font-medium">
                        {channel.unread}
                      </span>
                    )}
                  </div>
                ))}
              </div>
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
                  <LineChart data={mockMetrics}>
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
                    <Line
                      type="monotone"
                      dataKey="requests"
                      stroke="#007AFF"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
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
                    <p className="text-white/50 text-sm">8 services active</p>
                  </div>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div className="flex items-center gap-4">
                  {["Discord", "Telegram", "Gmail", "GitHub", "Calendar"].map((service) => (
                    <span key={service} className="px-3 py-1.5 rounded-lg glass-subtle text-sm text-white/70">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
              <button className="px-4 py-2 rounded-lg liquid-gradient text-white font-medium text-sm hover:opacity-90 transition-opacity">
                <Plus className="w-4 h-4 inline mr-2" />
                Add Service
              </button>
            </GlassCard>
          </div>
        </div>
      )}

      {/* Sessions Tab */}
      {activeTab === "sessions" && (
        <div className="glass rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-6">Active Sessions</h2>
          <p className="text-white/50">Session management interface coming soon...</p>
        </div>
      )}

      {/* Tasks Tab */}
      {activeTab === "tasks" && (
        <div className="glass rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-6">Task Queue</h2>
          <p className="text-white/50">Advanced task management coming soon...</p>
        </div>
      )}

      {/* Channels Tab */}
      {activeTab === "channels" && (
        <div className="glass rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-6">Connected Channels</h2>
          <p className="text-white/50">Channel configuration coming soon...</p>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === "settings" && (
        <div className="glass rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-6">Settings</h2>
          <p className="text-white/50">Configuration panel coming soon...</p>
        </div>
      )}
    </div>
  );
}