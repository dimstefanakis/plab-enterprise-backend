import { useEffect } from 'react';
import { Alert, Text, Flex, Box, useToast } from '@chakra-ui/react';
import useBuilderStore from '@/components/store/builderStore';

function usePageErrors(pageId: string) {
  const toast = useToast();
  const errors = useBuilderStore((state) => state.errors);
  const pageErrors = errors[pageId];

  // Show the toast when there are errors or update the toast if it already exists
  useEffect(() => {
    if (!pageErrors || pageErrors.length == 0) {
      toast.close(`${pageId}-errors`);
    }
  }, [pageErrors]);

  // Close the toast when the page is switched
  useEffect(() => {
    return () => {
      toast.close(`${pageId}-errors`);
    };
  }, [pageId]);
}

export default usePageErrors;
