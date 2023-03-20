/**
 * Created by AyushK on 18/09/20.
 */
import ValidationManger from "../middleware/validation";
import Template from "../app/modules/Template";
import User from "../app/modules/user";
import {stringConstants} from "../app/common/constants";

export default (app) => {
    app.get('/', (_req, res) => res.send(stringConstants.SERVICE_STATUS_HTML));

    /**
     * route definition
     */
    // app.get("/success-route", ValidationManger.validateUserLogin, new Template().successRoute);
    // app.get("/failure-route", new Template().failureRoute);

    app.post("/create", ValidationManger.validateCreateUser, new User().createUser);
    
    app.get("/get-token", new User().authenticateAdmin);
};
