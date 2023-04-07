import React from "react";
import { Redirect, Route } from "react-router-dom";

interface UserPermissions {
  [permission: string]: boolean;
}

let userPermissions: UserPermissions = {};

interface Permissions {
  [role: number]: string[];
}

const permissions: Permissions = {
  1: ["home_view", "subscriptions_view"],
  2: ["home_view"],
};

export const setUserAppPermissions = (role: number) => {
  permissions[role].forEach((item: string) => {
    userPermissions[item] = true;
  });
};

export const hasAccess = (name: string) => {
  return !!userPermissions[name];
};

interface PRouteProps {
  access?: string;
  path: string;
  component: React.ComponentType<any>;
}

// export const PRoute: React.FC<PRouteProps> = ({ access, ...rest }) => {
//   if (access && !hasAccess(access)) {
//     return <Redirect to="/" />;
//   }
//   return <Route {...rest} />;
// };

export const clearPermissions = () => {
  userPermissions = {};
};
