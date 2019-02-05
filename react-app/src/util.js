export var handleApiErrors = (response, success, failure) => {
    console.log(response);
    if(!response.ok) {
        alert(failure.concat(` ${response.status}`));
        return;
    }
    alert(success);
}