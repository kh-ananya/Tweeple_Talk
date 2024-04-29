import Notification from './../models/notificationmodel.js';

export const getNotifications = async(req,res) =>{

    try {
      
        const userId = req.user._id

        const notifiaction = await Notification.find({to :userId}).populate({
            path : "from",
            select : "username profileImg"
        })

        await Notification.updateMany({to : userId},{read: true})


        res.status(200).json(notifiaction)
        
    } catch (err) {
        console.log("Error in getnotifications ",err)
        res.status(500).json({
            error : "Internal server Error"
        })
    }
}


export const deleteNotifications = async(req,res) => {
    try {
   
        const userId = req.user._id
       
        await Notification.deleteMany({to :userId})

        res.status(200).json({
            message : "Notifications deleted successfully" 
        })

    } catch (err) {
        console.log("Error in deletenotifications ",err)
        res.status(500).json({
            error : "Internal server Error"
        })
    }
}


