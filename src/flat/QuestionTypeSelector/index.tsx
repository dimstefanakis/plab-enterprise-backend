import { useState, useEffect } from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import QuestionTypeSelectorItem from '../QuestionTypeSelectorItem';
import Choices from '../Choices';
import useBuilderStore from '@/components/store/builderStore';
import { v4 as uuidv4 } from 'uuid';

function QuestionTypeSelector() {
  const [questionType, setQuestionType] = useState('checkbox');
  const currentPageNumber = useBuilderStore((state) => state.currentPage);
  const currentPage = useBuilderStore(
    (state) => state.data.pages[currentPageNumber]
  );
  const data = useBuilderStore((state) => state.data);
  const setData = useBuilderStore((state) => state.setData);

  function onClick(type: string) {
    setQuestionType(type);
  }

  useEffect(() => {
    const updatedPages = data.pages.map((page: any, index: number) => {
      if (page.id === currentPage.id) {
        let updatedElements = { ...page.elements[0] };
        if (questionType == 'text' || questionType == 'number') {
          delete updatedElements.choices;
        } else {
          if(!updatedElements.choices){
            updatedElements.choices = [
              {
                text: '',
                value: '',
                id: uuidv4()
              }
            ];
          }
        }

        return {
          ...page,
          elements: [
            {
              ...updatedElements,
              type: questionType
            }
          ]
        };
      }
      return page;
    });
    setData({
      ...data,
      pages: updatedPages
    });
  }, [questionType]);

  useEffect(() => {
    setQuestionType(currentPage.elements[0]?.type);
  }, [data]);

  return (
    <Flex flexFlow="row wrap" justifyContent="space-between">
      <QuestionTypeSelectorItem
        title="Single Choice"
        selected={currentPage.elements[0]?.type === 'radiogroup'}
        description="Respondents can choose one answer from the list."
        onClick={() => onClick('radiogroup')}
      />
      <QuestionTypeSelectorItem
        title="Multiple Selection"
        selected={currentPage.elements[0]?.type === 'checkbox'}
        description="Respondents can choose multiple answers from the list."
        onClick={() => onClick('checkbox')}
      />
      <QuestionTypeSelectorItem
        title="Text Input"
        selected={currentPage.elements[0]?.type === 'text'}
        description="Respondents can type in an open text field "
        onClick={() => onClick('text')}
      />
      <QuestionTypeSelectorItem
        title="Numerical Input"
        selected={currentPage.elements[0]?.type === 'number'}
        description="Respondents can type in open numerical field"
        onClick={() => onClick('number')}
      />
      <Choices />
    </Flex>
  );
}

export default QuestionTypeSelector;
