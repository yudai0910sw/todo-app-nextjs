"use client"
import { supabaseClient } from "@/utils/supabase/supabase"
import { Dispatch, SetStateAction, ReactElement, useState } from "react"
import getData from "./getData"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

export default function AddTask(props: {
  taskList: Dispatch<SetStateAction<Array<ReactElement>>>;
}) {
  const [text, setText] = useState("");

  const onSubmit = async (event: any) => {
    event.preventDefault();
    try {
      let { data, error } = await supabaseClient
        .from('tasks')
        .insert([
          { text: text }
        ])
        .select()
      if (error) {
        console.log(error);
      }
      await getData(props.taskList)
      setText("")
      toast.success("作成しました。")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="mt-4" onSubmit={onSubmit}>
      <Input type="text" placeholder="新しいタスクを入力してください" required value={text} onChange={(e) => setText(e.target.value)} />
      <button type="submit" className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg px-4 py-2">追加</button>
    </form>
  )
}
