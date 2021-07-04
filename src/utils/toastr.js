import * as toastr from "toastr";

export const showToastr = ({ text, type = "success" }) => {
  try {
    // type could be success , error , info
    toastr.clear();
    const options = {
      positionClass: "toast-top-right",
      maxOpened: 1,
      preventDuplicates: true,
      onclick: null,
      showDuration: "300",
      hideDuration: "1000",
      timeOut: "5000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
    };
    toastr.options = options;
    toastr[type?.toLowerCase()](`${text}`);
  } catch (error) {
    console.error("error", { error });
    toastr["error"](`${text}`);
  }
};
