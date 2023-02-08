import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

interface BuilderState {
  data: any;
  setData: (data: any) => void;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  addPage: () => void;
}

const useBuilderStore = create<BuilderState>((set) => ({
  data: {
    pages: [
      {
        name: '',
        id: uuidv4(),
        elements: []
      }
    ]
  },
  setData: (data: any) => set({ data }),
  currentPage: 0,
  setCurrentPage: (currentPage: number) => set({ currentPage }),
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
