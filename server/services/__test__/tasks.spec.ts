import { describe, it, expect } from "vitest";
import { Tasks } from "../services/tasks";

const filePath = "";
const taskDb = new Tasks(filePath);

describe("Tasks DB", () => {
  it("Add task", () => {
    taskDb.tasks = [];
    taskDb.add({
      title: "Title",
      description: "Description",
      color: "green",
    });
    expect(taskDb.tasks.length).toEqual(1);
  });
  it("Remove task", () => {
    taskDb.tasks = [
      {
        id: "1",
        title: "Title",
        description: "Description",
        color: "green",
      },
    ];
    taskDb.delete({
      id: "1",
      title: "title",
      description: "Description",
      color: "green",
    });
    expect(taskDb.tasks.length).toEqual(0);
  });
});
