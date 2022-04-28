import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Badge, Card, ChoiceList, DataTable, Filters } from '@shopify/polaris';
import Image from 'next/image';
import { ProductContext } from '../../context/productContext';


export default function FiltersComponent({ dataArr }) {

  //context prop
  // const { dataArr } = useContext(ProductContext)

  const [purchaiseAvailability, setPurchaiseAvailability] = useState(null);
  const [productType, setProductType] = useState(null);
  const [vendor, setVendor] = useState(null);
  const [queryValue, setQueryValue] = useState(null);

  const [Data, setData] = useState([])

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


  // const data = [
  //   {
  //     "id": 1,
  //     "title": "Fjallraven",
  //     "price": 109.95,
  //     "description": "Your perfect",
  //     "category": "men's clothing",
  //     "image": "https://fakestoreapi",
  //     "rating": {
  //       "rate": 3.9,
  //       "count": 120
  //     }
  //   }
  // ]

  // console.log("context data", data);

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

  // const dataArr = [
  //   ['Emerald Silk Gown', '$875.00', 124689, 140, '$122,500.00'],
  //   ['Mauve Cashmere Scarf', '$230.00', 124533, 83, '$19,090.00'],
  //   ['Navy Merino Wool', '$445.00', 124518, 32, '$14,240.00'],
  // ]

  // const dataArr = [
  //   {
  //     "id": 1,
  //     // "status": "active",
  //     // "inventory": 100,
  //     // "type": "outdore",
  //     // "vendor": "company 123",
  //     "title": "Fjallraven",
  //     "price": 109.95,
  //     "description": "Your perfect",
  //     "category": "men's clothing",
  //     "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  //     "rating": {
  //       "rate": 3.9,
  //       "count": 120
  //     }
  //   },
  //   {
  //     "id": 2,
  //     // "status": "Draft",
  //     // "inventory": 200,
  //     // "type": "indore",
  //     // "vendor": "company 456",
  //     "title": "abc",
  //     "price": 109.95,
  //     "description": "Your perfect",
  //     "category": "men's clothing",
  //     "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  //     "rating": {
  //       "rate": 3.9,
  //       "count": 120
  //     }
  //   }
  // ]

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

      for (let item of newData) {
        // var newObj = { ...newObj, ...payload }
        var tempArray = [
          <Image src={item.image}
            alt="Picture of the author"
            width={30}
            height={30}
          />,
          <div style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</div>,
          <Badge status="success">{item.status}</Badge>,
          item.inventory,
          item.type,
          item.vendor
        ];
        // console.log("temp arr", tempArray)
        convertedData = [...convertedData, tempArray]
      }
      setData(convertedData);
    },
    [Data],
  )

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
        <DataTable style={{ flex: '1' }}
          columnContentTypes={[
            '',
            'text',
            'text',
            'text',
            'text',
            'text',
          ]}
          headings={[
            '',
            'Product',
            'Status',
            'Inventory',
            'Type',
            'Vendor',
          ]}
          rows={Data}
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


