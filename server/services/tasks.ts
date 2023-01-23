import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { v4 as uuidv4 } from "uuid";
import type { Task } from "../../src/interfaces/task";

export class Tasks {
  private dataPath: string;
  private timer: ReturnType<typeof setInterval>;
  private autoSaveInterval: number = 5000;
  private saveLock: boolean = false;
  public tasks: Task[];

  constructor(path?: string) {
    this.dataPath = resolve(__dirname, path || "../data/tasks.json");
    this.load();
    this.autoSave();
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
      // throw error;
    }
  }

  /**
   * @description Save current task to persistence storage
   */
  save() {
    if (this.saveLock) {
      return;
    }
    try {
      console.log("Data save now.");
      this.saveLock = true;
      writeFileSync(this.dataPath, JSON.stringify(this.tasks));
      this.saveLock = false;
      console.log("Save data is completed");
    } catch (error) {
      console.error(`Save data file error! ${error.toString()}`);
      throw error;
    }
  }

  /**
   * @description Auto save tasks to file every n second; default: n = 5 second
   */
  autoSave() {
    this.timer = setInterval(() => {
      console.log(`${new Date()}: [INFO] Auto saving now...`);
      this.save();
    }, this.autoSaveInterval);
  }
}

export const tasksDb = new Tasks();
