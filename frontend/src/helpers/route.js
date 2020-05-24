import { generatePath } from "react-router";

const authRouteFunc = (main = "/auth", paramField = "type") => {
  const template = `${main}/:${paramField}`;

  const generateTemplatePath = (param) => ({
    param,
    path: () => {
      return generatePath(template, { [paramField]: param });
    },
  });

  return {
    main,
    template,
    paramField,
    signIn: generateTemplatePath("signin"),
    signUp: generateTemplatePath("signup"),
  };
};
export const authRoute = authRouteFunc();

export const routes = {
  main: "/",
  dashboard: "/dashboard",
};
