import { Notification } from "../models/notification.model.js";

const deleteNotification = async (req,res)=>{

  const notificationId = req.params.id;
  try {
    await Notification.findByIdAndDelete(notificationId);
    res.status(200).json({message:"deleted successfully"})
  } catch (error) {
    return res.status(500).json({
      message:"somthing went wrong while deleting notifications",
      error
    })
  }
}
const getNotifications = async (req,res)=>{
  const userId = req.user?._id;
  try {
    const notification =await Notification.find({receiver:userId})
    if(!notification){
      return res.status(404).json({message:"no notifications found"})
    }
    return res.status(200).json({message:"successfully fetched notifications",notification})
  } catch (error) {
    return res.status(500).json({message:"something went wrong while fetching notifications"})
  }
}

export {getNotifications,deleteNotification}