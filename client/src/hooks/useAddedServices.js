import { useState } from "react";
function useAddedServices() {
    const [listOfAddedServices, setListOfAddedServices] = useState([]);
    return [
        {
            listOfAddedServices
        },
        {
            setListOfAddedServices
        }
    ];
}
export default useAddedServices;