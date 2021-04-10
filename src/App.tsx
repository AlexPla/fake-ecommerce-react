import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n/config';
import './App.css';
import { UnderConstruction } from './components/UnderConstruction/UnderConstruction';

const App: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t('page.title');
  }, [t]);

  return (
    <div className="App">
      <UnderConstruction />
    </div>
  );
}

export default App;
