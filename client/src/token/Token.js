const jwt = sessionStorage.getItem("jwt");
const decoded = jwt && jwt.split(".")[1];
const user = decoded && JSON.parse(window.atob(decoded));

export  const roleToken = user && user.role;