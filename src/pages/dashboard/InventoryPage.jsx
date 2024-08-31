import { useEffect, useState } from "react";
import { ItemModal } from "../../components/ItemModal";
import { getItems } from "../../utils/inventory";
import ItemsTable from "../../components/ItemsTable";
import { Box } from "lucide-react";

export default function InventoryPage() {
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState({ totalItems: 0 }); // Add state for stats

  const fetchItems = async () => {
    const items = await getItems();
    setItems(items);
    const totalItems = items.length;
    setStats({ totalItems });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const [createItemModal, setCreateItemModal] = useState(false);
  const toggleCreateModal = () => setCreateItemModal(!createItemModal);

  const [selectedItem, setSelectedItem] = useState(null);
  const toggleItemModal = (item) => setSelectedItem(item);

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      {/* Item Modal Components */}
      {createItemModal && <ItemModal onClose={toggleCreateModal} />}
      {selectedItem && (
        <ItemModal
          onClose={toggleItemModal}
          item={selectedItem}
          revalidate={fetchItems}
        />
      )}

      {/* Page Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Inventory</h1>
        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          onClick={toggleCreateModal}
        >
          Add Item
        </button>
      </header>

      {/* Statistics Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center">
            <Box className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Total Items</h2>
            <p className="text-2xl font-bold text-gray-600 mt-1">
              {stats.totalItems}
            </p>
          </div>
        </div>
        {/* Add more statistic cards as needed */}
      </section>

      {/* Inventory Table */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <ItemsTable items={items} toggleModal={toggleItemModal} />
      </section>
    </main>
  );
}
