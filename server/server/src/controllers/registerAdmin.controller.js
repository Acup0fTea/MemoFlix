const registerAdminController = (req, res) => {
    let username = "";
    let password = "";
    let displayName = "";
    let data = req.flash("data")[0];
    let validationErrors = req.flash("validationErrors");

    if (typeof data != "undefined") {
        username = data.username;
        password = data.password;
        displayName = data.displayName;
    }

    res.render("register", {
        errors: validationErrors,
        username: username,
        password: password,
        displayName: displayName
    });
};

export default registerAdminController;