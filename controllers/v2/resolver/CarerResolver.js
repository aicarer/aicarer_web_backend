import { Carer } from '../../../models/v2/Carer.js';

const resolvers = {
  Query: {
    carer: async () => {
      try {
        const result = await Carer.find({});
        return result;
      } catch (err) {
        throw new Error('Error getting carers', err);
      }
    },
    carers: async (_, { id }) => {
      try {
        const result = await Carer.findById(id);
        if (!result) {
          throw new Error('Carer not found');
        }
        return result;
      } catch (err) {
        throw new Error('Error getting carer', err);
      }
    },
  },
  Mutation: {
    createCarer: async (_, args) => {
      try {
        console.log(args.input);
        const result = await Carer.create(args.input);
        return result;
      } catch (err) {
        console.log(err);
        throw new Error('Error creating carer', err);
      }
    },
    readAllCarers: async (_, {referenceId}) => {
      try {
        const result = await Carer.find({referenceId: referenceId});
        console.log(result);
        return result;
      } catch (err) {
        throw new Error('Error getting carers', err);
      }
    },
    carerLogin: async (_, { email, password }) => {
      try {
        const result = await Carer.findOne({ email: email });
        if (!result) {
          throw new Error('Invalid email or password');
        }
        
        // Here, you can implement your own logic to validate the password.
        // For example, you can use a password hashing library like bcrypt to compare the hashed password with the provided one.
        // Ensure that the password validation logic is secure and appropriate for your application.
        const isValidPassword = (result.password === password);
        
        if (!isValidPassword) {
          throw new Error('Invalid email or password');
        }
        
        return result;
      } catch (err) {
        throw new Error('Error during carer login', err);
      }
    },
    updateCarer: async (_, { id, ...args }) => {
      try {
        console.log(args);
        const result = await Carer.findByIdAndUpdate(id, args.input, { new: true });
        if (!result) {
          throw new Error('Carer not found');
        }
        return result;
      } catch (err) {
        throw new Error('Error updating carer', err);
      }
    },
    deleteCarer: async (_, { id }) => {
      try {
        const result = await Carer.findByIdAndDelete(id);
        if (!result) {
          throw new Error('Carer not found');
        }
        return result;
      } catch (err) {
        throw new Error('Error deleting carer', err);
      }
    },
    toggleCarerDisabled: async (_, { id }) => {
      try {
        const result = await Carer.findById(id);
        if (!result) {
          throw new Error('Carer not found');
        }

        result.isDisabled = !result.isDisabled;
        await result.save();

        return result;
      } catch (err) {
        throw new Error('Error toggling carer disabled', err);
      }
    },
  },
};

export default resolvers;