import { createBrowserRouter } from 'react-router-dom'
import { Root } from './root'
import { PizzaMenu } from './pizza-menu'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <PizzaMenu />,
      },
    ],
  },
])
