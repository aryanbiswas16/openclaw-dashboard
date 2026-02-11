// OpenClaw API Client
import { Session, Task, Channel, SystemStatus, CronJob, AgentConfig } from "./types";

const GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL || "http://127.0.0.1:18789";
const GATEWAY_TOKEN = process.env.NEXT_PUBLIC_GATEWAY_TOKEN || "";

class OpenClawAPI {
  private baseUrl: string;
  private token: string;

  constructor(baseUrl = GATEWAY_URL, token = GATEWAY_TOKEN) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
      ...options?.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  }

  // Sessions
  async getSessions(): Promise<Session[]> {
    // This would connect to the actual OpenClaw sessions API
    // For now, return mock data that matches the real structure
    return this.getMockSessions();
  }

  async getSession(key: string): Promise<Session | null> {
    const sessions = await this.getSessions();
    return sessions.find((s) => s.key === key) || null;
  }

  async sendMessage(sessionKey: string, message: string): Promise<void> {
    await this.request(`/sessions/${sessionKey}/send`, {
      method: "POST",
      body: JSON.stringify({ message }),
    });
  }

  // Tasks
  async getTasks(): Promise<Task[]> {
    return this.getMockTasks();
  }

  async getTask(id: string): Promise<Task | null> {
    const tasks = await this.getTasks();
    return tasks.find((t) => t.id === id) || null;
  }

  async cancelTask(id: string): Promise<void> {
    await this.request(`/tasks/${id}/cancel`, { method: "POST" });
  }

  // System Status
  async getSystemStatus(): Promise<SystemStatus> {
    return this.getMockSystemStatus();
  }

  // Channels
  async getChannels(): Promise<Channel[]> {
    return this.getMockChannels();
  }

  async toggleChannel(id: string, enabled: boolean): Promise<void> {
    await this.request(`/channels/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ enabled }),
    });
  }

  // Cron Jobs
  async getCronJobs(): Promise<CronJob[]> {
    return this.getMockCronJobs();
  }

  async toggleCronJob(id: string, enabled: boolean): Promise<void> {
    await this.request(`/cron/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ enabled }),
    });
  }

  // Agents
  async getAgents(): Promise<AgentConfig[]> {
    return this.getMockAgents();
  }

  // Mock Data (until real API is connected)
  private getMockSessions(): Session[] {
    return [
      {
        id: "1",
        key: "main:aryan",
        label: "Main Agent",
        agentId: "main",
        kind: "main",
        status: "active",
        createdAt: new Date().toISOString(),
        lastActiveAt: new Date().toISOString(),
        messageCount: 156,
      },
      {
        id: "2",
        key: "subagent:research-1",
        label: "Research Assistant",
        agentId: "researcher",
        kind: "subagent",
        status: "idle",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        lastActiveAt: new Date(Date.now() - 900000).toISOString(),
        messageCount: 42,
      },
      {
        id: "3",
        key: "subagent:coder-1",
        label: "Code Reviewer",
        agentId: "coder",
        kind: "subagent",
        status: "paused",
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        lastActiveAt: new Date(Date.now() - 3600000).toISOString(),
        messageCount: 23,
      },
    ];
  }

  private getMockTasks(): Task[] {
    return [
      {
        id: "task-1",
        sessionId: "subagent:research-1",
        name: "Web Research: Professors",
        description: "Researching professors for cold email outreach",
        status: "running",
        progress: 75,
        type: "research",
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "task-2",
        sessionId: "main:aryan",
        name: "Draft Cold Outreach Emails",
        description: "Creating personalized email drafts",
        status: "queued",
        progress: 0,
        type: "email",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "task-3",
        sessionId: "subagent:coder-1",
        name: "Build Dashboard UI",
        description: "Creating OpenClaw Mission Control dashboard",
        status: "completed",
        progress: 100,
        type: "code",
        createdAt: new Date(Date.now() - 7200000).toISOString(),
        updatedAt: new Date(Date.now() - 1800000).toISOString(),
      },
    ];
  }

  private getMockSystemStatus(): SystemStatus {
    return {
      gateway: {
        status: "online",
        version: "2026.2.3",
        uptime: 309600,
        startTime: new Date(Date.now() - 309600000).toISOString(),
      },
      metrics: {
        totalRequests: 15234,
        requestsPerMinute: 12,
        averageLatency: 145,
        activeSessions: 3,
        queuedTasks: 1,
      },
      services: [
        { name: "Discord", status: "connected", lastCheck: new Date().toISOString() },
        { name: "Telegram", status: "connected", lastCheck: new Date().toISOString() },
        { name: "Gmail", status: "connected", lastCheck: new Date().toISOString() },
        { name: "GitHub", status: "connected", lastCheck: new Date().toISOString() },
        { name: "Calendar", status: "connected", lastCheck: new Date().toISOString() },
      ],
    };
  }

  private getMockChannels(): Channel[] {
    return [
      {
        id: "discord-1",
        name: "Discord #general",
        type: "discord",
        enabled: true,
        unreadCount: 3,
        lastMessageAt: new Date(Date.now() - 120000).toISOString(),
        config: { token: "***" },
      },
      {
        id: "telegram-1",
        name: "Telegram Personal",
        type: "telegram",
        enabled: true,
        unreadCount: 0,
        lastMessageAt: new Date(Date.now() - 3600000).toISOString(),
        config: { token: "***" },
      },
      {
        id: "whatsapp-1",
        name: "WhatsApp Work",
        type: "whatsapp",
        enabled: true,
        unreadCount: 5,
        lastMessageAt: new Date(Date.now() - 300000).toISOString(),
        config: { phoneNumber: "+1***" },
      },
      {
        id: "email-1",
        name: "Gmail",
        type: "email",
        enabled: true,
        unreadCount: 12,
        lastMessageAt: new Date(Date.now() - 600000).toISOString(),
        config: { email: "openclawthors@gmail.com" },
      },
    ];
  }

  private getMockCronJobs(): CronJob[] {
    return [
      {
        id: "cron-1",
        name: "Morning Briefing",
        schedule: "0 8 * * *",
        enabled: true,
        lastRun: new Date(Date.now() - 86400000).toISOString(),
        nextRun: new Date(Date.now() + 3600000).toISOString(),
        status: "idle",
      },
      {
        id: "cron-2",
        name: "Email Check",
        schedule: "*/30 * * * *",
        enabled: true,
        lastRun: new Date(Date.now() - 1800000).toISOString(),
        nextRun: new Date(Date.now() + 1800000).toISOString(),
        status: "idle",
      },
    ];
  }

  private getMockAgents(): AgentConfig[] {
    return [
      {
        id: "main",
        name: "Thor",
        model: "moonshot/kimi-k2.5",
        thinking: false,
        tools: ["web_fetch", "exec", "browser", "message"],
        enabled: true,
      },
      {
        id: "researcher",
        name: "Research Assistant",
        model: "moonshot/kimi-k2.5",
        thinking: true,
        tools: ["web_search", "web_fetch", "sessions_send"],
        enabled: true,
      },
      {
        id: "coder",
        name: "Code Assistant",
        model: "moonshot/kimi-k2.5",
        thinking: true,
        tools: ["exec", "read", "write", "edit", "github"],
        enabled: true,
      },
    ];
  }
}

export const openclaw = new OpenClawAPI();
export default OpenClawAPI;