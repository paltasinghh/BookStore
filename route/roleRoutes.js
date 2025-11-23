import express from 'express';
import {
  createRole,
  getAllRoles,
  getRoleById,
  updateRoleStatus,
  deleteRoleById,
} from '../Controller/roleController.js';

const router = express.Router();
router.post('/', createRole);
router.get('/', getAllRoles);
router.get('/:id', getRoleById);
router.patch('/:id/status', updateRoleStatus);
router.delete('/:id',deleteRoleById);

export default router;