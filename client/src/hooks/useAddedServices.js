import { useState, useEffect } from "react";
import { userService } from "../services/user.service";

function useAddedServices() {
    const [listOfAddedServices, setListOfAddedServices] = useState({});
    const [allServices, setAllServices] = useState([])
    const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));

    const getAllServices = async () => {
        const result = await userService.getAll();
        const addedServices= result.filter(item => item.userId === userFromLocalStorage[0]._id)
        setListOfAddedServices(addedServices);
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