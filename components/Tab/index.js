import { Card, Tabs, AppProvider, Badge } from "@shopify/polaris";
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
    }, [])

    const convertFn = useCallback(
        () => {
            var convertedData = [];

            var statusArr = ["active", "draft", "archived"]
            var inventoryArr = [-71, -3, 1780, 1669, -160, 959, 'inventory not tracked']
            var typeArr = ['outdore', 'indore']
            var vendorArr = ['company 123', 'boring bock', 'rustic ltd', 'Partners-demo']

            //random items
            const random = (array) => array[Math.floor(Math.random() * array.length)];

            const newData = dataArr.map(itm => {
                return {
                    ...itm,
                    "status": random(statusArr),
                    "inventory": random(inventoryArr),
                    "type": random(typeArr),
                    "vendor": random(vendorArr)
                }
                // return randomStatus()
            })
            // console.log("newData", newData)
            setData(newData);
        },
        [dataArr],
    )

    const onActiveChange = () => {
        const filteredItem = dataArr
        console.log(filteredItem)
        return filteredItem
    }
    const onDraftChange = () => {
        return dataArr.filter(item => (
            item.status === 'Draft'
        ))
    }

    const onArchiveChange = () => {
        return dataArr.filter(item => (
            item.status === 'Archived'
        ))
    }
    console.log("selected tab", tabs[selected].content)
    return (

        <AppProvider>
            <Card>
                <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
                    <Card.Section
                        title={tabs[selected].content}
                    >

                        {
                            tabs[selected].content === 'Active' ? <FiltersComponent dataArr={onActiveChange()} /> :
                                tabs[selected].content === 'Draft' ? <FiltersComponent dataArr={onDraftChange()} /> :
                                    tabs[selected].content === 'Archive' ? <FiltersComponent dataArr={onArchiveChange()} /> :
                                        <FiltersComponent dataArr={dataArr} />
                        }

                    </Card.Section>
                </Tabs>
            </Card>
        </AppProvider>
    );
}

export default Tab;