import React from "react";

export default function TeacherSignup() {
  const name = React.createRef();
  const email = React.createRef();
  const password = React.createRef();
  const conf_password = React.createRef();

  return (
    <div>
      <br />
      <div class="container">
        <h2 class="display-4 mb-5 mt-3">Sign Up</h2>
        <form class="mb-4">
          <table>
            <tr>
              <td>
                <span class="text-dark">Name:</span>
              </td>
              <td>
                <input type="email" class="" ref={name}></input>
              </td>
            </tr>
            <tr>
              <td>
                <span class="text-dark">Email:</span>
              </td>
              <td>
                <input type="email" class="" ref={email}></input>
              </td>
            </tr>
            <tr>
              <td>
                <span class="text-dark">Password:</span>
              </td>
              <td>
                <input type="password" class="mr-3" ref={password}></input>
              </td>
            </tr>
            <tr>
              <td>
                <span class="text-dark mr-2">Confirm Password:</span>
              </td>
              <td>
                <input type="password" ref={conf_password}></input>
              </td>
            </tr>
          </table>
        </form>
        <button class="btn btn-primary">Submit</button>
      </div>
    </div>
  );
}
