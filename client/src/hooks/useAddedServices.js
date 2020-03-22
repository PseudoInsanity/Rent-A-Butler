import { useState, useEffect } from "react";
import { userService } from "../services/user.service";

function useAddedServices() {
    const [listOfAddedServices, setListOfAddedServices] = useState([]);
    const [allServices, setAllServices] = useState([])

    const getAllServices = async () => {
        const result = await userService.getAll();
        setListOfAddedServices(result);
    };

    useEffect(() => {
        getAllServices();

    }, []);


    return [
        {
            listOfAddedServices,
            allServices
        },
        {
            setListOfAddedServices
        }
    ];
}
export default useAddedServices;