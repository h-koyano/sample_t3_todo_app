import z from "zod";

export const createTaskSchema = z.object({
  title: z
    .string()
    .nonempty({ message: "入力が必須です" })
    .max(20, "20文字以内で入力してください。文字多すぎだ、ボケ"),
  body: z.string().min(5, "5文字以上いれろ、ボケ"),
});

export type CreateTaskInput = z.TypeOf<typeof createTaskSchema>;

export const updateTaskSchema = z.object({
  taskId: z.string().cuid(),
  title: z.string().max(20),
  body: z.string().min(5),
});

export type UpdateTaskInput = z.TypeOf<typeof updateTaskSchema>;

export const getSingleTaskSchema = z.object({
  taskId: z.string().cuid(),
});

export const deleteTaskSchema = z.object({
  taskId: z.string().cuid(),
});
