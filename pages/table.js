import React, { useCallback, useState } from 'react';
import { Card, ChoiceList, DataTable, Filters, TextField } from '@shopify/polaris';


export default function DataTableExample() {
    const [purchaiseAvailability, setPurchaiseAvailability] = useState(null);
    const [productType, setProductType] = useState(null);
    const [vendor, setVendor] = useState(null);
    const [queryValue, setQueryValue] = useState(null);

    const handlePurchaiseAvailabilityChange = useCallback(
        (value) => setPurchaiseAvailability(value),
        [],
    );
    const handleProductTypeChange = useCallback(
        (value) => setProductType(value),
        [],
    );
    const handleVendorChange = useCallback(
        (value) => setVendor(value),
        [],
    );
    const handleFiltersQueryChange = useCallback(
        (value) => setQueryValue(value),
        [],
    );
    const handlepurchaiseAvailabilityRemove = useCallback(() => setPurchaiseAvailability(null), []);
    const handleProductTypeRemove = useCallback(() => setProductType(null), []);
    const handlevendorRemove = useCallback(() => setVendor(null), []);
    const handleQueryValueRemove = useCallback(() => setQueryValue(null), []);
    const handleFiltersClearAll = useCallback(() => {
        handlepurchaiseAvailabilityRemove();
        handleProductTypeRemove();
        handlevendorRemove();
        handleQueryValueRemove();
    }, [
        handlepurchaiseAvailabilityRemove,
        handleQueryValueRemove,
        handleProductTypeRemove,
        handlevendorRemove,
    ]);

    const filters = [
        {
            key: 'purchaiseAvailability',
            label: 'Purchaise Availability',
            filter: (
                <ChoiceList
                    title="Purchaise Availability"
                    titleHidden
                    choices={[
                        { label: 'Online Store', value: 'Online Store' },
                        { label: 'Point of Sale', value: 'Point of Sale' },
                        { label: 'Buy Button', value: 'Buy Button' },
                    ]}
                    selected={purchaiseAvailability || []}
                    onChange={handlePurchaiseAvailabilityChange}
                    allowMultiple
                />
            ),
            shortcut: true,
        },
        {
            key: 'productType',
            label: 'Product type',
            filter: (
                <ChoiceList
                    title="Product type"
                    titleHidden
                    choices={[
                        { label: 'T-Shirt', value: 'T-Shirt' },
                        { label: 'Accessory', value: 'Accessory' },
                        { label: 'Gift card', value: 'Gift card' },
                    ]}
                    selected={productType || []}
                    onChange={handleProductTypeChange}
                    allowMultiple
                />
            ),
        },
        {
            key: 'vendor',
            label: 'Vendor',
            filter: (
                <ChoiceList
                    title="Vendor"
                    titleHidden
                    choices={[
                        { label: 'Company 123', value: 'company 123' },
                        { label: 'Boring Rock', value: 'boring bock' },
                        { label: 'Rustic LTD', value: 'rustic ltd' },
                        { label: 'Partners-demo', value: 'Partners-demo' },
                    ]}
                    selected={vendor || []}
                    onChange={handleVendorChange}
                    allowMultiple
                />
            ),
        },
    ];

    const appliedFilters = [];
    if (!isEmpty(purchaiseAvailability)) {
        const key = 'purchaiseAvailability';
        appliedFilters.push({
            key,
            label: disambiguateLabel(key, purchaiseAvailability),
            onRemove: handlepurchaiseAvailabilityRemove,
        });
    }
    if (!isEmpty(productType)) {
        const key = 'productType';
        appliedFilters.push({
            key,
            label: disambiguateLabel(key, productType),
            onRemove: handleProductTypeRemove,
        });
    }
    if (!isEmpty(vendor)) {
        const key = 'vendor';
        appliedFilters.push({
            key,
            label: disambiguateLabel(key, vendor),
            onRemove: handlevendorRemove,
        });
    }

    return (
        <div style={{ height: '568px' }}>
            <Card>
                <Card.Section>
                    <Filters
                        queryValue={queryValue}
                        filters={filters}
                        appliedFilters={appliedFilters}
                        onQueryChange={handleFiltersQueryChange}
                        onQueryClear={handleQueryValueRemove}
                        onClearAll={handleFiltersClearAll}
                    />
                </Card.Section>
                <DataTable
                    columnContentTypes={[
                        'text',
                        'text',
                        'text',
                        'text',
                        'text',
                    ]}
                    headings={[
                        'Product',
                        'Status',
                        'Inventory',
                        'Type',
                        'Vendor',
                    ]}
                    rows={[
                        ['Emerald Silk Gown', '$875.00', 124689, 140, '$122,500.00'],
                        ['Mauve Cashmere Scarf', '$230.00', 124533, 83, '$19,090.00'],
                        [
                            'Navy Merino Wool Blazer with khaki chinos and yellow belt',
                            '$445.00',
                            124518,
                            32,
                            '$14,240.00',
                        ],
                    ]}

                />
            </Card>
        </div>
    );

    function disambiguateLabel(key, value) {
        switch (key) {
            case 'vendor':
                return `Available from ${value.map((val) => val).join(',')}`;
            case 'purchaiseAvailability':
                return value.map((val) => `Available on ${val}`).join(', ');
            case 'productType':
                return value.join(', ');
            default:
                return value;
        }
    }

    function isEmpty(value) {
        if (Array.isArray(value)) {
            return value.length === 0;
        } else {
            return value === '' || value == null;
        }
    }
}