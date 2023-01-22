import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { v4 as uuidv4 } from "uuid";
import type { Task } from "../src/interfaces/task";

export class Tasks {
  private dataPath: string;
  public tasks: Task[];

  constructor(path: string) {
    this.dataPath = resolve(__dirname, path);
  }

  /**
   * @description Add id and create date to task before put the task into task list
   * @param task
   */
  add(task: Task) {
    task.id = uuidv4();
    task.createdAt = new Date().getTime();
    this.tasks.push(task);
  }

  /**
   * @description Clear the task list
   */
  clear() {
    this.tasks = [];
    this.save();
  }

  /**
   * @description Remove task from task list based on task.id
   * @param task
   */
  delete(task: Task) {
    const tasks: Task[] = this.tasks.filter((tk) => tk.id !== task.id);
    this.tasks = tasks;
  }

  /**
   * @description Get current task list
   * @returns Tasks
   */
  getTasks(): Task[] {
    return this.tasks;
  }

  /**
   * @description Load tasks from data file
   */
  load() {
    try {
      this.tasks = JSON.parse(readFileSync(this.dataPath).toString());
    } catch (error) {
      this.tasks = [];
      console.error(`Load data file error! ${error.toString()}`);
      throw error;
    }
  }

  /**
   * @description Save current task to persistence storage
   */
  save() {
    try {
      writeFileSync(this.dataPath, JSON.stringify(this.tasks));
    } catch (error) {
      console.error(`Save data file error! ${error.toString()}`);
      throw error;
    }
  }
}
