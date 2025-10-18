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
    addEmployee(
      name: String!
      position: String!
      department: String!
      salary: Float!
    ): Employee

    updateEmployee(
      id: ID!
      name: String!
      position: String!
      department: String!
      salary: Float!
    ): Employee
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
      return await db
        .collection("employees")
        .findOne({ _id: new ObjectId(id) });
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

      const newEmployee = await db
        .collection("employees")
        .findOne({ _id: result.insertedId });

      return newEmployee;
    },

    async updateEmployee(_, { id, name, position, department, salary }) {
      const db = getDB();

      const result = await db.collection("employees").findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { name, position, department, salary } },
        { returnDocument: "after" }
      );


      const updatedEmployee = result.value || result;

      if (!updatedEmployee) {
        console.error("Update failed:", result);
        throw new Error("Employee not found");
      }

      return updatedEmployee;
    }

  },

  Employee: {
    id: (parent) => parent._id?.toString(),
  },
};
