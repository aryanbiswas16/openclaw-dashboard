# 🦞 OpenClaw Mission Control

A beautiful, Liquid Glass-inspired dashboard for managing your OpenClaw AI assistant.

![Dashboard Preview](./preview.png)

## ✨ Features

- **🎨 Liquid Glass UI** — Apple-inspired glassmorphism design with smooth animations
- **📊 Real-time Monitoring** — Track sessions, tasks, channels, and system status
- **🚀 Quick Actions** — One-click access to common operations
- **📈 Activity Metrics** — Visualize usage patterns and performance
- **🔔 Unified Inbox** — Monitor all connected channels (Discord, Telegram, WhatsApp, Email)

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

### Installation

```bash
# Navigate to the dashboard directory
cd /Users/drdeathwish/.openclaw/workspace/openclaw-dashboard

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
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
│   └── page.tsx         # Main dashboard
├── components/          # Reusable components (future)
├── lib/                 # Utilities & hooks (future)
├── public/              # Static assets
├── tailwind.config.ts   # Tailwind configuration
└── package.json
```

## 🔌 OpenClaw Integration (Planned)

Future versions will include:

- **Live Session Management** — View and control active agent sessions
- **Real-time Task Queue** — Monitor and manage background tasks
- **Channel Configuration** — Add/remove messaging channels
- **Cron Job Management** — Schedule and view recurring tasks
- **API Key Management** — Configure service credentials
- **System Logs** — View gateway and agent logs

## 📝 Roadmap

- [ ] WebSocket integration for real-time updates
- [ ] OpenClaw API client
- [ ] Authentication & security
- [ ] Mobile-responsive design
- [ ] Dark/light mode toggle
- [ ] Customizable widgets
- [ ] Plugin system for extensions

## 🤝 Contributing

This is a personal dashboard for OpenClaw. Feel free to fork and customize for your own setup!

## 📄 License

MIT License — see LICENSE for details.

---

Built with ⚡ by Thor for OpenClaw