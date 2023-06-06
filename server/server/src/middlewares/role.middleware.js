import responseHandler from "../handlers/response.handler.js";
const roleMiddleware = (role) => (req, res, next) => {
    if (!req.user.roles.includes(role)) {
      return responseHandler.forbidden(res, "Access denied");
    }
    next();
  };
  
  export default roleMiddleware;