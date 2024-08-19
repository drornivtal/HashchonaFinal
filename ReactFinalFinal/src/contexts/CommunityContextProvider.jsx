
import { createContext, useEffect, useState } from "react";
import { getReqAllCommunities } from "../utilities/ApiUtilities";
import { geocodeAddress } from "../utilities/FunctionsUtilities";

export const CommunityContext = createContext();

export default function CommunityContextProvider(props) {

    const [communities, setCommunities] = useState([]);
  const addCommunity = (obj) => {
        setCommunities([...communities, obj]);
    };
    const removeCommunity = (id) => {
        let newCommunities = communities.filter((community) => (community.id !== id));
        setCommunities(newCommunities);
    };
    const updateCommunity = (obj) => {
        removeCommunity(obj.id);
        addCommunity(obj);
    };
  
    // component did mount
    useEffect(() => {
        async function fetchAndSetCommunities() {
            try {
                // Fetch communities from the database
                const fetchedCommunities = await getReqAllCommunities();
                if (fetchedCommunities) {

                    // Geocode addresses for each community
                    const communitiesWithCoordinates = await Promise.all(
                        fetchedCommunities.map(async (community) => {

                            let address = community.location;
                            try {
                                let coordinates = await geocodeAddress(address);
                                return { ...community, coordinates };

                            } catch (error) {
                                console.error(`Error geocoding address for community ${community.name}:`, error);
                                return community; // Return community without coordinates if geocoding fails
                            }
                        })
                    );
                    // Update state with communities including coordinates
                    setCommunities(communitiesWithCoordinates);
                    console.log(communitiesWithCoordinates);
                }
            } catch (error) {
                console.error('Error fetching communities:', error.message);
            }
        }
        // Call the function when component mounts
        fetchAndSetCommunities();
    }, []);

    return (
        <CommunityContext.Provider value={{ communities, addCommunity, removeCommunity, updateCommunity }}>
            {props.children}
        </CommunityContext.Provider>
    )
}
