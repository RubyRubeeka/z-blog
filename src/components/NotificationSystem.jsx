import React, { useState, useEffect } from 'react';
import { Snackbar, Alert, IconButton, Badge } from '@mui/material';
import { Notifications as NotificationsIcon } from '@mui/icons-material';

const NotificationSystem = ({ notifications, setNotifications }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (notifications.length > 0) {
      setOpen(true);
    }
  }, [notifications]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton color="inherit" onClick={() => setOpen(!open)}>
        <Badge badgeContent={notifications.length} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      {notifications.map((notification, index) => (
        <Snackbar
          key={index}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={handleClose} severity={notification.type || 'info'}>
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </div>
  );
};

export default NotificationSystem;
