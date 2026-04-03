const userItems = [
  {
    user_id: 1,
    name: 'Example User',
    username: 'exampleuser',
    email: 'example@metropolia.fi',
    role: 'user',
    password: 'password',
  },
  {
    user_id: 2,
    name: 'Test User',
    username: 'testuser',
    email: 'test@metropolia.fi',
    role: 'admin',
    password: 'password',
  },
];

const listAllUsers = () => userItems;

const findUserById = (id) =>
  userItems.find((user) => user.user_id == id);

const addUser = (user) => {
  const newId = userItems.length + 1;
  const newUser = { user_id: newId, ...user };
  userItems.push(newUser);
  return newUser;
};

export { listAllUsers, findUserById, addUser };
