const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database("sample_db.db");

db.run(`CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL
)`);

module.exports = {
  async getUsers() {
    const users = await new Promise((resolve, rejects) => {
      db.all(`SELECT * FROM users ORDER BY name`, [], (err, rows) => {
        if (err) {
          rejects(err);
        } else {
          resolve(rows);
        }
      });
    });
    return users;
  },
  async createUser(user) {
    const userId = await new Promise((resolve, rejects) => {
      db.run(
        `INSERT INTO users (name,age) VALUES (?,?)`,
        [user.name, user.age],
        (err) => {
          if (err) {
            rejects(err);
          } else {
            resolve(this.userId);
          }
        }
      );
    });
    return { id: userId, ...user };
  },
  async updateUser(id, user) {
    const changes = await new Promise((resolve, rejects) => {
      db.run(
        `UPDATE users SET name=?, age=? WHERE id=?`,
        [user.name, user.age, id],
        function (err) {
          if (err) rejects(err);
          else resolve(this.changes);
        }
      );
    });
    if (changes === 0) {
      return null;
    }
    return this.getUserById(id);
  },
  async deleteUser(id) {
    const changes = await new Promise((resolve, rejects) => {
      db.run(`DELETE FROM users WHERE id=?`, [id], function (err, rows) {
        if (err) {
          rejects(err);
        } else resolve(this.changes);
      });
    });
    return changes > 0;
  },
  async getUserById(id) {
    const user = await new Promise((resolve, rejects) => {
      db.get(`SELECT * FROM users WHERE id=?`, [id], (err, row) => {
        if (err) {
          rejects(err);
        } else resolve(row);
      });
    });
    return user;
  },
};
