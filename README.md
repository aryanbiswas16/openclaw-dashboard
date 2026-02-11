# 🦞 OpenClaw Mission Control

A beautiful, Liquid Glass-inspired dashboard for managing your OpenClaw AI assistant.

![Dashboard Preview](./preview.png)

## ✨ Features

- **🎨 Liquid Glass UI** — Apple-inspired glassmorphism design with smooth animations
- **📊 Real-time Monitoring** — Live data polling for sessions, tasks, channels, and system status
- **🚀 Quick Actions** — One-click access to common operations
- **📈 Activity Metrics** — Visualize usage patterns and performance with charts
- **🔔 Unified Inbox** — Monitor all connected channels (Discord, Telegram, WhatsApp, Email)
- **⚡ Full API Integration** — Real OpenClaw API client with type-safe hooks
- **🔧 Session Management** — View, control, and interact with agent sessions
- **📋 Task Queue** — Monitor and manage background tasks with progress tracking
- **⚙️ Settings Panel** — Configure gateway, preferences, and services

## 🛠 Tech Stack

- **Next.js 16** — React framework with App Router
- **TypeScript** — Type-safe development
- **Tailwind CSS** — Utility-first styling
- **Framer Motion** — Smooth animations
- **Recharts** — Data visualization
- **Radix UI** — Accessible components
- **Lucide Icons** — Beautiful iconography

## 🚀 Getting Started

### Prerequisites

- Node.js 22+
- npm or yarn
- OpenClaw Gateway running locally

### Installation

```bash
# Clone the repository
git clone https://github.com/aryanbiswas16/openclaw-dashboard.git
cd openclaw-dashboard

# Install dependencies
npm install

# Configure environment (optional)
cp .env.example .env.local
# Edit .env.local with your OpenClaw gateway URL

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 🔌 OpenClaw Integration

The dashboard connects to your local OpenClaw Gateway:

```typescript
// lib/api.ts
const GATEWAY_URL = "http://127.0.0.1:18789";
```

### Features

- **Live Session Monitoring** — Real-time updates every 5 seconds
- **Task Queue Management** — Track progress, cancel tasks
- **Channel Status** — Monitor all messaging channels
- **System Metrics** — Gateway health, latency, uptime
- **Cron Job Management** — View and toggle scheduled tasks

### Data Hooks

```typescript
import { useSessions, useTasks, useSystemStatus, useChannels } from "@/lib/hooks";

// Auto-refreshing data
const { sessions, loading, error } = useSessions();
const { tasks, cancelTask } = useTasks();
const { status } = useSystemStatus();
const { channels, toggleChannel } = useChannels();
```

## 🎨 Design System

### Liquid Glass Effect

The dashboard uses a custom glassmorphism design system:

```css
.glass          /* Standard glass card */
.glass-strong   /* Prominent glass surfaces */
.glass-subtle   /* Minimal glass effect */
.liquid-gradient /* Animated gradient backgrounds */
```

### Color Palette

- **Background**: Deep black with gradient overlays
- **Glass Surfaces**: White with 5-15% opacity
- **Accents**: Blue (#007AFF), Purple (#AF52DE), Pink (#FF2D55)
- **Status Colors**: Emerald (active), Amber (idle), Rose (error)

## 📁 Project Structure

```
openclaw-dashboard/
├── app/
│   ├── globals.css      # Global styles & glass effects
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Main dashboard with tabs
├── lib/
│   ├── types.ts         # TypeScript interfaces
│   ├── api.ts           # OpenClaw API client
│   └── hooks.ts         # React hooks for data fetching
├── components/          # Reusable components (future)
├── public/              # Static assets
├── tailwind.config.ts   # Tailwind configuration
└── package.json
```

## 🔄 Real-time Updates

The dashboard automatically polls the OpenClaw Gateway:

- **Sessions**: Every 5 seconds
- **Tasks**: Every 3 seconds
- **System Status**: Every 2 seconds
- **Channels**: Every 5 seconds

## 📝 Tabs

### Overview
System status, active sessions, task queue, channel activity, and performance metrics.

### Sessions
Detailed session management with ability to view, pause, resume, and interact with agent sessions.

### Tasks
Full task queue with progress tracking, cancel functionality, and task history.

### Channels
Manage all connected messaging channels (Discord, Telegram, WhatsApp, Email, etc.) with toggle controls.

### Settings
Gateway configuration, API tokens, preferences, and appearance settings.

## 🛣 Roadmap

- [ ] WebSocket integration for real-time updates (replace polling)
- [ ] Authentication & security
- [ ] Mobile-responsive design
- [ ] Dark/light mode toggle
- [ ] Customizable widgets
- [ ] Plugin system for extensions
- [ ] Session chat interface
- [ ] Task creation and scheduling
- [ ] Log viewer
- [ ] Memory management UI

## 🤝 Contributing

This is a personal dashboard for OpenClaw. Feel free to fork and customize for your own setup!

### Development

```bash
# Run linter
npm run lint

# Build for production
npm run build
```

## 📄 License

MIT License — see LICENSE for details.

---

Built with ⚡ by Thor for OpenClaw

**Live Demo**: [https://github.com/aryanbiswas16/openclaw-dashboard](https://github.com/aryanbiswas16/openclaw-dashboard)