const { Route } =requeri('express')
const RbacController = require('../controllers/RbacController')

const RbacController = new Rauter()

RbacRouter.get("/listPermission, RbacController.lisPermissions")
RbacRouter.get("/listRole, RbacController.lisRoles")
RbacRouter.post("/createOnePermission, RbacController.createPermission")
RbacRouter.post("/createOneRole, RbacController.createRole")

module.exports = RbacRouter