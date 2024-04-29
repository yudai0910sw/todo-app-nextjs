import { supabaseClient } from "@/utils/supabase/supabase"
import { Dispatch, SetStateAction, ReactElement } from "react"
import getData from "./getData"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"

export default function RemoveDialog(props: {
  id: number,
  taskList: Dispatch<SetStateAction<Array<ReactElement>>>
}) {
  const { taskList } = props;

  const onSubmit = async (event: any) => {
    event.preventDefault();
    
    try {
      const { error } = await supabaseClient
        .from('tasks')
        .delete()
        .eq('id', props.id)
      if (error) {
        console.log(error);
      }

      await getData(taskList)
      toast.success("削除に成功しました")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger><p className="text-red-500">削除</p></DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="mb-2">タスクを削除します。<br className="sm:hidden"></br>よろしいですか？</DialogTitle>
          <DialogDescription>
            <Button variant="destructive" onClick={onSubmit} type="submit">タスクを削除</Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
