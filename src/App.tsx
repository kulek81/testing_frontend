import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useGetVariantsQuery } from './components/api/api';
import { TestView } from './components/TestsView/TestsView';
import { Variants } from './components/Variants/Variants';

function App() {
  const { data } = useGetVariantsQuery('');
  const [variants, setVariants] = useState<number[]>([])
  useEffect(() => {
    data && setVariants(data);
  }, [data])
  return (
    <div className="App">
      <BrowserRouter >
        <Routes>
          <Route path='/' element={<Variants variants={variants} />} />
          {variants ? variants.map(v => <Route key={v} path={`variant/${v}`} element={<TestView variant={v} />} />) : 'Error'}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
