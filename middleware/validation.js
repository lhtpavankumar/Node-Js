import * as yup from "yup";
import HTTPHandler from "../app/utils/HTTPHandler";
import LHTLogger from "../app/utils/logger";

export default {
  validateName: async (req, res, next) => {
    const schema = yup.object().shape({
      id: yup.string().required(),
      name: yup.string().required(),
    });
    await validate(schema, req.body, res, next);
  },

  validateDelete: async (req, res, next) => {
    const schema = yup.object().shape({
      id: yup.string().required(),
    });
    await validate(schema, req.body, res, next);
  },

  validateUpload: async (req, res, next) => {
    LHTLogger.info("validateCreateUser", "Inside validateUpload", req.body);
    const schema = yup.object().shape({
      name: yup.string().required(),
    });
    await validate(schema, req.body, res, next);
  },
};

const validate = async (schema, reqData, res, next) => {
  try {
    await schema.validate(reqData, { abortEarly: false });
    next();
  } catch (e) {
    const errors = e.inner.map(({ path, message, value }) => ({
      path,
      message,
      value,
    }));
    console.log("GOT ERROR", errors);
    HTTPHandler.validationError(res, errors);
  }
};
