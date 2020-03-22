import { useState, useEffect } from "react";
import { userService } from "../services/user.service";

function useSelectedServices() {
  const [listOfSubscribedServices, setListOfSubscribedServices] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));

  const getAllServices = async () => {
    const result = await userService.getAll();
    setAllServices(result);
  };

  const getAllSubscriptions = async () => {
    const result = await userService.getUserSubscriptions(userFromLocalStorage[0]._id);

    if(result) {
      setListOfSubscribedServices(result);
    }
  }
  useEffect(() => {
    getAllServices();

  }, []);

  return [
    {
      listOfSubscribedServices,
      allServices
    },
    {
      setListOfSubscribedServices,
      setAllServices
    }
  ];
}
export default useSelectedServices;
