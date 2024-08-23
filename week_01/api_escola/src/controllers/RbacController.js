const Permission = require('../models/Permission');
const Role = require('../models/Role');

class RbacController {
  async listPermissions(req, res) {
    try {
      const data = await Permission.findAll();
      return res.status(200).send(data);
    } catch (error) {
      console.error('Error listing permissions:', error);
      return res.status(500).send({ error: "Error listing permissions" });
    }
  }

  async createOnePermission(req, res) {
    try {
      const { name, description } = req.body;

      if (!name || !description) {
        return res.status(400).send({ error: "Insufficient data provided" });
      }

      const permissionExists = await Permission.findOne({ where: { name } });
      if (permissionExists) {
        return res.status(400).send({ error: "Permission already exists" });
      }

      const newPermission = await Permission.create({ name, description });
      return res.status(201).send(newPermission);
    } catch (error) {
      console.error('Error creating permission:', error);
      return res.status(500).send({ error: "Error creating permission" });
    }
  }

  async listRoles(req, res) {
    try {
      const data = await Role.findAll();
      return res.status(200).send(data);
    } catch (error) {
      console.error('Error listing roles:', error);
      return res.status(500).send({ error: "Error listing roles" });
    }
  }

  async createOneRole(req, res) {
    try {
      const { name, description } = req.body;

      if (!name || !description) {
        return res.status(400).send({ error: "Insufficient data provided" });
      }

      const roleExists = await Role.findOne({ where: { name } });
      if (roleExists) {
        return res.status(400).send({ error: "Role already exists" });
      }

      const newRole = await Role.create({ name, description });
      return res.status(201).send(newRole);
    } catch (error) {
      console.error('Error creating role:', error);
      return res.status(500).send({ error: "Error creating role" });
    }
  }

  async listPermissionsByRole(req, res) {
    try {
      const { roleId } = req.params;

      const role = await Role.findByPk(roleId, { include: [Permission] });
      if (!role) {
        return res.status(404).send({ error: "Role not found" });
      }

      return res.status(200).send(role.Permissions);
    } catch (error) {
      console.error('Error listing permissions by role:', error);
      return res.status(500).send({ error: "Error listing permissions by role" });
    }
  }

  async addPermissionToRole(req, res) {
    try {
      const { roleId, permissionId } = req.body;

      const role = await Role.findByPk(roleId);
      if (!role) {
        return res.status(404).send({ error: "Role not found" });
      }

      const permission = await Permission.findByPk(permissionId);
      if (!permission) {
        return res.status(404).send({ error: "Permission not found" });
      }

      await role.addPermission(permission);
      return res.status(200).send({ message: "Permission added to role successfully" });
    } catch (error) {
      console.error('Error adding permission to role:', error);
      return res.status(500).send({ error: "Error adding permission to role" });
    }
  }

  async addRoleToUser(req, res) {
    try {
      const { userId, roleId } = req.body;

      const role = await Role.findByPk(roleId);
      if (!role) {
        return res.status(404).send({ error: "Role not found" });
      }

      // Assuming User model and relationship are correctly set up
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).send({ error: "User not found" });
      }

      await user.addRole(role);
      return res.status(200).send({ message: "Role added to user successfully" });
    } catch (error) {
      console.error('Error adding role to user:', error);
      return res.status(500).send({ error: "Error adding role to user" });
    }
  }
}

module.exports = new RbacController();
