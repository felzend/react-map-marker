export var handleApiErrors = (response, success, failure) => {
    if(!response.ok) {
        alert(failure.concat(` ${response.status}`));
        return;
    }
    alert(success);
}