import { useState, useEffect } from 'react'
import { ERROR_OCCURRED } from '../../utils/constants'

export const useQuery = ({ requestData = undefined, query, options = {} }) => {
  const [queryDetails, setQueryDetails] = useState({
    isFetching: false,
    isError: false,
    isSuccess: false,
    errorInfo: undefined,
    data: null
  })

  useEffect(() => {
    if (!options.skip || options.reload) {
      setQueryDetails({ ...queryDetails, isFetching: true })

      query(requestData)
        .then((response) => {
          setQueryDetails({ ...queryDetails, data: response, isFetching: false, isSuccess: true })
        })
        .catch((error) => {
          setQueryDetails({
            ...queryDetails,
            isError: true,
            errorInfo: error.response.data.message ?? ERROR_OCCURRED,
            isSuccess: false,
            isFetching: false
          })
        })
    }

    // eslint-disable-next-line
  }, [requestData, options.reload])

  return { ...queryDetails }
}
