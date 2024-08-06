import React, { useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import { DeliveryContext } from '../Context/DeliveryContext';
import { server } from "../../config.json";

const ManageDeliveries = () => {
  const { currentUser } = useContext(UserContext);
  const { contextData } = useContext(DeliveryContext);
  const { deliveries, addDelivery } = contextData;

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`${server}/deliveries/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.status === 422) {
        const errorData = await response.json();
        console.error('Validation error:', errorData);
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to update delivery status');
      }

      const updatedDelivery = await response.json();
      // Update local deliveries state
      addDelivery(updatedDelivery);
    } catch (error) {
      console.error('Error updating delivery status:', error);
    }
  };

  return (
    <div className='py-8'>
      {currentUser && currentUser.email ? (
        <div>
          <h1 className='text-3xl m-6'>DELIVERIES ({deliveries.length})</h1>
          <div className='grid grid-cols-2 md:grid-cols-3 xxl:grid-cols-4 gap-4 p-4'>
            {deliveries.map((delivery) => (
              <div key={delivery.id} className="block rounded-lg bg-white shadow-secondary-1 dark:bg-surface-dark">
                <a href="#!">
                  <img
                    className="rounded-t-lg"
                    src="https://tecdn.b-cdn.net/img/new/standard/nature/184.jpg" // Placeholder image
                    alt=""
                  />
                </a>
                <div className="p-6 text-surface dark:text-white">
                  <h5 className="mb-2 text-xl font-medium leading-tight">
                    {delivery.parcel}
                  </h5>
                  <p className="mb-4 text-base">
                    Status: {delivery.status}
                  </p>

                  <div>
                    <span className="my-1 grid grid-cols-2 text-sm uppercase">
                      <span className='font-semibold'>Delivery Address:</span>
                      <span>{delivery.delivery_address}</span>
                    </span>
                    <span className="my-1 grid grid-cols-2 text-xs uppercase">
                      <span className='font-semibold'>Customer:</span>
                      <span>{delivery.customer_name}</span>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleStatusChange(delivery.id, 'Delivered')}
                    className="inline-block rounded bg-green-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                  >
                    Mark as Delivered
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <span className='text-center text-gray-500'>Please log in to view deliveries.</span>
      )}
    </div>
  );
};

export default ManageDeliveries;
