"use client"
import { useState, Dispatch, SetStateAction, ReactElement } from 'react';
import RemoveDialog from "./removeDialog"
import EditDialog from './editDialog';

export default function Task(props: { id: number, text: string, update_at: string, taskList: Dispatch<SetStateAction<Array<ReactElement>>> }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRemoveModal, setRemoveModal] = useState(false);

  const id = props.id
  const text = props.text
  const update_at = props.update_at
  let last_update = new Date(update_at)

  return (
    <>
      <div>
        <p className="text-gray-600 break-all">
          {text}
        </p>
        <p className="text-xs text-gray-400">最終更新日時：{last_update.toLocaleString("ja-JP")}</p>
      </div>

      <div className="flex">
        <EditDialog id={id} taskList={props.taskList} text={props.text}></EditDialog>
        <RemoveDialog id={id} taskList={props.taskList}></RemoveDialog>
      </div>
    </>
  )
}
