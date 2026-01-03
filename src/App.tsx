import { MantineProvider } from '@mantine/core';
import { Text, Paper } from '@mantine/core';

import '@mantine/core/styles.css';

export default function App() {
  return <MantineProvider>
    <Paper shadow="sm" p="xl">
      <Text>Paper is the most basic ui component</Text>
      <Text>
        Use it to create cards, dropdowns, modals and other components that require background
        with shadow
      </Text>
    </Paper>
  </MantineProvider>;
}