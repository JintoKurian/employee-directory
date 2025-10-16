import gql from "graphql-tag";
import { getDB } from "./db.js";
import { ObjectId } from "mongodb";

export const typeDefs = gql`
  type Employee {
    id: ID!
    name: String!
    position: String!
    department: String!
    salary: Float!
  }

  type Query {
    getAllEmployees: [Employee]
    getEmployeeDetails(id: ID!): Employee
    getEmployeesByDepartment(department: String!): [Employee]
  }

  type Mutation {
    addEmployee(name: String!, position: String!, department: String!, salary: Float!): Employee
  }
`;


export const resolvers = {
  Query: {
    async getAllEmployees() {
      const db = getDB();
      return await db.collection("employees").find().toArray();
    },
    async getEmployeeDetails(_, { id }) {
      const db = getDB();
      return await db.collection("employees").findOne({ _id: new ObjectId(id) });
    },
    async getEmployeesByDepartment(_, { department }) {
      const db = getDB();
      return await db.collection("employees").find({ department }).toArray();
    },
  },
  Mutation: {
  async addEmployee(_, { name, position, department, salary }) {
    const db = getDB();
    const result = await db.collection("employees").insertOne({
      name,
      position,
      department,
      salary,
    });

    // Fetch the inserted employee using the insertedId
    const newEmployee = await db
      .collection("employees")
      .findOne({ _id: result.insertedId });

    return newEmployee; // ✅ This includes _id, so Employee.id resolver works fine
  },
},

  Employee: {
    id: (parent) => parent._id?.toString(), // 👈 This line converts _id to id
  },
};


// export const resolvers = {
//   Query: {
//     async getAllEmployees() {
//       const db = getDB();
//       return await db.collection("employees").find().project({ name: 1, position: 1 }).toArray();
//     },
//     async getEmployeeDetails(_, { id }) {
//       const db = getDB();
//       return await db.collection("employees").findOne({ _id: new ObjectId(id) });
//     },
//     async getEmployeesByDepartment(_, { department }) {
//       const db = getDB();
//       return await db.collection("employees").find({ department }).toArray();
//     },
//   },
//   Mutation: {
//     async addEmployee(_, { name, position, department, salary }) {
//       const db = getDB();
//       const result = await db.collection("employees").insertOne({ name, position, department, salary });
//       return { id: result.insertedId, name, position, department, salary };
//     },
//   },
// };
