"use client";

import { useState, useEffect, useCallback } from "react";
import { openclaw } from "./api";
import { Session, Task, Channel, SystemStatus, CronJob } from "./types";

// Hook for sessions
export function useSessions() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSessions = useCallback(async () => {
    try {
      setLoading(true);
      const data = await openclaw.getSessions();
      setSessions(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch sessions"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSessions();
    const interval = setInterval(fetchSessions, 5000); // Poll every 5s
    return () => clearInterval(interval);
  }, [fetchSessions]);

  return { sessions, loading, error, refetch: fetchSessions };
}

// Hook for tasks
export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await openclaw.getTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch tasks"));
    } finally {
      setLoading(false);
    }
  }, []);

  const cancelTask = useCallback(async (id: string) => {
    await openclaw.cancelTask(id);
    await fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    fetchTasks();
    const interval = setInterval(fetchTasks, 3000); // Poll every 3s
    return () => clearInterval(interval);
  }, [fetchTasks]);

  return { tasks, loading, error, refetch: fetchTasks, cancelTask };
}

// Hook for system status
export function useSystemStatus() {
  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchStatus = useCallback(async () => {
    try {
      setLoading(true);
      const data = await openclaw.getSystemStatus();
      setStatus(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch status"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 2000); // Poll every 2s
    return () => clearInterval(interval);
  }, [fetchStatus]);

  return { status, loading, error, refetch: fetchStatus };
}

// Hook for channels
export function useChannels() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchChannels = useCallback(async () => {
    try {
      setLoading(true);
      const data = await openclaw.getChannels();
      setChannels(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch channels"));
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleChannel = useCallback(async (id: string, enabled: boolean) => {
    await openclaw.toggleChannel(id, enabled);
    await fetchChannels();
  }, [fetchChannels]);

  useEffect(() => {
    fetchChannels();
    const interval = setInterval(fetchChannels, 5000);
    return () => clearInterval(interval);
  }, [fetchChannels]);

  return { channels, loading, error, refetch: fetchChannels, toggleChannel };
}

// Hook for cron jobs
export function useCronJobs() {
  const [jobs, setJobs] = useState<CronJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      const data = await openclaw.getCronJobs();
      setJobs(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch jobs"));
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleJob = useCallback(async (id: string, enabled: boolean) => {
    await openclaw.toggleCronJob(id, enabled);
    await fetchJobs();
  }, [fetchJobs]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return { jobs, loading, error, refetch: fetchJobs, toggleJob };
}

// Format relative time
export function useRelativeTime(date: string | Date) {
  const [relative, setRelative] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const then = new Date(date);
      const diff = now.getTime() - then.getTime();
      
      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (seconds < 60) setRelative("just now");
      else if (minutes < 60) setRelative(`${minutes}m ago`);
      else if (hours < 24) setRelative(`${hours}h ago`);
      else setRelative(`${days}d ago`);
    };

    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, [date]);

  return relative;
}

// Format duration
export function useDuration() {
  const format = useCallback((seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    
    if (days > 0) return `${days}d ${hours}h ${mins}m`;
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m`;
  }, []);

  return format;
}