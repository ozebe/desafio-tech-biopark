//classe responsável pela parte de autenticação, utilizando do passport-local para a 
//autenticação e bcryptjs para criptografar e verificar as senhas
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;

const usersController = require("./controller/usersController");

module.exports = function (passport) {
  async function findUser(username) {

    let user = await usersController.getUserByUsername(username);
    return user.rows[0];

  }

  async function findUserById(id) {
    return usersController.getUserById(id);
  }

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    try {
      const user = findUserById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });

  passport.use(
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      async (username, password, done) => {
        try {
          const user = await findUser(username);
          //console.log(JSON.stringify(user));
          // usuário inexistente
          if (!user) {
            return done(null, false);
          }

          // comparando as senhas
          const isValid = bcrypt.compareSync(password, user.password);
          //criptografa a senha
          if (!isValid) return done(null, false);

          return done(null, user);
        } catch (err) {
          done(err, false);
        }
      }
    )
  );
};
