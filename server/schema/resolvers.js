const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) {
        throw new Error('Authentication required');
      }
      const foundUser = await User.findById(user._id);
      return foundUser;
    },
  },
  Mutation: {
    createUser: async (_, { username, email, password }) => {
      try {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      } catch (err) {
        throw new Error(err.message);
      }
    },
    login: async (_, { usernameOrEmail, password }) => {
      const user = await User.findOne({
        $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      });
      if (!user) {
        throw new Error("Can't find this user");
      }
      
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new Error('Wrong password!');
      }

      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (_, { book }, { user }) => {
      try {
        const updatedUser = await User.findByIdAndUpdate(
          user._id,
          { $addToSet: { savedBooks: book } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      } catch (err) {
        throw new Error(err.message);
      }
    },
    deleteBook: async (_, { bookId }, { user }) => {
      try {
        const updatedUser = await User.findByIdAndUpdate(
          user._id,
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        if (!updatedUser) {
          throw new Error("Couldn't find user with this id!");
        }
        return updatedUser;
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },
};

module.exports = resolvers;
