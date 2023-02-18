import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import Joi from 'joi';
import type { Database } from 'types_db';

interface BuilderState {
  data: any;
  errors: any;
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

const choiceSchema = Joi.object({
  id: Joi.string().required(),
  value: Joi.any(),
  text: Joi.string().required().messages({
    'string.empty': 'Choice is required'
  })
});

const pageSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Question name is required'
  }),
  id: Joi.string().uuid().required(),
  elements: Joi.array()
    .items(
      Joi.object({
        type: Joi.string()
          .valid('number', 'text', 'checkbox', 'radiogroup')
          .required()
          .messages({
            'string.empty': 'Question type is required'
          }),
        name: Joi.string().required().messages({
          'string.empty': 'Question is required'
        }),
        choices: Joi.array()
          .items(choiceSchema)
          .when('type', {
            is: Joi.string().valid('checkbox', 'radiogroup'),
            then: Joi.array().min(2),
            otherwise: Joi.forbidden()
          })
          .messages({
            'array.min': 'You must have at least 2 choices'
          }),

        required: Joi.boolean()
      })
    )
    .min(1)
});

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
      responsesNeeded: 100,
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
  errors: {},
  setData: (data: any) =>
    set((state) => {
      const pageErrors = {} as any;
      data.pages.forEach((page: any) => {
        const { error, value } = pageSchema.validate(page);
        if (error) {
          const newErrors = [] as any[];
          error.details.forEach((detail) => {
            newErrors.push({
              path: detail.path,
              message: detail.message
            });
          });
          pageErrors[page.id] = newErrors;
        }
      });
      if (pageErrors) {
        return {
          errors: pageErrors,
          data
        };
      }
      return {
        errors: {},
        data
      };
    }),
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
      currentPage: state.data.pages.length,
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
