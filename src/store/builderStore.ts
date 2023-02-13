import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import type { Database } from 'types_db';

interface BuilderState {
  data: any;
  setData: (data: any) => void;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  setName: (name: string) => void;
  setResponsesNeeded: (responsesNeeded: number) => void;
  setAudience: (
    audience: Database['public']['Tables']['audiences']['Row']
  ) => void;
  addPage: () => void;
}

const savedData = localStorage.getItem('survey');
const initialSurveyData = savedData
  ? JSON.parse(savedData)
  : {
      surveyName: '',
      audience: <Database['public']['Tables']['audiences']['Row'] | null>null,
      responsesNeeded: 0,
      pages: [
        {
          name: '',
          id: uuidv4(),
          elements: []
        }
      ]
    };

const useBuilderStore = create<BuilderState>((set) => ({
  data: initialSurveyData,
  setData: (data: any) => set({ data }),
  currentPage: 0,
  setCurrentPage: (currentPage: number) => set({ currentPage }),
  setName: (name: string) =>
    set((state) => ({
      data: {
        ...state.data,
        surveyName: name
      }
    })),
  setResponsesNeeded: (responsesNeeded: number) =>
    set((state) => ({
      data: {
        ...state.data,
        responsesNeeded
      }
    })),

  setAudience: (audience: Database['public']['Tables']['audiences']['Row']) =>
    set((state) => ({
      data: {
        ...state.data,
        audience
      }
    })),
  addPage: () =>
    set((state) => ({
      data: {
        ...state.data,
        pages: [
          ...state.data.pages,
          {
            name: '',
            id: uuidv4(),
            elements: []
          }
        ]
      }
    }))
}));

export default useBuilderStore;
