import bootbox from 'bootbox';

export function showSuccessBootbox(message) {
  bootbox.dialog({
    title: 'Subscription complete',
    message: message,
    show: true,
    backdrop: false,
    closeButton: true,
    animate: true,
    className: 'bootbox-success',
    buttons: {
      addUser: {
        label: 'Add User',
        className: 'btn-primary',
        callback() {
          Modal.show('insertUser');
        }
      },
      close: {
        label: 'Close',
        className: 'btn-default'
      }
    }
  });
}