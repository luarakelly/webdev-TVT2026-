import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { findUserByUsername } from '../models/user-model.js';
import 'dotenv/config';

const postLogin = async (req, res) => {
  console.log('BODY:', req.body);

  const user = await findUserByUsername(req.body.username);
  console.log('USER FROM DB:', user);

  if (!user) return res.sendStatus(401);

  const match = await bcrypt.compare(req.body.password, user.password);
  console.log('PASSWORD MATCH:', match);

  if (!match) return res.sendStatus(401);

  const userSafe = {
    user_id: user.user_id,
    name: user.name,
    username: user.username,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(userSafe, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });

  res.json({ user: userSafe, token });
};

const getMe = (req, res) => {
  res.json({ user: res.locals.user });
};

export { postLogin, getMe };
