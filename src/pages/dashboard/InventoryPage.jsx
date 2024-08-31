import { useEffect, useState } from "react";
import { ItemModal } from "../../components/ItemModal";
import { getItems } from "../../utils/inventory";
import ItemsTable from "../../components/ItemsTable";

export default function InventoryPage() {
  const [items, setItems] = useState([]);
  const fetchItems = async () => {
    const items = await getItems();
    setItems(items);
  };
  useEffect(() => {
    fetchItems();
  }, []);

  const [createItemModal, setCreateItemModal] = useState(false);
  const toggleCreateModal = () => setCreateItemModal(!createItemModal);

  const [selectedItem, setSelectedItem] = useState(null);
  const toggleItemModal = (item) => setSelectedItem(item);

  return (
    <main className="flex flex-col gap-3">
      {createItemModal && <ItemModal onClose={toggleCreateModal} />}
      {selectedItem && (
        <ItemModal
          onClose={toggleItemModal}
          item={selectedItem}
          revalidate={fetchItems}
        />
      )}
      <h1>Inventory</h1>
      <button
        className="bg-red-950 text-white p-2 rounded-lg w-[10rem] mt-10"
        onClick={toggleCreateModal}
      >
        Add Item
      </button>
      <section>
        <ItemsTable items={items} toggleModal={toggleItemModal} />
      </section>
    </main>
  );
}
