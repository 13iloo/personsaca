import { check, body, validationResult } from "express-validator";
import apiResponse from "../helpers/apiResponse.js";
import PersonManager from "../managers/PersonManager.js";

class PersonsApiController {
  constructor() {
    this.PersonManager = new PersonManager();
  }
  /**
   * Converts to POJO
   */
  includeData(personModel) {
    // Here we can choose what data to include, pure object
    // See the documentation about DTO objects!
    return {
      firstName: personModel.firstName,
      lastName: personModel.lastName,
    };
  }

  /**
   * Retrieve all  persons
   *
   * @returns [{Object}]
   */
  retrieveAll = async (req, res) => {
    try {
      const allPersons = await this.PersonManager.fetchAll();
      if (allPersons.length > 0) {
        const persons = allPersons.map((model) => this.includeData(model));
        return apiResponse.successResponseWithData(
          res,
          "Operation successful ",
          persons
        );
      } else {
        return apiResponse.successResponseWithData(
          res,
          "Operation successful",
          []
        );
      }
    } catch (error) {
      //throw error in json response with status 500.
      return apiResponse.errorResponse(res, error);
    }
  };

  /**
   * Create Person
   *
   * @param {string}      firstName
   * @param {string}      lastName
   *
   * @returns {Object}    { ... }
   */
  create = [
    // a list of callbacks, the controller is the guard before calling the manager
    check("firstName", "First Name must not be empty.")
      .isLength({ min: 1 })
      .trim(),
    check("lastName", "Last Name must not be empty.")
      .isLength({ min: 1 })
      .trim(),
    body("*").escape(),
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return apiResponse.validationErrorWithData(
            res,
            "Validation Error.",
            errors.array()
          );
        } else {
          // create and store person.
          const createdPerson = await this.PersonManager.add(
            req.body.firstName,
            req.body.lastName
          );
          if (!createdPerson) {
            return apiResponse.errorResponse(res, "Could not create person");
          } else {
            const person = this.includeData(createdPerson);
            return apiResponse.successResponseWithData(
              res,
              "Person added successfully.",
              person
            );
          }
        }
      } catch (error) {
        //throw error in json response with status 500.
        return apiResponse.errorResponse(res, error);
      }
    },
  ];

  // you can add the rest, please see last years architecture course for example
}

export default PersonsApiController;
