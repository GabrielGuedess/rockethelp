import { useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import {
  HStack,
  IconButton,
  VStack,
  useTheme,
  Text,
  Heading,
  FlatList,
  Center,
} from 'native-base';
import { ChatTeardropText, SignOut } from 'phosphor-react-native';

import { Filter } from '../components/Filter';
import { Button } from '../components/Button';
import { Orders, OrderProps } from '../components/Order';

import Logo from '../assets/logo_secondary.svg';

export function Home() {
  const { colors } = useTheme();

  const navigation = useNavigation();

  const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>(
    'open'
  );

  const [orders, setOrders] = useState<OrderProps[]>([
    {
      id: '1',
      patrimony: '123456789',
      when: '2020-01-01',
      status: 'open',
    },
  ]);

  function handleNewOrder() {
    navigation.navigate('new');
  }

  function handleOpenDetails(orderId: string) {
    navigation.navigate('details', { orderId });
  }

  return (
    <VStack flex={1} pb={6} bg='gray.700'>
      <HStack
        w='full'
        justifyContent='space-between'
        alignItems='center'
        bg='gray.600'
        pt={12}
        pb={5}
        px={6}
      >
        <Logo />

        <IconButton icon={<SignOut size={26} color={colors.gray[300]} />} />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack
          w='full'
          mt={8}
          mb={4}
          justifyContent='space-between'
          alignItems='center'
        >
          <Heading color='gray.100'>Meus chamados</Heading>

          <Text color='gray.200'>3</Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filter
            type='open'
            title='em andamento'
            onPress={() => setStatusSelected('open')}
            isActive={statusSelected === 'open'}
          />
          <Filter
            type='closed'
            title='finalizados'
            onPress={() => setStatusSelected('closed')}
            isActive={statusSelected === 'closed'}
          />
        </HStack>

        <FlatList
          data={orders}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Orders data={item} onPress={() => handleOpenDetails(item.id)} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={() => (
            <Center>
              <ChatTeardropText size={40} color={colors.gray[300]} />
              <Text color='gray.300' fontSize='xl' mt={6} textAlign='center'>
                Você ainda não possui {'\n'}
                solicitações{' '}
                {statusSelected === 'open' ? 'em andamento' : 'finalizadas'}
              </Text>
            </Center>
          )}
        />

        <Button title='Nova solicitação' onPress={handleNewOrder} />
      </VStack>
    </VStack>
  );
}
