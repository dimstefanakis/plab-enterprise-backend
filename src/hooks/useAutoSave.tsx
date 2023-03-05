import { useEffect } from 'react';
import useBuilderStore from '../store/builderStore';

function useAutoSave() {
  const data = useBuilderStore((state) => state.data);
  const surveyId = useBuilderStore((state) => state.surveyId);

  useEffect(() => {
    // checking if the survey is either edited or created. If created save to local storage
    if (!surveyId) {
      let interval = setInterval(() => {
        localStorage.setItem('survey', JSON.stringify(data));
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [data]);
}

export default useAutoSave;
