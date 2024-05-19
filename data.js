let users = [];
let currentId = 1;

const data = {
  addUser: (user) => {
    user.id = currentId++;
    users.push(user);
  },
  getAllUsers: () => users,
  getOneUser: (id) => users.find((user) => user.id === id),
  updateUser: (id, data) => {
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...data };
      return users[userIndex];
    }
    return null;
  },
  deleteUser: (id) => {
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      users.splice(userIndex, 1);
      return true;
    }
    return false;
  },
};

module.exports = data;
