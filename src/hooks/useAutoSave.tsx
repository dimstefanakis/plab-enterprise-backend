import { useEffect } from 'react';
import useBuilderStore from '../store/builderStore';

function useAutoSave() {
  const data = useBuilderStore((state) => state.data);

  useEffect(() => {
    let interval = setInterval(() => {
      localStorage.setItem('survey', JSON.stringify(data));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [data]);
}

export default useAutoSave;
