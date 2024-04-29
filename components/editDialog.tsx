import { useState } from "react";
import { supabaseClient } from "@/utils/supabase/supabase";
import getData from "./getData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction, ReactElement } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { revalidatePath } from "next/cache";

export default function EditDialog(props: {
  id: number,
  text: string,
  taskList: Dispatch<SetStateAction<Array<ReactElement>>>
}) {
  const { id, text: initialText, taskList } = props;
  const [text, setText] = useState(initialText);

  const onSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const { error } = await supabaseClient
        .from('tasks')
        .update({ text: text })
        .eq('id', id);
  
      if (error) {
        console.log(error);
      }

      await getData(taskList)
      toast.success("更新しました。")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-blue-500 mr-3">編集</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>タスクの編集</DialogTitle>
          <form className="space-y-4" onSubmit={onSubmit}>
            <Input
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <DialogClose asChild>
              <Button type="submit">更新</Button>
            </DialogClose>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
