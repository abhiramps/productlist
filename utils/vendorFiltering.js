
const vendorFiltering = ({ dataArr, vendor }) => {
    let results = dataArr
        .filter((item) => vendor.some(category => [item.vendor].flat().includes(category)))
    return results
}

export default vendorFiltering