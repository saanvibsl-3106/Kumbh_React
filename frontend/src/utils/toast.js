import toast from 'react-hot-toast';

// Success toast
export const showSuccess = (message) => {
  toast.success(message, {
    duration: 4000,
    position: 'top-right',
  });
};

// Error toast
export const showError = (message) => {
  toast.error(message, {
    duration: 4000,
    position: 'top-right',
  });
};

// Info toast
export const showInfo = (message) => {
  toast(message, {
    duration: 4000,
    position: 'top-right',
    icon: 'ℹ️',
  });
};

// Warning toast
export const showWarning = (message) => {
  toast(message, {
    duration: 4000,
    position: 'top-right',
    icon: '⚠️',
    style: {
      background: '#F59E0B',
      color: '#fff',
    },
  });
};

// Promise toast for async operations
export const showPromise = (promise, messages) => {
  return toast.promise(promise, {
    loading: messages.loading || 'Loading...',
    success: messages.success || 'Success!',
    error: messages.error || 'Error!',
  });
};

// Loading toast for async operations
export const showLoading = (message = 'Loading...') => {
  return toast.loading(message, {
    duration: Infinity,
    position: 'top-right',
  });
};

// Dismiss a specific toast
export const dismissToast = (toastId) => {
  toast.dismiss(toastId);
};

// Dismiss all toasts
export const dismissAllToasts = () => {
  toast.dismiss();
};

// Action toast with custom buttons
export const showActionToast = (message, actions = []) => {
  return toast.custom((t) => (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      }`}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
        maxWidth: '400px',
        width: '100%',
        zIndex: 9999,
        pointerEvents: 'auto',
        border: '1px solid #E5E7EB'
      }}
    >
      <div style={{ padding: '20px' }}>
        <div style={{ marginBottom: '16px' }}>
          <p style={{ 
            fontSize: '14px', 
            fontWeight: '500', 
            color: '#1F2937',
            margin: 0,
            lineHeight: '1.5'
          }}>
            {message}
          </p>
        </div>
        {actions.length > 0 && (
          <div style={{ 
            display: 'flex', 
            gap: '8px',
            justifyContent: 'flex-end'
          }}>
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={() => {
                  toast.dismiss(t.id);
                  action.onClick && action.onClick();
                }}
                style={{
                  padding: '8px 16px',
                  fontSize: '12px',
                  fontWeight: '500',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  backgroundColor: action.primary ? '#3B82F6' : '#E5E7EB',
                  color: action.primary ? 'white' : '#374151'
                }}
                onMouseOver={(e) => {
                  if (action.primary) {
                    e.target.style.backgroundColor = '#2563EB';
                  } else {
                    e.target.style.backgroundColor = '#D1D5DB';
                  }
                }}
                onMouseOut={(e) => {
                  if (action.primary) {
                    e.target.style.backgroundColor = '#3B82F6';
                  } else {
                    e.target.style.backgroundColor = '#E5E7EB';
                  }
                }}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  ), {
    duration: 5000,
    position: 'top-right',
  });
};

// Custom confirm dialog using toast
export const showConfirm = (message, onConfirm, onCancel, options = {}) => {
  const {
    type = 'warning',
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    title = null
  } = options;

  const getIcon = () => {
    switch (type) {
      case 'danger':
        return '🗑️';
      case 'success':
        return '✅';
      case 'info':
        return 'ℹ️';
      default:
        return '⚠️';
    }
  };

  const getColors = () => {
    switch (type) {
      case 'danger':
        return {
          icon: '#EF4444',
          confirm: '#EF4444',
          confirmHover: '#DC2626'
        };
      case 'success':
        return {
          icon: '#10B981',
          confirm: '#10B981',
          confirmHover: '#059669'
        };
      case 'info':
        return {
          icon: '#3B82F6',
          confirm: '#3B82F6',
          confirmHover: '#2563EB'
        };
      default:
        return {
          icon: '#F59E0B',
          confirm: '#F59E0B',
          confirmHover: '#D97706'
        };
    }
  };

  const colors = getColors();
  const confirmToast = toast.custom((t) => (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } confirm-dialog-overlay`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        pointerEvents: 'auto',
        backdropFilter: 'blur(2px)'
      }}
      onClick={(e) => {
        // Close dialog when clicking outside the content
        if (e.target === e.currentTarget) {
          toast.dismiss(t.id);
          onCancel && onCancel();
        }
      }}
    >
      <div
        className="confirm-dialog-content"
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          maxWidth: '420px',
          width: '90%',
          margin: '0 20px',
          overflow: 'hidden',
          transform: t.visible ? 'scale(1)' : 'scale(0.95)',
          transition: 'transform 0.2s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ padding: '32px 24px 24px 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ 
              fontSize: '56px', 
              marginBottom: '16px',
              color: colors.icon,
              lineHeight: '1'
            }}>
              {getIcon()}
            </div>
            {title && (
              <h2 style={{
                fontSize: '22px',
                fontWeight: '700',
                color: '#1F2937',
                margin: '0 0 12px 0',
                lineHeight: '1.3'
              }}>
                {title}
              </h2>
            )}
            <h3 style={{ 
              fontSize: title ? '18px' : '20px', 
              fontWeight: title ? '500' : '600', 
              color: title ? '#4B5563' : '#1F2937',
              margin: 0,
              lineHeight: '1.4',
              wordBreak: 'break-word'
            }}>
              {message}
            </h3>
          </div>
          
          <div style={{ 
            display: 'flex', 
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                onCancel && onCancel();
              }}
              style={{
                padding: '14px 28px',
                border: '2px solid #E5E7EB',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: '600',
                backgroundColor: 'white',
                color: '#6B7280',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                minWidth: '100px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#F9FAFB';
                e.target.style.borderColor = '#D1D5DB';
                e.target.style.transform = 'translateY(-1px)';
                e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'white';
                e.target.style.borderColor = '#E5E7EB';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
              }}
            >
              {cancelText}
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                onConfirm && onConfirm();
              }}
              style={{
                padding: '14px 28px',
                border: `2px solid ${colors.confirm}`,
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: '600',
                backgroundColor: colors.confirm,
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                minWidth: '100px',
                boxShadow: `0 1px 3px ${colors.confirm}40`
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = colors.confirmHover;
                e.target.style.borderColor = colors.confirmHover;
                e.target.style.transform = 'translateY(-1px)';
                e.target.style.boxShadow = `0 4px 12px ${colors.confirm}50`;
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = colors.confirm;
                e.target.style.borderColor = colors.confirm;
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = `0 1px 3px ${colors.confirm}40`;
              }}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  ), {
    duration: Infinity,
    id: 'confirm-dialog',
    position: 'top-center',
  });
  
  return confirmToast;
};

// Helper functions for common confirmation dialogs
export const showDeleteConfirm = (itemName, onConfirm, onCancel) => {
  return showConfirm(
    `Are you sure you want to delete "${itemName}"? This action cannot be undone.`,
    onConfirm,
    onCancel,
    {
      type: 'danger',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      title: 'Delete Confirmation'
    }
  );
};

export const showSaveConfirm = (message, onConfirm, onCancel) => {
  return showConfirm(
    message || 'Do you want to save your changes?',
    onConfirm,
    onCancel,
    {
      type: 'success',
      confirmText: 'Save',
      cancelText: 'Don\'t Save',
      title: 'Save Changes'
    }
  );
};

export const showLogoutConfirm = (onConfirm, onCancel) => {
  return showConfirm(
    'Are you sure you want to log out?',
    onConfirm,
    onCancel,
    {
      type: 'info',
      confirmText: 'Log Out',
      cancelText: 'Stay Logged In',
      title: 'Confirm Logout'
    }
  );
};

// Network status toasts
export const showNetworkError = () => {
  showError('Network error. Please check your connection and try again.');
};

export const showOffline = () => {
  showWarning('You are currently offline. Some features may not be available.');
};

export const showOnline = () => {
  showSuccess('Connection restored!');
};

// Validation helpers
export const showValidationError = (field, message) => {
  showWarning(`${field}: ${message}`);
};

export const showFieldRequired = (field) => {
  showWarning(`${field} is required.`);
};

// Session management toasts
export const showSessionExpired = () => {
  showWarning('Your session has expired. Please log in again.');
};

export const showUnauthorized = () => {
  showError('You are not authorized to perform this action.');
};

// Data operation toasts
export const showSaveSuccess = (item = 'Data') => {
  showSuccess(`${item} saved successfully!`);
};

export const showDeleteSuccess = (item = 'Item') => {
  showSuccess(`${item} deleted successfully!`);
};

export const showUpdateSuccess = (item = 'Data') => {
  showSuccess(`${item} updated successfully!`);
};

// File operation toasts
export const showFileUploadSuccess = () => {
  showSuccess('File uploaded successfully!');
};

export const showFileUploadError = () => {
  showError('Failed to upload file. Please try again.');
};

export const showFileSizeError = () => {
  showWarning('File size is too large. Please choose a smaller file.');
};

export const showFileTypeError = () => {
  showWarning('File type not supported. Please choose a valid file.');
};
