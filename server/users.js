const users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find((user) => {
    user.room === room && user.name === name;
  });
  if (existingUser) {
    return { error: "Username is taken" };
  }
  const user = { id, name, room };
  users.push(user);
  console.log("users", users);
  return { user };
};

const removeUser = (id) => {
  const index = user.find((user) => {
    user.id === id;
  });
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => {
  console.log("id", id);
  console.log("users", users);
  return users.find((user) => {
    return user.id === id;
  });
};

const getUsersInRoom = (room) => {
  return users.filter((user) => {
    return user.room === room;
  });
};
module.exports = { addUser, removeUser, getUser, getUsersInRoom };
