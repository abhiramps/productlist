import React, { useCallback, useEffect, useState } from 'react';
import { Badge, Card, ChoiceList, DataTable, Filters } from '@shopify/polaris';
import Image from 'next/image';
import searchString from '../../utils/searchString';
import vendorFiltering from '../../utils/vendorFiltering';


export default function FiltersComponent({ dataArr }) {

  const [purchaiseAvailability, setPurchaiseAvailability] = useState(null);
  const [productType, setProductType] = useState(null);
  const [vendor, setVendor] = useState(null);
  const [queryValue, setQueryValue] = useState(null);

  const [newTableData, setNewTableData] = useState()

  const handlePurchaiseAvailabilityChange = useCallback(
    (value) => { setPurchaiseAvailability(value) },
    [],
  );
  const handleProductTypeChange = useCallback(
    (value) => setProductType(value),
    [],
  );
  const handleVendorChange = useCallback(
    (value) => {
      setVendor(value)
    },
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
            { label: 'Partners-demo', value: 'partners-demo' },
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

  useEffect(() => {
    searchfilter()
  }, [queryValue, vendor])

  const searchfilter = useCallback(() => {
    //applying both search string and vendor checkbox filtering
    if (queryValue !== null && vendor !== null) {
      let result = searchString({ dataArr, queryValue })
        .filter((item) => vendor.some(category => [item.vendor].flat().includes(category)))
      setNewTableData(result)
    }
    //applying search string filtering only
    else if (queryValue !== null) {
      let result = searchString({ dataArr, queryValue })
      setNewTableData(result)
    }
    //applying vendor checkbox filtering only
    else if (vendor !== null) {
      let results = vendorFiltering({dataArr,vendor})
      setNewTableData(results)
    }
    //while no filters are applied
    else {
      setNewTableData(dataArr)
    }
  }, [queryValue, vendor, dataArr])



  //formating table row
  const modifiedTableRow = (data) => {
    var convertedData = [];


    for (let item of (!data ? dataArr : data)) {
      var tempArray = [
        <Image src={item.image}
          alt="Picture of products"
          key={item.id}
          width={30}
          height={30}
        />,
        <div key={item.id} style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</div>,
        <Badge key={item.id} status="success">{item.status}</Badge>,
        item.inventory < 0 ? <div key={item.id} style={{ color: 'red' }}>{item.inventory}</div> :
          item.inventory === 'inventory not tracked' ? <div key={item.id} style={{ color: 'gray' }}>{item.inventory}</div> :
            item.inventory,
        item.type,
        item.vendor
      ];
      convertedData = [...convertedData, tempArray]
    }
    return convertedData


  }
  return (
    <div style={{ height: '90vh' }}>
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
        <DataTable style={{ flex: '1' }}
          columnContentTypes={[
            'text',
            'text',
            'text',
            'text',
            'text',
            'text',
          ]}
          headings={[
            '',
            <div key='product' style={{ fontWeight: 'bold' }}>Product</div>,
            <div key='status' style={{ fontWeight: 'bold' }}>Status</div>,
            <div key='inventory' style={{ fontWeight: 'bold' }}>Inventory</div>,
            <div key='type' style={{ fontWeight: 'bold' }}>Type</div>,
            <div key='vendor' style={{ fontWeight: 'bold' }}>Vendor</div>,
          ]}
          rows={modifiedTableRow(queryValue || vendor ? newTableData : dataArr)}
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

