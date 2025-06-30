import { Router } from 'express';
import { register, login, logout } from '../services/auth.service';

const router = Router();

router.post('/register', async (req, res) => {
  try {
	const user = await register(req.body);
	res.status(201).json(user);
  } catch (error) {
	res.status(400).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
    try {
      const { user } = await login(req.body, res);
      res.status(200).json({ user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

router.post('/logout', logout)

export default router;