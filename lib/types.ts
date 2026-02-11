// OpenClaw API Types

export interface Session {
  id: string;
  key: string;
  label?: string;
  agentId?: string;
  kind: "main" | "subagent" | "isolated";
  status: "active" | "idle" | "paused" | "completed";
  createdAt: string;
  lastActiveAt: string;
  messageCount: number;
  metadata?: Record<string, unknown>;
}

export interface Task {
  id: string;
  sessionId: string;
  name: string;
  description?: string;
  status: "pending" | "running" | "completed" | "failed" | "cancelled";
  progress: number;
  type: string;
  createdAt: string;
  updatedAt: string;
  result?: unknown;
  error?: string;
}

export interface Channel {
  id: string;
  name: string;
  type: "discord" | "telegram" | "whatsapp" | "email" | "slack" | "signal" | "imessage";
  enabled: boolean;
  unreadCount: number;
  lastMessageAt?: string;
  config: {
    token?: string;
    webhook?: string;
    phoneNumber?: string;
    email?: string;
  };
}

export interface SystemStatus {
  gateway: {
    status: "online" | "offline" | "degraded";
    version: string;
    uptime: number;
    startTime: string;
  };
  metrics: {
    totalRequests: number;
    requestsPerMinute: number;
    averageLatency: number;
    activeSessions: number;
    queuedTasks: number;
  };
  services: {
    name: string;
    status: "connected" | "disconnected" | "error";
    lastCheck: string;
  }[];
}

export interface CronJob {
  id: string;
  name: string;
  schedule: string;
  enabled: boolean;
  lastRun?: string;
  nextRun?: string;
  status: "idle" | "running" | "error";
}

export interface AgentConfig {
  id: string;
  name: string;
  model: string;
  thinking?: boolean;
  tools: string[];
  enabled: boolean;
}