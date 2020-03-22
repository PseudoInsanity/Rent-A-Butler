import { useState, useEffect } from "react";
import { userService } from "../services/user.service";

function useSelectedServices() {
  const [listOfSubscribedServices, setListOfSubscribedServices] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const getAllServices = async () => {
    const result = await userService.getAll();

    setAllServices(result);
  };
  useEffect(() => {
    getAllServices();

  }, []);


  return [
    {
      listOfSubscribedServices,
      allServices
    },
    {
      setListOfSubscribedServices
    }
  ];
}
export default useSelectedServices;
