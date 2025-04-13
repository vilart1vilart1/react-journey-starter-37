import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';

interface FilterOption {
  name: string;
  isSelected: boolean;
  onPress: () => void;
}

const FilterChip: React.FC<FilterOption> = ({ name, isSelected, onPress }) => (
  <TouchableOpacity
    style={[styles.filterChip, isSelected && styles.selectedFilterChip]}
    onPress={onPress}
  >
    <Text style={[styles.filterChipText, isSelected && styles.selectedFilterChipText]}>
      {name}
    </Text>
  </TouchableOpacity>
);

export default function FavoritesScreen() {
  const [activeFilter, setActiveFilter] = useState('Tous');
  
  const filters = [
    { id: '1', name: 'Tous' },
    { id: '2', name: 'Bureaux' },
    { id: '3', name: 'Salles de réunion' },
    { id: '4', name: 'Espaces événementiels' }
  ];

  const renderFilterChip = ({ item }: { item: { id: string, name: string } }) => (
    <FilterChip
      name={item.name}
      isSelected={activeFilter === item.name}
      onPress={() => setActiveFilter(item.name)}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mes favoris</Text>
      </View>
      
      <View style={styles.filtersContainer}>
        <FlatList
          data={filters}
          renderItem={renderFilterChip}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersList}
        />
      </View>
      
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateTitle}>Aucun favori pour le moment</Text>
          <Text style={styles.emptyStateText}>
            Ajoutez des espaces à vos favoris pour les retrouver ici
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 24,
    paddingTop: 60,
    backgroundColor: '#0066FF',
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#fff',
  },
  filtersContainer: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  filtersList: {
    gap: 12,
  },
  filterChip: {
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  selectedFilterChip: {
    backgroundColor: '#0066FF',
  },
  filterChipText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#666',
  },
  selectedFilterChipText: {
    color: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateContainer: {
    alignItems: 'center',
  },
  emptyStateTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#333',
    marginBottom: 8,
  },
  emptyStateText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
