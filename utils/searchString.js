const searchString = ({dataArr,queryValue}) => {
    let results = dataArr
        .filter((item) => {
            return Object.values(item)
                .join(' ')
                .toLowerCase()
                .includes(queryValue?.toLowerCase());
        })
    return results
}

export default searchString;