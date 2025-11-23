import express from 'express';

import { createProfile, updateProfile, getProfiles,  deleteProfile } from '../Controller/profileController.js';

const router = express.Router();

router.post('/', createProfile);
router.put('/:id', updateProfile);
router.get('/', getProfiles);
router.delete('/:id', deleteProfile);

export default router;