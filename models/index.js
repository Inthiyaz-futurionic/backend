import { userModel } from "./user.js";
import { userRoleModel } from "./userRole.js";
import { userPermissionModel } from "./userPermission.js";
import { modulePermissionModel } from "./modulePermission.js";
import { userGroupModel } from "./userGroup.js";

export const setupAssociations = (sequelize) => {
    const User = userModel(sequelize);
    const UserRole = userRoleModel(sequelize);
    const UserPermission = userPermissionModel(sequelize);
    const ModulePermission = modulePermissionModel(sequelize);
    const UserGroup = userGroupModel(sequelize);

    // Define associations
    User.belongsToMany(UserRole, { through: 'UserRoles' });
    UserRole.belongsToMany(User, { through: 'UserRoles' });

    UserRole.belongsToMany(UserPermission, { through: 'RolePermissions' });
    UserPermission.belongsToMany(UserRole, { through: 'RolePermissions' });

    User.belongsToMany(UserGroup, { through: 'UserGroups' });
    UserGroup.belongsToMany(User, { through: 'UserGroups' });

    ModulePermission.belongsToMany(UserPermission, { through: 'ModulePermissions' });
    UserPermission.belongsToMany(ModulePermission, { through: 'ModulePermissions' });

    return { User, UserRole, UserPermission, ModulePermission, UserGroup };
};
