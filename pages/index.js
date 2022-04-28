
import Container from '../components/Layout/Container'

import { Page } from '@shopify/polaris';
import Tab from '../components/Tab';
import { ProductContext } from '../context/productContext';


export default function Home({ dataArr }) {

  // console.log(data)
  return (
    <>
      <ProductContext.Provider value={{dataArr}}>
        <Container>
          <Page
            title={'Products'}
            secondaryActions={[
              {
                content: 'Export',
                accessibilityLabel: 'Secondary action label',
                // onAction: () => alert('Duplicate action'),
              },
              {
                content: 'import',
                // onAction: () => alert('View on your store action'),
              },
            ]}
            actionGroups={[
              {
                title: 'More action',
                accessibilityLabel: 'Action group label',
                actions: [
                  {
                    content: 'Option A',
                    accessibilityLabel: 'Option A',
                    // onAction: () => alert(''),
                  },
                  {
                    content: 'Option B',
                    accessibilityLabel: 'Option B',
                    // onAction: () => alert(''),
                  },
                ],
              },
            ]}
            primaryAction={{ content: 'Add product', disabled: false }}
          >
            <Tab />
          </Page>
        </Container>
      </ProductContext.Provider>
    </>
  )
}


// export async function getServerSideProps() {
//   const res = await fetch(`https://fakestoreapi.com/products`)
//   const data = await res.json()
//   console.log(data)
//   return {
//     props: { data },
//   }
// }

export const getServerSideProps = async () => {
  const res = await fetch('https://fakestoreapi.com/products')
  const dataArr = await res.json()
  // console.log(article)
  return {
    props: {
      dataArr,
    },
  }
}