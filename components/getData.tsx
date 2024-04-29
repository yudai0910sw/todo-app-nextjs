import { supabaseClient } from "@/utils/supabase/supabase"
import Task from "./task"
import { Dispatch, SetStateAction, ReactElement } from "react"

export default async function getData(
  taskList: Dispatch<SetStateAction<Array<ReactElement>>>
) {
  const tmpTaskList: any = []
  try {
    let { data: tasks, error } = await supabaseClient
      .from('tasks')
      .select('*')
    if (error) {
      console.log(error)
    }

    if (tasks != null) {
      {tasks.map((task: any) => {
        tmpTaskList.push(
          <li key={task.id} className="flex items-center justify-between py-2">
            <Task id={task.id} text={task.text} update_at={task.updated_at} taskList={taskList} />
          </li>
        )
      })}
      taskList(tmpTaskList)
    }
  } catch (error) {
    console.log(error);
  }
}
