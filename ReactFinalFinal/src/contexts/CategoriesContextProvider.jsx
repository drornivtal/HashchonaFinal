

import { createContext, useEffect, useState } from "react";
import { getReqFunction } from "../utilities/ApiUtilities";

export const CategoriesContext = createContext();

export default function CommunityContextProvider(props) {

    const categoriesApi = `https://proj.ruppin.ac.il/cgroup62/test2/tar1/api/RequestsForHelp/GetAllCategories`;


  const [allCategories, setAllCategories] = useState([]);

  const addCategory = (obj) => {
    setAllCategories([...allCategories, obj]);
    };
    const removeCategory = (id) => {
        let newCategories = allCategories.filter((category) => (category.id !== id));
        setAllCategories(newCategories);
    };
    const updateCategory  = (obj) => {
        removeCategory(obj.id);
        addCategory(obj);
    };
  
    // component did mount
    useEffect(() => {
        async function fetchAndSetCategories() {
            try {
                const fetchedCategories = await getReqFunction(categoriesApi);
                if (fetchedCategories) {
                    setAllCategories(fetchedCategories);
                    console.log(fetchedCategories);
                }
            } catch (error) {
                console.error('Error fetching communities:', error.message);
            }
        }
        fetchAndSetCategories();
    }, []);

    return (
        <CategoriesContext.Provider value={{ allCategories}}>
            {props.children}
        </CategoriesContext.Provider>
    )
}
