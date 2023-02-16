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
  deletePage: (pageId: string) => void;
  reorderPageUp: (pageId: string) => void;
  reorderPageDown: (pageId: string) => void;
}

function getSavedData() {
  try {
    return localStorage.getItem('surveyData');
  } catch (e) {
    return null;
  }
}
let savedData = getSavedData();

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
    })),
  deletePage: (pageId: string) =>
    set((state) => {
      const pages =
        state.data.pages.length == 1
          ? state.data.pages
          : state.data.pages.filter((page: any) => page.id !== pageId);

      const currentPage = Math.min(state.currentPage, pages.length - 1);
      return {
        currentPage: 0,
        data: {
          ...state.data,
          pages
        }
      };
    }),
  reorderPageUp: (pageId: string) =>
    set((state) => {
      const pages = [...state.data.pages];
      const index = pages.findIndex((page) => page.id === pageId);
      if (index === 0) return state;
      const page = pages[index];
      pages[index] = pages[index - 1];
      pages[index - 1] = page;
      return {
        data: {
          ...state.data,
          pages
        }
      };
    }),
  reorderPageDown: (pageId: string) =>
    set((state) => {
      const pages = [...state.data.pages];
      const index = pages.findIndex((page) => page.id === pageId);
      if (index === pages.length - 1) return state;
      const page = pages[index];
      pages[index] = pages[index + 1];
      pages[index + 1] = page;
      return {
        data: {
          ...state.data,
          pages
        }
      };
    })
}));

export default useBuilderStore;
