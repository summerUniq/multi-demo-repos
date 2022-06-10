import {Link, Outlet} from 'react-router-dom'
import './App.css'
const linkList = [
  {path: '/invoices', name: 'Invoices'},
  {path: '/expenses', name: 'Expenses'}
]
function App() {
  return (
   <div className='app'>
      <nav
        className='nav'
      >
        {
          linkList.map((v, idx) => (
            <div className='list-item' key={idx}>
                <Link to={v.path}>{v.name}</Link>
            </div>
          ))
        }
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
