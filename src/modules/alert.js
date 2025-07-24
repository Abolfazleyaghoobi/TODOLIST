import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import "./tosterStyle/toster.css"

export function alertSuccessFully() {
  toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-center",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "300",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "hideDuration": "1000",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut",
    "timeOut": "1000",
    
    "onHidden": () => {
      // پیام دوم بدون onHidden اضافه بشه
      toastr.clear(); // احتیاطی برای پاکسازی احتمالی
      toastr.options.onHidden = null; // حذف کال‌بک برای جلوگیری از حلقه
      toastr.success("Have a nice day.");
    }
  };

  toastr.success("Added successfully");
}
export function alertWarning(title) {
  toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-center",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "3000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "hideDuration": "3000",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut",
    "timeOut": "3000",
  };

  toastr.warning(title);
}
