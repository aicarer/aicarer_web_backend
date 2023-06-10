
import { GraphQLScalarType } from 'graphql';
const resolver = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      if (value < 0) {
        value = -value;
      }
      return new Date(value * 1000);
    },
    serialize(value) {
      return Math.floor(value.getTime() / 1000);
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        let value = parseInt(ast.value, 10);
        if (value < 0) {
          value = -value;
        }
        return new Date(value * 1000);
      }
      return null;
    },
  })
};



export default resolver;