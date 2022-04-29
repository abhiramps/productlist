import { Card, Tabs, AppProvider } from "@shopify/polaris";
import { useCallback, useContext, useEffect, useState } from "react";

import { ProductContext } from "../../context/productContext";

import FiltersComponent from "./FiltersComponent";


const Tab = () => {
    const [Data, setData] = useState([])

    const { dataArr } = useContext(ProductContext)

    const [selected, setSelected] = useState(0);

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
            var vendorArr = ['Company 123', 'Boring bock', 'Rustic ltd', 'Partners-demo']

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
                // return randomStatus()
            })
           
            setData(newData);
        },
        [setData, dataArr],
    )

    // const Loading = () => <h1>Loading....</h1>

    // if (!Data) { <Loading /> }

    const onActiveChange = () => {
        const filteredItem = Data.filter(item => (
            item.status === 'Active'
        ))
        // console.log("filteredItem", filteredItem)
        return filteredItem
    }
    const onDraftChange = () => {
        return Data.filter(item => (
            item.status === 'Draft'
        ))
    }

    const onArchiveChange = () => {
        return Data.filter(item => (
            item.status === 'Archived'
        ))
    }
    // console.log("selected tab", tabs[selected].content)
    return (
        <AppProvider>
            <Card>
                <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
                    {/* <Card.Section
                        // title={tabs[selected].content}
                    > */}
                    {
                        tabs[selected].content === 'Active' ? <FiltersComponent dataArr={onActiveChange()} /> :
                            tabs[selected].content === 'Draft' ? <FiltersComponent dataArr={onDraftChange()} /> :
                                tabs[selected].content === 'Archived' ? <FiltersComponent dataArr={onArchiveChange()} /> :
                                    <FiltersComponent dataArr={Data} />
                    }
                    {/* <FiltersComponent dataArr={Data} /> */}
                    {/* </Card.Section> */}
                </Tabs>
            </Card>
        </AppProvider>
    );
}

export default Tab;