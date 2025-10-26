import Swal from 'sweetalert2'

const ICON_COLORS = {
  success: 'text-success',
  error: 'text-danger',
  warning: 'text-warning',
  danger: 'text-danger',
  confirm: 'text-primary',
  info: 'text-primary'
}

const ICON_CLASSES = {
  success: 'fa-solid fa-circle-check',
  error: 'fa-solid fa-circle-xmark',
  warning: 'fa-solid fa-triangle-exclamation',
  danger: 'fa-solid fa-ban',
  confirm: 'fa-solid fa-circle-info',
  info: 'fa-solid fa-circle-info'
}

const swal = Swal.mixin({
  reverseButtons: true,
  buttonsStyling: false,
  allowEscapeKey: false,
  customClass: {
    popup: 'card bg-blue-dark-middle dynamic-card-border rounded-4',
    title: 'text-primary',
    confirmButton: 'btn btn-primary ms-1',
    cancelButton: 'btn btn-outline-secondary me-1',
    htmlContainer: 'text-secondary',
    input: 'rounded'
  }
})

const swalConfig = {
  alert: ({
    type,
    title,
    text,
    html,
    confirmButtonText = 'Aceptar',
    cancelButtonText = 'Cancelar',
    showCancelButton = false,
    showLoading = false,
    timer
  }) => {
    return swal.fire({
      title,
      text,
      iconHtml: `<i class="${ICON_CLASSES[type]} ${ICON_COLORS[type]}"></i>`,
      html,
      confirmButtonText,
      cancelButtonText,
      showCancelButton: type === 'confirm' || showCancelButton,
      didOpen: () => {
        !showLoading || swal.showLoading()
      },
      timer,
      allowOutsideClick: false
    })
  },
  toast: ({ type, title, text, position = 'top-right', timer = 3000 }) => {
    return swal.fire({
      toast: true,
      position,
      title,
      text,
      iconHtml: `<i class="${ICON_CLASSES[type]} ${ICON_COLORS[type]}"></i>`,
      showConfirmButton: false,
      showCancelButton: false,
      showCloseButton: false,
      timer,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer
        toast.onmouseleave = Swal.resumeTimer
      }
    })
  },
  input: ({
    type = 'warning',
    title,
    text,
    inputType = 'text',
    inputLabel,
    inputPlaceholder,
    inputAttributes = {},
    showCancelButton = true,
    inputValidator = null
  }) => {
    return swal.fire({
      title,
      text,
      iconHtml: `<i class="${ICON_CLASSES[type]} ${ICON_COLORS[type]}"></i>`,
      input: inputType,
      inputLabel,
      inputPlaceholder,
      inputAttributes,
      showCancelButton,
      inputValidator,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: false
    })
  }
}

export default swalConfig
