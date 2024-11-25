import bcrypt from "bcrypt";
const users = [
  {
    name: "Admin user",
    email: "admin@email.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Mehedi Hasan",
    email: "mehedi@email.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
  {
    name: "Mehedi Hasan",
    email: "mehedi@email.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
];

export default users;
