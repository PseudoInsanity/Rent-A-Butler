import { useState, useEffect } from "react";
import { userService } from "../services/user.service";

function useAllUsers() {
    const [users, setUsers] = useState([]);
    const getAllUsers = async () => {
      const result = await userService.getAllUsers();
  
      console.log(result)
      setUsers(result);
    };

    useEffect(() => {
      getAllUsers();
    }, []);
  
  
    return [
      {
        users
      },
      {
        setUsers
      }
    ];
  }
  export default useAllUsers;