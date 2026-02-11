// Memory/Todo management utilities

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
  createdAt: string;
  tags: string[];
}

export interface MemoryEntry {
  date: string;
  content: string;
  tags: string[];
}

// Read MEMORY.md content
export async function readMemory(): Promise<string> {
  try {
    const response = await fetch("/api/memory");
    if (!response.ok) throw new Error("Failed to read memory");
    return await response.text();
  } catch {
    // Fallback: return default structure
    return `# MEMORY.md

## Active Projects
- OpenClaw Dashboard Development

## TODOs
- [ ] Review dashboard features

## Notes
- Dashboard is running at http://localhost:3000
`;
  }
}

// Parse todos from memory content
export function parseTodos(content: string): Todo[] {
  const todos: Todo[] = [];
  const lines = content.split("\n");
  
  lines.forEach((line, index) => {
    const match = line.match(/^- \[([ x])\] (.+)$/);
    if (match) {
      todos.push({
        id: `todo-${index}`,
        text: match[2],
        completed: match[1] === "x",
        priority: line.includes("!") ? "high" : line.includes("?") ? "low" : "medium",
        createdAt: new Date().toISOString(),
        tags: extractTags(line),
      });
    }
  });
  
  return todos;
}

// Extract tags from text
function extractTags(text: string): string[] {
  const matches = text.match(/#\w+/g);
  return matches ? matches.map(t => t.slice(1)) : [];
}

// Format todo for memory file
export function formatTodo(todo: Todo): string {
  const checkbox = todo.completed ? "x" : " ";
  const priority = todo.priority === "high" ? " !" : todo.priority === "low" ? " ?" : "";
  const tags = todo.tags.length > 0 ? " " + todo.tags.map(t => `#${t}`).join(" ") : "";
  return `- [${checkbox}] ${todo.text}${priority}${tags}`;
}