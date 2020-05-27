import axios from 'axios'

import { request } from './util'

export const getUsers = async () => {
  // const query = `
  //   mutation LoginUser {
  //     loginUser(input: { email: "", password: "" }) {
  //       user {
  //         id
  //         name
  //       }
  //     }
  //   }
  // `

  const query = `
    query GetUsers {
      users {
        id
        name
      }
    }
  `

  try {
    const response = await axios.post('/graphql', {
      query: query,
    })

    console.log(response)
  } catch (err) {
    console.log(err.response)
  }

  try {
    const response = await request(query)

    console.log(response)
  } catch (err) {
    console.log(err.response.data)
  }
}
