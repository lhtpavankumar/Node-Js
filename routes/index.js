/**
 * Created by AyushK on 18/09/20.
 */
import ValidationManager from "../middleware/validation";
import Analytics from "../app/modules/Analytics";
import { stringConstants } from "../app/common/constants";

export default (app) => {
  app.get("/", (_req, res) => res.send(stringConstants.SERVICE_STATUS_HTML));

  /**
   * route definition
   */
  // app.get("/success-route", ValidationManger.validateUserLogin, new Template().successRoute);
  // app.get("/failure-route", new Template().failureRoute);

  app.get("/user", new Analytics().getDetails);

  app.post(
    "/create",
    ValidationManager.validateCreateUser,
    new Analytics().createUser
  );

  app.put("/update", ValidationManager.validateUpdateUser, new Analytics().updateUser);

  app.delete("/delete", ValidationManager.validateUpdateUser, new Analytics().deleteUser);
};
