/**
 * Created by AyushK on 18/09/20.
 */
import ValidationManger from "../middleware/validation";
// import TestModule from "../app/modules/testModule";
import UserModule from "../app/modules/User"
import { stringConstants } from "../app/common/constants";

export default (app) => {
    app.get('/', (_req, res) => res.send(stringConstants.SERVICE_STATUS_HTML));

    /**
     * route definition
     */
    // app.get("/success-route", ValidationManger.validateUserLogin, new TestModule().successRoute);
    // app.get("/failure-route", new TestModule().failureRoute);
    app.post("/create-user", ValidationManger.validateCreateUser, new UserModule().createUser);

    app.post("/login", ValidationManger.validateCreateUser, new UserModule().userLogin);

    app.get("/verify", new UserModule().authenticate);
};

// Routes -> get, post, u
// Middleware -> Validate the data -> when we taking some input
// 
