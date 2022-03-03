export default function alert(message, type) {
    var alertPlaceholder = document.getElementById('liveAlertPlaceholder')

    var wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
    alertPlaceholder.innerHTML = ""; //apaga o anterior antes de colocar outro
    alertPlaceholder.append(wrapper);
}

