import { Button, IconButton, HStack } from '@chakra-ui/react';
import { VscTrash, VscArrowUp, VscArrowDown } from 'react-icons/vsc';
import useBuilderStore from '@/components/store/builderStore';

function MapBelt({ pageId }: { pageId: string }) {
  const deletePage = useBuilderStore((state) => state.deletePage);
  const reorderPageUp = useBuilderStore((state) => state.reorderPageUp);
  const reorderPageDown = useBuilderStore((state) => state.reorderPageDown);

  return (
    <HStack mt={6} w="100%">
      <IconButton
        aria-label="Order Up"
        onClick={() => reorderPageUp(pageId)}
        icon={<VscArrowUp />}
      ></IconButton>
      <IconButton
        aria-label="Order Down"
        onClick={() => reorderPageDown(pageId)}
        icon={<VscArrowDown />}
      ></IconButton>
      <IconButton
        aria-label="Delete"
        onClick={() => deletePage(pageId)}
        icon={<VscTrash />}
      >
      </IconButton>
    </HStack>
  );
}

export default MapBelt;
