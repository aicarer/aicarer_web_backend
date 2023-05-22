
import mongoose from 'mongoose'
const {Types} = mongoose;
export const castToObjectId = (args) => {
  if (args && typeof args === 'object') {
    for (const [key, value] of Object.entries(args)) {
      if (value && typeof value === 'object') {
        castToObjectId(value);
      } else if (key.endsWith('_id') && Types.ObjectId.isValid(value)) {
        args[key] = Types.ObjectId(value);
      }
    }
  }
  return args;
};