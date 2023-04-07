import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Role } from "../types";

interface UsersState {
  roles: Role[];
}

const initialStateConfigs: UsersState = {
  roles: [],
};

export const rolesSlice = createSlice({
  name: "roles",
  initialState: initialStateConfigs,
  reducers: {
    setRoles: (state, action: PayloadAction<Role[]>) => {
      state.roles = action.payload;
    },
    deleteCurrentRole: (state, action: PayloadAction<string>) => {
      state.roles = state.roles.filter(
        (role) => role.id.toString() !== action.payload.toString()
      );
    },
    addNewRole: (state, action: PayloadAction<Role>) => {
      state.roles.push(action.payload);
    },
    deleteCurrentPermission: (
      state,
      action: PayloadAction<{ roleId: string; permissionId: string }>
    ) => {
      const { roleId, permissionId } = action.payload;
      const roleObject = state.roles.find(
        (r) => r.id.toString() === roleId.toString()
      );
      if (roleObject) {
        roleObject.permissions = roleObject.permissions.filter(
          (permission) => permission !== permissionId
        );
      }
    },
    addNewPermission: (
      state,
      action: PayloadAction<{ roleId: string; permission: string }>
    ) => {
      const { roleId, permission } = action.payload;
      const roleObject = state.roles.find(
        (r) => r.id.toString() === roleId.toString()
      );
      if (roleObject) {
        roleObject.permissions.push(permission);
      }
    },
  },
});

export const {
  setRoles,
  deleteCurrentRole,
  addNewRole,
  deleteCurrentPermission,
  addNewPermission,
} = rolesSlice.actions;
export default rolesSlice.reducer;
