export const baseUrl = "http://localhost:3000";
import { Dog } from "./types";

export const Requests = {
  // should return a promise with all dogs in the database
  getAllDogs: () => {
    return fetch(`${baseUrl}/dogs`).then((response) => response.json());
  },
  // should create a dog in the database from a partial dog object
  // and return a promise with the result
  postDog: () => {},

  // should delete a dog from the database
  deleteDog: (id: number) => {
    return fetch(`${baseUrl}/dogs/${id}`, {
      method: "DELETE",
    });
  },

  // Inside Requests object
  updateDog: (id: number, updatedDog: Dog) => {
    return fetch(`${baseUrl}/dogs/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedDog),
    }).then((response) => response.json());
  },

  // Just a dummy function for use in the playground
  dummyFunction: () => {
    console.log("dummy stuff");
  },
};

// postDog: (dog) => {
//   return fetch(`${baseUrl}/dogs`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(dog)
//   }).then(response => response.json());
// },
// deleteDog: (id) => {
//   return fetch(`${baseUrl}/dogs/${id}`, {
//     method: "DELETE"
//   }).then(response => response.json());
// },
// updateDog: (id, updatedDog) => {
//   return fetch(`${baseUrl}/dogs/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(updatedDog)
//   }).then(response => response.json());
// }
