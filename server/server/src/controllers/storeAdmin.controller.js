import userModel from "../models/user.model.js";

const storeAdminController = (req, res) => {
    userModel.create(req.body).then(() => {
        console.log('Admin registered successfully');
        res.redirect('/dashboard');
    }).catch((error) => {
        // console.log(error.errors)
        if (error) {
            const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message);
            req.flash('validationErrors', validationErrors);
            req.flash('data', req.body);
            return res.redirect('/register');
        }
    });
}

export default storeAdminController;