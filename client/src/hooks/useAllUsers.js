import { useState, useEffect } from "react";
import { userService } from "../services/user.service";

function useAllUsers() {
    const [users, setUsers] = useState([]);
    const getAllUsers = async () => {
      const result = await userService.getAllUsers();
      const ratings = result.map(user => user.ratings)
      setUsers(ratings);
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