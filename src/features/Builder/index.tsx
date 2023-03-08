import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import {
  Flex,
  Text,
  Input,
  Box,
  HStack,
  Button,
  useToast
} from '@chakra-ui/react';
import QuestionNumber from '@/components/flat/QuestionNumber';
import QuestionTypeSelector from '@/components/flat/QuestionTypeSelector';
import QuestionMap from '../QuestionMap';
import AddQuestion from '@/components/flat/AddQuestion';
import usePageErrors from '@/components/hooks/usePageErrors';
import useBuilderStore from '@/components/store/builderStore';

function Builder() {
  const toast = useToast();
  const router = useRouter();
  const questionNameRef = useRef<HTMLInputElement>(null);
  const currentPageNumber = useBuilderStore((state) => state.currentPage);
  const currentPage = useBuilderStore(
    (state) => state.data.pages[currentPageNumber]
  );
  // const setCurrentPage = useBuilderStore((state) => state.setCurrentPage);
  const data = useBuilderStore((state) => state.data);
  const setData = useBuilderStore((state) => state.setData);
  const errors = useBuilderStore((state) => state.errors);
  const setIsSubmitting = useBuilderStore((state) => state.setIsSubmitting);
  const pageErrors = errors[currentPage.id];

  usePageErrors(currentPage.id);

  useEffect(() => {
    // reset submitting state when the builder is mounted
    setIsSubmitting(false);
  }, []);

  useEffect(() => {
    if (questionNameRef.current) {
      questionNameRef.current.focus();
    }
  }, [currentPage.id, questionNameRef.current]);

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    const updatedPages = data.pages.map((page: any, index: number) => {
      if (page.id === currentPage.id) {
        return {
          ...page,
          name: value,
          elements: [
            {
              ...page.elements[0],
              name: value
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
  }

  // useEffect(() => {
  //   setCurrentPage(data.pages.length - 1);
  // }, [data.pages.length]);

  function handleNextClick() {
    setIsSubmitting(true);
    if (pageErrors && pageErrors.length > 0) {
      if (toast.isActive(`${currentPage.id}-errors`)) {
        toast.update(`${currentPage.id}-errors`, {
          title: 'Please fix the following errors:',
          description: pageErrors.map((error: any) => error.message).join(''),
          status: 'error',
          position: 'top',
          duration: 10000,
          isClosable: false
        });
        return;
      }
      toast({
        id: `${currentPage.id}-errors`,
        title: 'Please fix the following errors:',
        description: pageErrors.map((error: any) => error.message).join(''),
        status: 'error',
        position: 'top',
        duration: 10000,
        isClosable: false
      });
    } else {
      toast.close(`${currentPage.id}-errors`);
      if (Object.keys(errors).length > 0) {
        toast({
          id: 'global-errors',
          title:
            'You have errors on other pages. Please fix them before continuing.',
          status: 'error',
          position: 'top',
          duration: 10000,
          isClosable: true
        });
        return;
      }
      router.push('/survey_name');
    }
  }

  return (
    <Flex flexFlow="column" w="100%">
      <QuestionMap />
      <QuestionNumber />
      <Input
        ref={questionNameRef}
        size="lg"
        placeholder="Enter a question"
        value={currentPage.name}
        onChange={handleNameChange}
      ></Input>
      <Box w="100%" mt={6}>
        <QuestionTypeSelector />
      </Box>
      <Flex mt={10} justify="center">
        <Button colorScheme="blue" w="50%" onClick={handleNextClick}>
          Save and Continue
        </Button>
      </Flex>
    </Flex>
  );
}

export default Builder;
