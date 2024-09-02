import React from "react"
import { useClientCategoryFunctionsContext } from "../contexts/ClientCategoryFunctionsProvider"
import { useClientCategoryContext } from "../contexts/ClientCategoryProvider"


export const useFetchClientCategoriesDropdown = () => {
    // Get the client category dropdown from the context
    const { clientCategoryDropdown } = useClientCategoryContext()
    // Fetch the client category dropdown function from functions context
    const { fetchClientCategoryDropdown } = useClientCategoryFunctionsContext()

    // Fetch the client category dropdown on mount
    React.useEffect(() => {
        fetchClientCategoryDropdown()
    }, [])

    return { clientCategoryDropdown }

}