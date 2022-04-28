import React, { useCallback, useState } from 'react';
import { Avatar, Card, ChoiceList, DataTable, Filters, RangeSlider, ResourceList, TextField, TextStyle } from '@shopify/polaris';

export default function FiltersComponent() {
  const [purchaiseAvailability, setPurchaiseAvailability] = useState(null);
  const [vendor, setVendor] = useState(null);
  const [productType, setProductType] = useState(null);
  const [queryValue, setQueryValue] = useState(null);

  const handlePurchaiseAvailabilityChange = useCallback(
    (value) => setPurchaiseAvailability(value),
    [],
  );
  const handleVendorChange = useCallback(
    (value) => setVendor(value),
    [],
  );
  const handleProductTypeChange = useCallback(
    (value) => setProductType(value),
    [],
  );
  const handleFiltersQueryChange = useCallback(
    (value) => setQueryValue(value),
    [],
  );
  const handlepurchaiseAvailabilityRemove = useCallback(
    () => setPurchaiseAvailability(null),
    [],
  );
  const handlevendorRemove = useCallback(() => setVendor(null), []);
  const handleproductTypeRemove = useCallback(() => setProductType(null), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(null), []);
  const handleFiltersClearAll = useCallback(() => {
    handlepurchaiseAvailabilityRemove();
    handlevendorRemove();
    handleproductTypeRemove();
    handleQueryValueRemove();
  }, [
    handlepurchaiseAvailabilityRemove,
    handlevendorRemove,
    handleQueryValueRemove,
    handleproductTypeRemove,
  ]);

  const filters = [
    {
      key: 'purchaiseAvailability',
      label: 'Purchaise Availibility',
      filter: (
        <ChoiceList
          title="Purchaise Availibility"
          titleHidden
          choices={[
            { label: 'Online Store', value: 'online store' },
            { label: 'Point Of Sale', value: 'point of sale' },
            { label: 'Buy Button', value: 'buy button' },
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
      label: 'Product Type',
      filter: (
        <TextField
          label="Product Type"
          value={productType}
          onChange={handleProductTypeChange}
          autoComplete="off"
          labelHidden
        />
      ),
      shortcut: true,
    },
    {
      key: 'vendor',
      label: 'vendor',
      filter: (
        <ChoiceList
          title="vendor"
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
  if (!isEmpty(vendor)) {
    const key = 'vendor';
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, vendor),
      onRemove: handlevendorRemove,
    });
  }
  if (!isEmpty(productType)) {
    const key = 'productType';
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, productType),
      onRemove: handleproductTypeRemove,
    });
  }

  return (
    <div style={{ height: '568px' }}>
      <Card>
        <ResourceList
          // resourceName={{singular: 'customer', plural: 'customer'}}
          filterControl={
            <Filters
              queryValue={queryValue}
              filters={filters}
              appliedFilters={appliedFilters}
              onQueryChange={handleFiltersQueryChange}
              onQueryClear={handleQueryValueRemove}
              onClearAll={handleFiltersClearAll}
            />
          }
          items={[
            {
              id: 341,
              url: 'customers/341',
              name: 'Mae Jemison',
              location: 'Decatur, USA',
            },
            {
              id: 256,
              url: 'customers/256',
              name: 'Ellen Ochoa',
              location: 'Los Angeles, USA',
            },
          ]}

          renderItem={(item) => {
            const { id, url, name, location } = item;
            const media = <Avatar customer size="medium" name={name} />;

            return (
              <>
               
                <ResourceList.Item
                  id={id}
                  url={url}
                  media={media}
                  accessibilityLabel={`View details for ${name}`}
                >
                  <h3>
                    <TextStyle variation="strong">{name}</TextStyle>
                  </h3>
                  <div>{location}</div>
                </ResourceList.Item>
              </>
            );
          }}
        />
      </Card>
    </div>
  );

  function disambiguateLabel(key, value) {
    switch (key) {
      case 'vendor':
        return value.map((val) => `${val}`).join(', ');
      case 'productType':
        return `Product Type ${value}`;
      case 'purchaiseAvailability':
        return value.map((val) => `${val}`).join(', ');
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
