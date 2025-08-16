import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>    
        <App />
          <Toaster position='top-center'/>
      </QueryClientProvider>
    </BrowserRouter>
)
