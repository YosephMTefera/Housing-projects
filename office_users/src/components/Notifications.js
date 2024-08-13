import{ useEffect } from 'react'
import { toast } from 'react-toastify';

function Notifications({ socketConnection, userID, getNotifications }) {
    useEffect(() => {
        if (socketConnection) {
          // Emit event when socket is connected
          socketConnection.emit('officeUser', { userID });
    
          // Set up event listeners
          const handleCaseForwardNotification = (data) => {
            if (data?.Message_en) {
              toast.info(data.Message_en);
            }
            getNotifications();
          };
    
          const handleCaseReplyNotification = (data) => {
            if (data?.Message_en) {
              toast.info(data.Message_en);
            }
            getNotifications();
          };
    
          socketConnection.on('case_forward_notification', handleCaseForwardNotification);
          socketConnection.on('case_reply_notification', handleCaseReplyNotification);
    
          // Cleanup event listeners on component unmount or socketConnection change
          return () => {
            socketConnection.off('case_forward_notification', handleCaseForwardNotification);
            socketConnection.off('case_reply_notification', handleCaseReplyNotification);
          };
        }
      // Ensure that the dependencies are properly set to avoid unnecessary re-renders
      }, [socketConnection, userID, getNotifications]);
  return null
}

export default Notifications