/**
 * Created by AyushK on 18/09/20.
 */
import Fetch from "../app/modules/fetch"
import {stringConstants} from "../app/common/constants";

export default (app) => {
    app.get('/', (_req, res) => res.send(stringConstants.SERVICE_STATUS_HTML));

    /**
     * route definition
     */
    // app.get("/success-route", ValidationManger.validateUserLogin, new Template().successRoute);
    // app.get("/failure-route", new Template().failureRoute);
    
    app.get("/user", new Fetch().getDetails);
};
