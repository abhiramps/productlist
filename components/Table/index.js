import { Card, Tabs, AppProvider, Pagination } from "@shopify/polaris";
import { useCallback, useContext, useEffect, useState } from "react";

import { ProductContext } from "../../context/productContext";

import FiltersComponent from "./FiltersComponent";


const Table = () => {
    const [Data, setData] = useState([])

    const { dataArr } = useContext(ProductContext)
    const [selected, setSelected] = useState(0);

    //pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);


    const handleTabChange = useCallback(
        (selectedTabIndex) => setSelected(selectedTabIndex),
        [],
    );

    const tabs = [
        {
            id: 'all',
            content: 'All',
        },
        {
            id: 'active',
            content: 'Active',
        },
        {
            id: 'repeat-customers-1',
            content: 'Draft',
        },
        {
            id: 'archived',
            content: 'Archived',
        },
    ];

    useEffect(() => {
        convertFn();
    }, [dataArr, setData])

    const convertFn = useCallback(
        () => {
            var statusArr = ["Active", "Draft", "Archived"]
            var inventoryArr = [-71, -3, 1780, 1669, -160, 959, 'inventory not tracked']
            var typeArr = ['Outdore', 'Indore']
            var vendorArr = ['company 123', 'boring bock', 'rustic ltd', 'partners-demo']

            //random items
            const random = (array) => array[Math.floor(Math.random() * array.length)];

            let newData = dataArr.map(itm => {
                return {
                    ...itm,
                    "status": random(statusArr),
                    "inventory": random(inventoryArr),
                    "type": random(typeArr),
                    "vendor": random(vendorArr)
                }
            })
            setData(newData);
        },
        [setData, dataArr],
    )

    const onActiveChange = () => {
        const filteredItem = Data.filter(item => (
            item.status === 'Active'
        ))
        // console.log("filteredItem", filteredItem)
        return currentItems(filteredItem)
        //  filteredItem
    }
    const onDraftChange = () => {
        const filteredItem = Data.filter(item => (
            item.status === 'Draft'
        ))
        return currentItems(filteredItem)
    }

    const onArchiveChange = () => {
        const filteredItem = Data.filter(item => (
            item.status === 'Archived'
        ))
        return currentItems(filteredItem)
    }

    // console.log("selected tab", tabs[selected].content)

    //pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const totalPages = Math.ceil(Data.length / itemsPerPage);
    // console.log('totalPages',totalPages)
    // Get current Items
    const currentItems = (Data) => Data.slice(indexOfFirstItem, indexOfLastItem);

    const prviousButton = () => {
        setCurrentPage(currentPage <= 1 ? currentPage = 1 : currentPage => currentPage - 1)
    }

    const nextButton = () => {
        setCurrentPage(currentPage < totalPages ? currentPage => currentPage + 1 : currentPage = totalPages)
    }

    return (
        <AppProvider>
            <Card>
                <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
                    {
                        tabs[selected].content === 'Active' ? <FiltersComponent dataArr={onActiveChange()} /> :
                            tabs[selected].content === 'Draft' ? <FiltersComponent dataArr={onDraftChange()} /> :
                                tabs[selected].content === 'Archived' ? <FiltersComponent dataArr={onArchiveChange()} /> :
                                    <FiltersComponent dataArr={currentItems(Data)} />
                    }                       
                    <Pagination
                        hasPrevious
                        onPrevious={() => { prviousButton() }}
                        hasNext
                        onNext={() => { nextButton() }}
                    />
                </Tabs>
            </Card>
        </AppProvider>
    );
}

export default Table;