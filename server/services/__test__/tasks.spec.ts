import { describe, it, expect } from "vitest";
import { tasksDb } from "../tasks";

describe("Tasks DB", () => {
  it("Add task", () => {
    tasksDb.tasks = [];
    tasksDb.add({
      title: "Title",
      description: "Description",
      color: "green",
    });
    expect(tasksDb.tasks.length).toEqual(1);
  });
  it("Remove task", () => {
    tasksDb.tasks = [
      {
        id: "1",
        title: "Title",
        description: "Description",
        color: "green",
      },
    ];
    tasksDb.delete({
      id: "1",
      title: "title",
      description: "Description",
      color: "green",
    });
    expect(tasksDb.tasks.length).toEqual(0);
  });
});
