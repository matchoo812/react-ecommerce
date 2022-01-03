import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Bob Loblaw',
    email: 'bobloblaw@lawblog.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Alex Denon',
    email: 'wronglyaccused@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
