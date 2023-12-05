const knex = require("knex");
const config = require("../knexfile");

const environment = process.env.NODE_ENV || "development";
const db = knex(config[environment]);
// Lấy danh sách người dùng
const getUsers = async () => {
  return await db("users").select(
    "users.id",
    "users.name",
    "users.email",
    "users.avatar",
    "users.role",
    "users.created_at",
    "users.updated_at"
  );
};
const getUserByEmail = (email) => {
  return db("users").where({ email }).first();
};
// Lấy thông tin người dùng theo ID
const getUserById = (id) => {
  return db("users").where({ id }).first();
};

// Tạo người dùng mới
const createUser = (user) => {
  return db("users").insert(user);
};

// Cập nhật thông tin người dùng
const updateUser = (id, updatedUser) => {
  return db("users").where({ id }).update(updatedUser);
};

// Xóa người dùng
const deleteUser = (id) => {
  return db("users").where({ id }).del();
};
const getUserPolls = async (id) => {
  // get poll and option of it
  return await db("polls")
    .where({ user_id: id })
    .then((polls) => {
      if (!polls) {
        return null;
      }
      polls = polls.map((poll) => {
        return db("options")
          .where({ poll_id: poll.id })
          .then((options) => {
            return {
              ...poll,
              options,
            };
          });
      });
      return Promise.all(polls);
    });
};
module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  getUserPolls,
};
