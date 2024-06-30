
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BirthdayCardForm from './BirthdayCardForm';


const App = () => {
  return (
<Router>
        <Routes>
          <Route exact path="/" element={<BirthdayCardForm />}/> 
        </Routes>
    </Router>
  )
}

export default App;