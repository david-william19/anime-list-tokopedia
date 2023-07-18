import React from 'react'
import ReactDOM from 'react-dom/client'
import './globals.css'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/home/index.tsx'
import { AnimeDetail } from './pages/anime-detail/index.tsx'
import { ReactContext } from './context/context.tsx'
import { Collections } from './pages/collections/index.tsx'
import { CollectionDetail } from './pages/collection-detail/index.tsx'

const client = new ApolloClient({
  uri: 'https://graphql.anilist.co',
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/anime-detail/:id",
    element: <AnimeDetail />
  },
  {
    path: "/my-collections",
    element: <Collections />
  },
  {
    path: "/my-collections/:id",
    element: <CollectionDetail />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ApolloProvider client={client}>
  <React.StrictMode>
    <ReactContext>
        <RouterProvider router={router} />
    </ReactContext>
  </React.StrictMode>
    </ApolloProvider>
)
