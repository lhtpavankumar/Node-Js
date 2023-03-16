import * as yup from "yup";
import HTTPHandler from "../app/utils/HTTPHandler";
import LHTLogger from "../app/utils/logger";


export default {
  validateUserLogin: async (req, res, next) => {
    const schema = yup.object().shape({
      email: yup.string().email(),
    });
    await validate(schema, req.query, res, next);
  },

  validateCreateUser: async (req, res, next) => {
    LHTLogger.info('validateCreateUser', "Inside validateCreateUser", req.body)
    const schema = yup.object().shape({
      userName: yup.string().required(),
      password: yup.string().required(),
    });
    await validate(schema, req.body, res, next);
  },  

  // validateUser: async (req, res, next) => {
  //   LHTLogger.info('validateCreateUser', "Inside validateCreateUser", req.headers)
  //   const schema = yup.object().shape({
  //     userName: yup.string().required(),
  //     password: yup.string().required(),
  //   });
  //   await validate(schema, req.body, res, next);
  // },
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
    HTTPHandler.validationError(res, errors);
  }
};
