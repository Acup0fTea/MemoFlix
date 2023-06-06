import userModel from "../models/user.model.js";

const loginAdminController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email: email }).exec();

    if (user && user.validPassword(password)) {
      req.session.userId = user._id;
      if (user.role.includes('admin')) {
        res.redirect('/dashboard');
        return;
      }
    }
    
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.redirect('/login');
  }
};

export default loginAdminController;
