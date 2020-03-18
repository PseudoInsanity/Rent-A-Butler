import { useState } from "react";
function useSelectedServices() {
    const [listOfSubscribedServices, setListOfSubscribedServices] = useState([]);
    return [
        {
            listOfSubscribedServices
        },
        {
            setListOfSubscribedServices
        }
    ];
}
export default useSelectedServices;