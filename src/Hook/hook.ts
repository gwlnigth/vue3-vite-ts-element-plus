import { ElNotification } from "element-plus";


export const alterMessage = (title: string, message: string, type: string | any) => {
    ElNotification({
      title: title,
      message: message,
      type: type,
    });
  };