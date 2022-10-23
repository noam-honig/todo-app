import { Allow, Entity, Fields, Validators } from "remult";

@Entity("tasks", { allowApiCrud: true })
export class Task {
  @Fields.autoIncrement()
  id = 0;
  @Fields.string<Task>({
  })
  title = '';
  @Fields.boolean()
  completed = false;
}
