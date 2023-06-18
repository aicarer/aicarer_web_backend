import { User } from '../../../models/v2/User.js';
import { validateMFA,generateMFA, sendMFAEmail, updateUser } from '../../../public/service/mfaService.js';
const resolvers = {
  Query: {
    user: async () => {
      try {
        const result = await User.find({});
        return result;
      } catch (err) {
        throw new Error('Error getting users', err);
      }
    },
    users: async (_, { id }) => {
      try {
        const result = await User.findById(id);
        if (!result) {
          throw new Error('User not found');
        }
        return result;
      } catch (err) {
        throw new Error('Error getting user', err);
      }
    },
  },
  Mutation: {
    createUser: async (_, args) => {
      try {
        console.log(args.input);
        const user = await User.create(args.input);

        const mfaCode = generateMFA(user);
        sendMFAEmail(user.email, mfaCode);
        user.mfaCode = mfaCode;
        await updateUser(user);

        return user;
      } catch (err) {
        console.log(err);
        throw new Error('Error creating user', err);
      }
    },
    validateMFAUser: async (_,input) =>{
      console.log(input.mfaCode)
      try {
        const result = await User.findOne({ email: input.email })
        console.log(result);
        if(result){
          const isValidCode = validateMFA(result, input.mfaCode );
          console.log(isValidCode);
    
          return isValidCode
        }else{
          return false
        }
        return false
      } catch (error) {
        return false
      }
    },
    readAllUsers: async (_, {referenceId}) => {
      try {
        const result = await User.find({referenceId: referenceId});
        console.log(result);
        return result;
      } catch (err) {
        throw new Error('Error getting users', err);
      }
    },
    userLogin: async (_, { email, password }) => {
      try {
        const result = await User.findOne({ email: email });
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
        throw new Error('Error during user login', err);
      }
    },
    updateUser: async (_, { id, ...args }) => {
      try {
        console.log(args);
        const result = await User.findByIdAndUpdate(id, args.input, { new: true });
        if (!result) {
          throw new Error('User not found');
        }
        return result;
      } catch (err) {
        throw new Error('Error updating user', err);
      }
    },
    deleteUser: async (_, { id }) => {
      try {
        const result = await User.findByIdAndDelete(id);
        if (!result) {
          throw new Error('User not found');
        }
        return result;
      } catch (err) {
        throw new Error('Error deleting user', err);
      }
    },
    toggleUserDisabled: async (_, { id }) => {
      try {
        const result = await User.findById(id);
        if (!result) {
          throw new Error('User not found');
        }

        result.isDisabled = !result.isDisabled;
        await result.save();

        return result;
      } catch (err) {
        throw new Error('Error toggling user disabled', err);
      }
    },
  },
};

export default resolvers;