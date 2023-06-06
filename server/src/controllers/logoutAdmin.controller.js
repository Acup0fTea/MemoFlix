const logoutAdminController = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    })
};

export default logoutAdminController;